import { useState } from "react";
import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Violations", href: "/violations" },
    { name: "Report Issue", href: "/report" },
    { name: "Landlord/Building", href: "/buildings" },
    { name: "Map", href: "/map" },
    { name: "Search", href: "/search" },
    { name: "Resources", href: "/resources" },
    { name: "Upload & Store", href: "/upload" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto px-0 sm:px-2 lg:px-2">
        <div className="flex items-center h-14">
          <Link href="/" className="flex items-center mr-4">
            <span className="font-bold text-xl text-primary-dark text-left">TenantVoice</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  location === item.href
                    ? "text-primary-light"
                    : "text-neutral-700 hover:text-primary-light hover:underline"
                  } font-medium text-sm px-1 transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-neutral-600 hover:text-neutral-900 focus:outline-none ml-auto"
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
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                location === item.href
                  ? "bg-neutral-100 text-primary-light"
                  : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-light"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
