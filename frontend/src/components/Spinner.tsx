import React from "react";

interface SpinnerProps {
    count: number;
}

const Spinner: React.FC<SpinnerProps> = ({ count }) => {
    const formattedCount = count.toString().padStart(2, "0");

    return (
        <div className="flex justify-center items-center h-screen bg-stone-900">
            {/* Spinner Container */}
            <div className="relative flex justify-center items-center">
                {/* SVG Circle */}
                <svg
                    className="absolute"
                    width="50vw"
                    height="50vw"
                    viewBox="0 0 100 100"
                    style={{
                        maxWidth: "420px", // Max size for large screens
                        maxHeight: "420px",
                    }}
                >
                    {/* Background Circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#4a4a4a"
                        strokeWidth=".5"
                        fill="none"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#bd976d"
                        strokeWidth=".5"
                        fill="none"
                        strokeDasharray="282.6"
                        strokeDashoffset={282.6 - (count / 100) * 282.6}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                    />
                </svg>

                {/* Text Inside Spinner */}
                <div
                    className="absolute text-center"
                    style={{ color: "#bd976d" }}
                >
                    <span className="font-thin text-6xl md:text-8xl">
                        {formattedCount}
                    </span>
                    <div className="text-sm md:text-base mt-2 font-normal text-stone-500">
                        LOADING
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
