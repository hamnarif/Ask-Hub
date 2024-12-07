import React from "react";
import backgroundImage from "../assets/web2gold.png"; // Correct path to your image

const HomePage: React.FC = () => {
    return (
        <div className="bg-stone-900 text-white">
            {/* Hero Section */}
            <section
                className="relative flex flex-col items-center justify-center text-center min-h-screen px-4"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    height: "100vh",
                }}
            >
                <h1
                    className="text-4xl md:text-6xl font-bold mb-4"
                    style={{
                        color: "#f2c185", // Subtle gold color
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Soft shadow
                    }}
                >
                    Ask-Hub
                </h1>
                <h2
                    className="text-2xl md:text-4xl font-semibold mb-8"
                    style={{
                        color: "#f2e9da", // Light beige for contrast
                        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // Slight shadow for readability
                    }}
                >
                    Your Data, Your Control, Our AI
                </h2>
                <p
                    className="text-lg md:text-xl max-w-2xl mb-8"
                    style={{
                        color: "#ffffff", // White text
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)", // Slight shadow for contrast
                    }}
                >
                    Simplifying answers with AI-powered assistance while keeping your data safe.
                    Experience the power of privacy-first solutions.
                </p>
                <div>
                    <button className="bg-[#bd976d] hover:bg-[#a87f58] text-white py-3 px-6 rounded-lg mr-4">
                        Try Free Trial
                    </button>
                    <button className="bg-stone-600 hover:bg-stone-300 py-3 px-6 rounded-lg text-[#bd976d]">
                        Learn More
                    </button>
                </div>
            </section>

            {/* Other Sections */}
            <section className="py-20 px-6 md:px-12">
                <h2 className="text-3xl font-bold text-center mb-12 text-[#bd976d]">
                    Our Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="bg-stone-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold mb-4 text-[#bd976d]">AI Chatbot Integration</h3>
                        <p className="text-stone-50">
                            Enhance your website with an AI-powered chatbot capable of answering user queries
                            in natural language.
                        </p>
                    </div>
                    <div className="bg-stone-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold mb-4 text-[#bd976d]">Privacy-First RAG Systems</h3>
                        <p className="text-stone-50">
                            Fully local AI systems to keep your sensitive data private and secure.
                        </p>
                    </div>
                    <div className="bg-stone-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold mb-4 text-[#bd976d]">Custom AI Solutions</h3>
                        <p className="text-stone-50">
                            Tailored solutions for complex use cases with complete privacy assurance.
                        </p>
                    </div>
                    <div className="bg-stone-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold mb-4 text-[#bd976d]">Custom User Interface</h3>
                        <p className="text-stone-50">
                            Tailored interface for your business or organisation.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
