import React from "react";
import backgroundImage from "../assets/web2gold.png";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {

    const textVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay, duration: 0.8 },
        }),
    };

    return (
        <div className="bg-stone-900 text-white overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section
                className="relative flex flex-col justify-center text-left min-h-screen"
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
                <div className="relative z-10 max-w-2xl space-y-4 pl-12 md:pl-24">
                    {/* Heading */}
                    <motion.h1
                        className="text-5xl md:text-7xl font-medium uppercase tracking-widest"
                        style={{
                            color: "#f2c185",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                            marginBottom: "20px",
                        }}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                        variants={textVariants}
                    >
                        ASK HUB
                    </motion.h1>

                    {/* Subheading */}
                    <motion.h2
                        className="text-2xl md:text-4xl font-normal"
                        style={{
                            color: "#f2e9da",
                            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                            marginBottom: "16px",
                        }}
                        initial="hidden"
                        animate="visible"
                        custom={0.4}
                        variants={textVariants}
                    >
                        Your Data, Your Control, Our AI
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="text-lg md:text-xl font-light leading-relaxed"
                        style={{
                            color: "#ffffff",
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                            marginBottom: "24px",
                        }}
                        initial="hidden"
                        animate="visible"
                        custom={0.6}
                        variants={textVariants}
                    >
                        Simplifying answers with AI-powered assistance while keeping your data safe.
                        Experience the power of privacy-first solutions.
                    </motion.p>
                </div>

                {/* Buttons at Bottom Right */}
                <motion.div
                    className="absolute bottom-8 right-8 flex flex-col gap-4 z-10"
                    initial="hidden"
                    animate="visible"
                    custom={0.8}
                    variants={textVariants}
                >
                    <button className="bg-[#bd976d] hover:bg-[#a87f58] text-white py-2 px-6 rounded-lg text-sm md:text-base">
                        Try Free Trial
                    </button>
                    <button className="bg-stone-600 hover:bg-stone-300 py-2 px-6 rounded-lg text-[#bd976d] text-sm md:text-base">
                        Learn More
                    </button>
                </motion.div>
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
