
export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            Apna school is a premier institution dedicated to teaching the techonolgly
            . We nurture talent from the ground up,
            fostering a vibrant community of developer.
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/Contact"
                className="hover:text-white transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
          <div >
            <div>
            <a
              href="https://www.facebook.com/ramnarayankumar.kumar.16/"
              className="hover:text-white transition-colors duration-300"
            >
              Facebook
            </a>
            </div>
            <div>
            <a
              href="https://x.com/Ramnara51502313"
              className="hover:text-white transition-colors duration-300"
            >
              Twitter
            </a>
            </div>
           <div>
           <a
              href="https://www.instagram.com/ramnarayankumark/"
              className="hover:text-white transition-colors duration-300"
            >
              Instagram
            </a>
           </div>
           <div>
           <a
              href="https://youtu.be/iGzGE7T1Upc"
              className="hover:text-white transition-colors duration-300"
            >
              Youtube
            </a>
           </div>
           
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p>Apna School, India</p>
          <p>Delhi 10001</p>
          <p>Email: ramnarayan@gmail.com</p>
          <p>Phone: (+91) 6352396301</p>
        </div>
        </div>
        <p className="text-center text-xs pt-8">© 2024 Music School. All rights reserved.</p>
    </footer>
  );
}