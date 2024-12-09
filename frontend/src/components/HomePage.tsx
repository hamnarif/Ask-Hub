import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import backgroundImage from "../assets/web2gold.png";
import Navbar from "./Navbar";

const HomePage: React.FC = () => {
    const [servicesRef, servicesInView] = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });

    const [retriggerAnimation, setRetriggerAnimation] = useState(false);

    const textVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay, duration: 0.8 },
        }),
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
    };

    const handleServicesClick = () => {
        const servicesSection = document.getElementById("services-section");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" });
            setRetriggerAnimation(true);
            setTimeout(() => setRetriggerAnimation(false), 1000);
        }
    };

    const handleAboutClick = () => {
        const aboutSection = document.getElementById("about-section");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="bg-stone-900 text-white overflow-hidden">
            {/* Navbar */}
            <Navbar onServicesClick={handleServicesClick} onAboutClick={handleAboutClick} />

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
                <div className="relative flex flex-col md:flex-row">
                    <div className="max-w-2xl md:pl-24 text-center md:text-left space-y-4">
                        {/* Hero Heading */}
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
                    <div className="flex w-full justify-center md:w-auto mt-6">
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

            {/* About Section */}
            <motion.section
                id="about-section"
                className="py-12 px-4 sm:px-8 lg:px-12"
                ref={servicesRef}
                initial="hidden"
                animate={retriggerAnimation || servicesInView ? "visible" : "hidden"}
                variants={sectionVariants}
            >
                <h2 className="text-4xl md:text-6xl font-bold text-left tracking-wider mb-10 text-[#bd976d]">
                    ABOUT US
                </h2>
                <p className="text-lg md:text-2xl text-stone-300 leading-relaxed">
                    At Ask Hub, we bring your data to life with cutting-edge Retrieval-Augmented Generation (RAG) technology and the latest Large Language Models (LLMs).
                    Interact with your data effortlessly using natural language, turning complex queries into instant, accurate answers.
                </p>
                <p className="text-lg md:text-2xl text-stone-300 leading-relaxed mt-4">
                    Our solutions prioritize security and customization, offering AI chatbots, privacy-first systems, and tailored tools to fit your business needs.
                    Experience smarter, faster, and safer ways to work with your data.
                </p>
            </motion.section>

            {/* Services Section */}
            <motion.section
                id="services-section"
                className="py-12 px-4 sm:px-8 lg:px-12"
                ref={servicesRef}
                initial="hidden"
                animate={retriggerAnimation || servicesInView ? "visible" : "hidden"}
                variants={sectionVariants}
            >
                <h2 className="text-4xl md:text-6xl font-bold text-left tracking-wider mb-10 text-[#bd976d]">
                    SERVICES
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        {
                            title: "AI Chatbot Integration",
                            description: "Enhance your website with an AI-powered chatbot capable of answering user queries in natural language.",
                        },
                        {
                            title: "Privacy-First RAG Systems",
                            description: "Fully local AI systems to keep your sensitive data private and secure.",
                        },
                        {
                            title: "Custom AI Solutions",
                            description: "Tailored solutions for complex use cases with complete privacy assurance.",
                        },
                        {
                            title: "Custom User Interface",
                            description: "Tailored interface for your business or organisation.",
                        },
                    ].map((service, index) => (
                        <div
                            key={index}
                            className="p-4 min-h-[4rem] max-h-[12rem] rounded-lg shadow-lg text-center relative overflow-hidden bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] hover:max-h-[16rem] transition-all duration-500 ease-in-out group hover:shadow-[0px_0px_15px_5px_rgba(255,215,150,0.6)]"
                        >
                            <h3 className="text-4xl font-bold text-[#f2e9da] group-hover:text-[#bd976d] group-hover:text-2xl group-hover:translate-y-[-10%] transition-all duration-500 ease-in-out tracking-wider flex items-center justify-center">
                                {service.title}
                            </h3>
                            <p className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-stone-50 text-base mt-2">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default HomePage;
