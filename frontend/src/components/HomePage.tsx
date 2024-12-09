import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import backgroundImage from "../assets/web2gold.png";
import Navbar from "./Navbar";

const HomePage: React.FC = () => {
    const [servicesRef, servicesInView] = useInView({
        triggerOnce: false, // Allow re-triggering
        threshold: 0.2, // Animation starts when 20% of the section is visible
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
            setRetriggerAnimation(true); // Trigger the animation
            setTimeout(() => setRetriggerAnimation(false), 1000); // Reset animation after 1 second
        }
    };

    return (
        <div className="bg-stone-900 text-white overflow-hidden">
            {/* Navbar */}
            <Navbar onServicesClick={handleServicesClick} />

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
                    {/* Service Card 1 */}
                    <div className="p-6 rounded-lg shadow-lg text-center relative overflow-hidden bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-500 ease-in-out group hover:shadow-[0px_0px_15px_5px_rgba(255,215,150,0.6)]">
                        <h3 className="text-2xl font-medium text-[#bd976d] group-hover:translate-y-[-50%] group-hover:scale-90 transition-all duration-500 ease-in-out tracking-widest">
                            AI Chatbot Integration
                        </h3>
                        <p className="text-stone-50 text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                            Enhance your website with an AI-powered chatbot capable of answering user queries in natural language.
                        </p>
                    </div>

                    {/* Service Card 2 */}
                    <div className="p-6 rounded-lg shadow-lg text-center relative overflow-hidden bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-500 ease-in-out group hover:shadow-[0px_0px_15px_5px_rgba(255,215,150,0.6)]">
                        <h3 className="text-2xl font-medium text-[#bd976d] group-hover:translate-y-[-50%] group-hover:scale-90 transition-all duration-500 ease-in-out tracking-widest my-4">
                            Privacy-First RAG Systems
                        </h3>
                        <p className="text-stone-50 text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                            Fully local AI systems to keep your sensitive data private and secure.
                        </p>
                    </div>

                    {/* Service Card 3 */}
                    <div className="p-6 rounded-lg shadow-lg text-center relative overflow-hidden bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-500 ease-in-out group hover:shadow-[0px_0px_15px_5px_rgba(255,215,150,0.6)]">
                        <h3 className="text-2xl font-medium text-[#bd976d] group-hover:translate-y-[-50%] group-hover:scale-90 transition-all duration-500 ease-in-out tracking-widest">
                            Custom AI Solutions
                        </h3>
                        <p className="text-stone-50 text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                            Tailored solutions for complex use cases with complete privacy assurance.
                        </p>
                    </div>

                    {/* Service Card 4 */}
                    <div className="p-6 rounded-lg shadow-lg text-center relative overflow-hidden bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-500 ease-in-out group hover:shadow-[0px_0px_15px_5px_rgba(255,215,150,0.6)]">
                        <h3 className="text-2xl font-medium text-[#bd976d] group-hover:translate-y-[-50%] group-hover:scale-90 transition-all duration-500 ease-in-out tracking-widest">
                            Custom User Interface
                        </h3>
                        <p className="text-stone-50 text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                            Tailored interface for your business or organisation.
                        </p>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default HomePage;
