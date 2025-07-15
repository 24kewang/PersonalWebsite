// In src/components/Navbar.jsx
export default function Navbar() {
    return (
    /*<nav className="flex mx-auto mt-4 justify-center bg-foreground shadow rounded-2xl w-1/4">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <span className="font-bold text-primary hover:text-hover"></span>
      </div>
    </nav>*/
    <nav className="fixed left-0 right-0 mx-auto mt-6 z-50 bg-header w-fit rounded-2xl px-8 py-2 shadow">
        <ul className="flex flex-wrap justify-center gap-12 text-xl md:text-2xl">
            <li><a href="/" className="hover:text-hover">Home</a></li>
            <li><a href="/about" className="hover:text-hover">About</a></li>
            <li><a href="/projects" className="hover:text-hover">Projects</a></li>
        </ul>
    </nav>

    );
}
