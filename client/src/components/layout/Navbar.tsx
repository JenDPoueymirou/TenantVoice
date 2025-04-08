import { useState } from "react";
import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Report Issue", href: "/report" },
    { name: "Buildings", href: "/buildings" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <span className="material-icons text-primary-dark mr-2">apartment</span>
                <span className="font-bold text-xl text-primary-dark">TenantVoice</span>
              </a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={`${
                  location === item.href
                    ? "text-primary-light"
                    : "text-neutral-700 hover:text-primary-light"
                  } font-medium`}>
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-neutral-600 hover:text-neutral-900 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white shadow-inner ${mobileMenuOpen ? '' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3 space-y-1">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <a
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location === item.href
                    ? "bg-neutral-100 text-primary-light"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
