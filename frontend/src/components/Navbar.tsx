import React, { useState } from "react";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleHomeClick = () => {
        if (window.location.pathname === "/") {
            // Scroll to the top if already on the home page
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // Redirect to the home page
            window.location.href = "/";
        }
    };

    const handleServicesClick = () => {
        if (window.location.pathname === "/") {
            // Scroll to the "Services" section if on the home page
            const servicesSection = document.getElementById("services-section");
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Redirect to the home page and scroll to the "Services" section
            window.location.href = "/#services-section";
        }
    };

    return (
        <nav className="fixed top-0 w-full z-20 bg-stone-900 bg-opacity-30 backdrop-blur-md border-b border-[#bd976d]">
            <div className="flex justify-end items-center px-6 sm:px-12 md:px-20 py-4">
                {/* Navigation Links for Larger Screens */}
                <ul className="hidden sm:flex space-x-6 md:space-x-8 text-[#f2e9da] text-sm sm:text-base md:text-lg font-medium uppercase tracking-widest">
                    <li
                        className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer"
                        onClick={handleHomeClick}
                    >
                        HOME
                    </li>
                    <li
                        className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer"
                        onClick={handleServicesClick}
                    >
                        SERVICES
                    </li>
                    <li className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer">
                        ABOUT
                    </li>
                    <li className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer">
                        PRICING
                    </li>
                    <li className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer">
                        CONTACT
                    </li>
                </ul>

                {/* Mobile Toggle Icon */}
                <div
                    className="sm:hidden flex items-center cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-[1px] bg-[#f2e9da] mb-1"></div>
                        <div className="w-8 h-[.5px] bg-[#f2e9da]"></div>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`absolute top-16 right-4 z-10 sm:hidden transform transition-all duration-500 font-light text-sm tracking-wider ease-in-out ${
                    isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
                <ul className="flex flex-col items-end bg-stone-900 bg-opacity-80 backdrop-blur-md border border-[#bd976d] px-4 py-2 rounded-lg shadow-lg">
                    <li
                        className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer py-1 text-right"
                        onClick={() => {
                            handleHomeClick();
                            setIsMenuOpen(false);
                        }}
                    >
                        HOME
                    </li>
                    <li
                        className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer py-1 text-right"
                        onClick={() => {
                            handleServicesClick();
                            setIsMenuOpen(false);
                        }}
                    >
                        SERVICES
                    </li>
                    <li
                        className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer py-1 text-right"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        ABOUT
                    </li>
                    <li
                        className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer py-1 text-right"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        PRICING
                    </li>
                    <li
                        className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer py-1 text-right"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        CONTACT
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
