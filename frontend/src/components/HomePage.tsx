import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import backgroundImage from "../assets/web2gold.png";
import Navbar from "./Navbar";

const HomePage: React.FC = () => {
    const [servicesRef, servicesInView] = useInView({
        triggerOnce: true,
        threshold: 0.2, // Animation starts when 20% of the section is visible
    });

    const textVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay, duration: 0.8 },
        }),
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <div className="bg-stone-900 text-white overflow-hidden">
            {/* Navbar */}
            <Navbar />


            {/* Hero Section */}
            <section
                className="relative flex flex-col justify-center text-left min-h-screen md:items-start items-center"
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
                <div className="relative flex flex-col md:flex-row ">
                    {/* Text Content */}
                    <div className="max-w-2xl md:pl-24 text-center md:text-left space-y-4">
                        <motion.h1
                            className="text-5xl md:text-7xl font-medium uppercase tracking-widest"
                            style={{
                                color: "#f2c185",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                            }}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                            variants={textVariants}
                        >
                            ASK HUB
                        </motion.h1>
                        <motion.h2
                            className="text-2xl md:text-4xl font-normal"
                            style={{
                                color: "#f2e9da",
                                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                            }}
                            initial="hidden"
                            animate="visible"
                            custom={0.4}
                            variants={textVariants}
                        >
                            Your Data, Your Control, Our AI
                        </motion.h2>
                        <motion.p
                            className="text-lg md:text-xl font-light leading-relaxed hidden md:block"
                            style={{
                                color: "#ffffff",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
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

                    {/* Button */}
                    <div className="flex w-full justify-center md:w-auto j ">
                        <motion.div
                            className="flex flex-col gap-4 items-center md:justify-end"
                            initial="hidden"
                            animate="visible"
                            custom={0.8}
                            variants={textVariants}
                        >
                            <button className="bg-[#bd976d] text-white py-2 px-6 my-4 rounded-lg text-sm md:text-base relative overflow-hidden group">
                                <span className="absolute inset-0 bg-gradient-to-r from-[#a87f58] to-[#292524] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                                <span className="tracking-wider relative">Free Trial</span>
                            </button>


                        </motion.div>
                    </div>
                </div>
            </section>



            {/* Services Section */}
            <motion.section
                className="py-12 px-4 sm:px-8 lg:px-12"
                ref={servicesRef}
                initial="hidden"
                animate={servicesInView ? "visible" : "hidden"}
                variants={sectionVariants}
            >
                <h2 className="text-4xl md:text-6xl  font-bold text-left tracking-wider mb-10 text-[#bd976d]">
                    SERVICES
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <motion.div
                        className="bg-stone-800 p-4 md:p-6 rounded-lg shadow-lg text-center"
                        variants={sectionVariants}
                    >
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#bd976d]">
                            AI Chatbot Integration
                        </h3>
                        <p className="text-stone-50 text-sm md:text-base">
                            Enhance your website with an AI-powered chatbot capable of answering user queries
                            in natural language.
                        </p>
                    </motion.div>
                    <motion.div
                        className="bg-stone-800 p-4 md:p-6 rounded-lg shadow-lg text-center"
                        variants={sectionVariants}
                    >
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#bd976d]">
                            Privacy-First RAG Systems
                        </h3>
                        <p className="text-stone-50 text-sm md:text-base">
                            Fully local AI systems to keep your sensitive data private and secure.
                        </p>
                    </motion.div>
                    <motion.div
                        className="bg-stone-800 p-4 md:p-6 rounded-lg shadow-lg text-center"
                        variants={sectionVariants}
                    >
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#bd976d]">
                            Custom AI Solutions
                        </h3>
                        <p className="text-stone-50 text-sm md:text-base">
                            Tailored solutions for complex use cases with complete privacy assurance.
                        </p>
                    </motion.div>
                    <motion.div
                        className="bg-stone-800 p-4 md:p-6 rounded-lg shadow-lg text-center"
                        variants={sectionVariants}
                    >
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#bd976d]">
                            Custom User Interface
                        </h3>
                        <p className="text-stone-50 text-sm md:text-base">
                            Tailored interface for your business or organisation.
                        </p>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default HomePage;
