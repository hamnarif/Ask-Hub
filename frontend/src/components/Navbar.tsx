import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="absolute top-5 sm:top-8 md:top-10 left-0 w-full flex justify-center z-20">
            <div className="flex flex-col items-center">
                {/* Custom Two-Line Icon */}
                <div className="w-8 h-[2px] sm:w-10 sm:h-[3px] md:w-12 md:h-[3px] bg-[#f2e9da] mb-1"></div>
                <div className="w-8 h-[2px] sm:w-10 sm:h-[3px] md:w-12 md:h-[3px] bg-[#f2e9da]"></div>
            </div>
        </nav>
    );
};

export default Navbar;
