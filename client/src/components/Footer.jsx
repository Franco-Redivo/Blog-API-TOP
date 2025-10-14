


function Footer() {
    return (
        <footer className="flex flex-col items-center gap-4 bg-gray-800 text-white p-4 mt-8">
            <p className="text-center text-sm">
                &copy; {new Date().getFullYear()} Bloggr. All rights reserved.
            </p>
            <a href="https://www.flaticon.com/free-icons/animal" title="animal icons"
                className="text-sm text-gray-400 hover:text-gray-300">Animal icons created by Freepik - Flaticon</a>
        </footer>
    );
}

export default Footer;




