import React from "react";
import backgroundImage from "../assets/web2gold.png"; // Correct path to your image
import Navbar from "./Navbar";


const HomePage: React.FC = () => {
    return (
        <div className="bg-stone-900 text-white">
            {/* Navbar */}
            <Navbar />


            {/* Hero Section */}
            <section
                className="relative flex flex-col items-center justify-center text-center min-h-screen px-4 md:px-8"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Content */}
                <div className="relative z-10">
                    <h1
                        className="text-3xl md:text-5xl font-bold mb-4"
                        style={{
                            color: "#f2c185",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                        }}
                    >
                        Ask-Hub
                    </h1>
                    <h2
                        className="text-xl md:text-3xl font-semibold mb-6"
                        style={{
                            color: "#f2e9da",
                            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        Your Data, Your Control, Our AI
                    </h2>
                    <p
                        className="text-sm md:text-lg max-w-md md:max-w-2xl mb-6 px-2"
                        style={{
                            color: "#ffffff",
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                        }}
                    >
                        Simplifying answers with AI-powered assistance while keeping your data safe.
                        Experience the power of privacy-first solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-[#bd976d] hover:bg-[#a87f58] text-white py-3 px-6 rounded-lg">
                            Try Free Trial
                        </button>
                        <button className="bg-stone-600 hover:bg-stone-300 py-3 px-6 rounded-lg text-[#bd976d]">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-12 px-4 sm:px-8 lg:px-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#bd976d]">
                    Our Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-stone-800 p-4 md:p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#bd976d]">
                            AI Chatbot Integration
                        </h3>
                        <p className="text-stone-50 text-sm md:text-base">
                            Enhance your website with an AI-powered chatbot capable of answering user queries
                            in natural language.
                        </p>
                    </div>
                    <div className="bg-stone-800 p-4 md:p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#bd976d]">
                            Privacy-First RAG Systems
                        </h3>
                        <p className="text-stone-50 text-sm md:text-base">
                            Fully local AI systems to keep your sensitive data private and secure.
                        </p>
                    </div>
                    <div className="bg-stone-800 p-4 md:p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#bd976d]">
                            Custom AI Solutions
                        </h3>
                        <p className="text-stone-50 text-sm md:text-base">
                            Tailored solutions for complex use cases with complete privacy assurance.
                        </p>
                    </div>
                    <div className="bg-stone-800 p-4 md:p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#bd976d]">
                            Custom User Interface
                        </h3>
                        <p className="text-stone-50 text-sm md:text-base">
                            Tailored interface for your business or organisation.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
