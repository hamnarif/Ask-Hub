import React, { useEffect, useState } from "react";

const Spinner: React.FC = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Increment the count every 100ms up to 100
        const interval = setInterval(() => {
            setCount((prev) => (prev < 100 ? prev + 3 : 100));
        }, 50);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const formattedCount = count.toString().padStart(2, "0");

    return (
        <div className="flex justify-center items-center h-screen bg-stone-900">
            {/* Spinner Container */}
            <div className="relative flex justify-center items-center">
                {/* SVG Circle */}
                <svg
                    className="absolute"
                    width="420"
                    height="420"
                    viewBox="0 0 100 100"
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
                    <span className="font-thin text-8xl">{formattedCount}</span>
                    <div className="text-base mt-2 font-normal text-stone-500 ">LOADING</div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
