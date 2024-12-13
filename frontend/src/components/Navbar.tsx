import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC<{
    onServicesClick: () => void;
    onAboutClick: () => void;
    onContactClick: () => void;
}> = ({ onServicesClick, onAboutClick, onContactClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleHomeClick = () => {
        if (window.location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
        }
    };

    const handleAboutClick = () => {
        if (window.location.pathname === "/") {
            onAboutClick();
        } else {
            navigate("/#about-section");
            setTimeout(() => {
                const element = document.getElementById("about-section");
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100); // Delay to ensure DOM updates
        }
    };

    const handleContactClick = () => {
        if (window.location.pathname === "/") {
            onContactClick();
        } else {
            navigate("/#contact-section");
            setTimeout(() => {
                const element = document.getElementById("contact-section");
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100); // Delay to ensure DOM updates
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
                        onClick={onServicesClick}
                    >
                        SERVICES
                    </li>
                    <li
                        className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer"
                        onClick={handleAboutClick}
                    >
                        ABOUT
                    </li>
                    <li className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer">
                        PRICING
                    </li>
                    <li
                        className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer"
                        onClick={handleContactClick}
                    >
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
                className={`absolute top-16 right-4 z-10 sm:hidden transform text-[#f2e9da] transition-all duration-500 font-light text-sm tracking-wider ease-in-out ${
                    isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
                <ul className="flex flex-col items-end bg-stone-900 bg-opacity-80 backdrop-blur-md border border-[#bd976d] px-4 py-2 rounded-lg shadow-lg space-y-10">
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
                            onServicesClick();
                            setIsMenuOpen(false);
                        }}
                    >
                        SERVICES
                    </li>
                    <li
                        className="hover:text-[#bd976d] transition-all duration-300 cursor-pointer py-1 text-right"
                        onClick={() => {
                            handleAboutClick();
                            setIsMenuOpen(false);
                        }}
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
                        onClick={() => {
                            handleContactClick();
                            setIsMenuOpen(false);
                        }}
                    >
                        CONTACT
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
