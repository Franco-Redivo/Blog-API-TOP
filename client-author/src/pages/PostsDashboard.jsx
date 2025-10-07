import { useState } from "react";
import Dashboard from "../components/Dashboard";
import { useCreatePost } from "../hooks/usePosts";
import { useAuth } from "../hooks/useAuth";
import Modal from "../components/Modal";
import { Editor } from "@tinymce/tinymce-react";

function PostsDashboard() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', published: false});
    const createPostMutation = useCreatePost();
    const { userId } = useAuth();

    const handleCreatePost = async (e) => {
        e.preventDefault();

        if (!newPost.title.trim() || !newPost.content.trim()) {
            alert('Please fill in both title and content');
            return;
        }

        try {
            await createPostMutation.mutateAsync({
                title: newPost.title,
                body: newPost.content,    
                authorId: userId,         
                published: newPost.published          
            });
            setNewPost({ title: '', content: '', published:false });
            setShowCreateModal(false);
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    return(
        <div className="p-4 max-w-6xl mx-auto mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Posts</h2>
                <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-md"
                    onClick={() => setShowCreateModal(true)}
                >
                    New Post
                </button>
            </div>


            <Modal isVisible={showCreateModal} onClose={() => setShowCreateModal(false)}>
                <div className='py-7 px-2 sm:px-6 lg:px-7'>
                    <div className='flex justify-between items-start mb-6'>
                        <h2 className='text-2xl font-bold'>Create new Post</h2>
                        <button className="text-slate-500 hover:bg-slate-200 rounded-4xl p-1" onClick={() => setShowCreateModal(false)}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <form onSubmit={handleCreatePost}>
                        <div>
                            <label className='block text-lg font-medium text-slate-700 mb-1'>
                                Title
                                <input
                                className='mt-1 p-3 w-full bg-slate-100 border-slate-300  rounded-lg focus:ring-blue-400 focus:border-blue-400 text-slate-900'
                                type="text"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                />
                            </label>
                        </div>
                        <div className='mt-5'>
                            <label className='block text-lg font-medium text-slate-700 mb-1'>
                                Content
                            </label>
                            <Editor
                                tinymceScriptSrc='/tinymce/tinymce.min.js'
                                licenseKey='gpl'
                                value={newPost.content}
                                onEditorChange={(content) => setNewPost({ ...newPost, content })}
                                init={{
                                    height: 400,
                                    menubar: false,
                                    branding: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                        'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                                        'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'image',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                
                                }}
                            />          
                        </div>
                        <div className='flex justify-center sm:justify-end gap-3 sm:gap-4 pt-4 mt-5'>
                            <button 
                                className='w-[90px] px-5 py-2.5 rounded-lg text-sm font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300'
                                type="button" 
                                onClick={() => setShowCreateModal(false)}>
                                Cancel
                            </button>
                            <button 
                                className=' w-[90px] px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 text-white hover:bg-green-600'
                                type="submit"
                                onClick={() => setNewPost({...newPost, published:false})}
                                disabled={createPostMutation.isPending}>
                                Draft
                            </button>
                            <button 
                                className='w-[90px] px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600'
                                type="submit"
                                onClick={() => setNewPost({...newPost, published:true})}
                                disabled={createPostMutation.isPending}>
                                Publish
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Dashboard/>
        </div>
    )
}

export default PostsDashboard;
