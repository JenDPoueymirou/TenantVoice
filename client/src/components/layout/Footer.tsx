const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="material-icons text-primary-light mr-2">apartment</span>
              <span className="font-bold text-xl">TenantVoice</span>
            </div>
            <p className="text-neutral-400 text-sm">Building collective tenant power through data and documentation.</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="material-icons">alternate_email</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="material-icons">chat</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="/report" className="hover:text-white">Report an Issue</a></li>
              <li><a href="/buildings" className="hover:text-white">Building Directory</a></li>
              <li><a href="/resources" className="hover:text-white">Resources</a></li>
              <li><a href="/dashboard" className="hover:text-white">Data Visualization</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Get Involved</h4>
            <p className="text-neutral-400 text-sm mb-4">Sign up for updates and learn how to contribute to the platform.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-3 py-2 bg-neutral-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-light flex-grow text-sm" 
              />
              <button className="bg-primary-light hover:bg-primary text-white px-4 py-2 rounded-r-md text-sm">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-6 text-sm text-neutral-500 flex flex-col md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} TenantVoice. All rights reserved.</p>
          <div className="mt-2 md:mt-0 space-x-6">
            <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400">Terms of Service</a>
            <a href="#" className="hover:text-neutral-400">Data Use Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
