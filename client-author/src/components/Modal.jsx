
function Modal ({ isVisible, onClose, children }) {

    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
    }

    if(!isVisible) return null;

    return(
        <div className='fixed inset-0 bg-grey backdrop-blur-md flex justify-center items-center'
            id='wrapper'
            onClick={handleClose}>
            <div className='md:w-[600px] w-[90%] mx-auto flex flex-col'>
                <div className='bg-white p-2 rounded-xl shadow-xl'>
                    {children}
                </div>    
            </div>
        </div>
    )
   
}
export default Modal;