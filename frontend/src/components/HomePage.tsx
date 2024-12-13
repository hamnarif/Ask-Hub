import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import backgroundImage from "../assets/web2gold.png";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const HomePage: React.FC = () => {
    const [servicesRef, servicesInView] = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });
    const navigate = useNavigate(); // Initialize navigate
    const [toastVisible, setToastVisible] = useState(false);

    const [aboutRef, aboutInView] = useInView({
        triggerOnce: false,
        threshold: 0.1, // Trigger animation earlier for "About Us"
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

    const handleFreeTrialClick = () => {
        navigate("/chatbot"); // Navigate to the ChatBotPage
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

    const handleContactClick = () => {
        const contactSection = document.getElementById("contact-section");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        } else {
            window.location.href = "/#contact-section";
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission
        setToastVisible(true); // Show toast
        setTimeout(() => setToastVisible(false), 3000); // Hide toast after 3 seconds
    };


    return (
        <div className="bg-stone-900 overflow-hidden">
            {/* Navbar */}
            <Navbar
                onServicesClick={handleServicesClick}
                onAboutClick={handleAboutClick}
                onContactClick={handleContactClick}
            />

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
                            className="text-lg md:text-xl font-light leading-relaxed hidden md:block text-stone-50"
                            style={{
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
                    <div
                        onClick={handleFreeTrialClick}

                        className="flex w-full justify-center md:w-auto mt-6">
                        <motion.div
                            className="flex flex-col gap-4 items-center md:justify-end"
                            initial="hidden"
                            animate="visible"
                            custom={0.8}
                            variants={textVariants}
                        >
                            <button className="bg-[#bd976d] text-stone-50 py-2 px-6 my-4  text-sm md:text-base relative overflow-hidden group">
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
                ref={aboutRef} // Independent ref for About Us
                initial="hidden"
                animate={aboutInView ? "visible" : "hidden"} // Animation trigger for About Us
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
                            <h3 className="text-3xl font-bold text-[#f2e9da] group-hover:text-[#bd976d] group-hover:text-2xl group-hover:translate-y-[-10%] transition-all duration-500 ease-in-out tracking-wider flex items-center justify-center">
                                {service.title}
                            </h3>
                            <p className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-stone-50 text-base mt-2">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.section>


            {/* Form Section */}
            <motion.section
                id="form-section"
                className="py-12 px-4 sm:px-8 lg:px-12"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                {toastVisible && (
                    <div
                        className="fixed top-20 left-4 bg-[#292524] text-[#f2e9da] border border-[#bd976d] rounded-md px-6 py-3 shadow-lg z-50"
                        style={{
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                            maxWidth: "80%", // Adjust width for responsiveness
                        }}
                    >
                        Your message    has been sent successfully!
                    </div>
                )}

                <div className="flex justify-center">
                    <div className="w-full max-w-3xl  p-8  shadow-lg bg-[#292524] border border-[rgba(255,255,255,0.2)]">
                        <h2 className="text-2xl md:text-5xl font-bold text-center tracking-wider mb-10 text-[#bd976d]">
                            Get in Touch with Us!
                        </h2>


                        <form className="max-w-md mx-auto" onSubmit={handleFormSubmit}>



                            <style>
                                {`
                                input:-webkit-autofill,
                                input:-webkit-autofill:hover,
                                input:-webkit-autofill:focus,
                                textarea:-webkit-autofill,
                                textarea:-webkit-autofill:hover,
                                textarea:-webkit-autofill:focus {
                                    -webkit-box-shadow: 0 0 0px 1000px #1f1b16 inset !important;
                                    box-shadow: 0 0 0px 1000px #1f1b16 inset !important;
                                    -webkit-text-fill-color: #f2e9da !important;
                                }

                                input:-webkit-autofill + label,
                                textarea:-webkit-autofill + label {
                                    color: #f2e9da !important;
                                    top: 0.5rem !important; /* Adjusted to align with input text */
                                    transform: scale(0.85) !important; /* Slightly smaller to fit above the text */
                                }

                                .peer-placeholder-shown {
                                    margin-top: 0; /* Prevents excessive margin */
                                }

                                .peer-focus + label {
                                    margin-top: 0; /* Keeps the label aligned during focus */
                                    top: -0.5rem !important; /* Ensures alignment in focus state */
                                }
                            `}
                            </style>



                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="message"
                                    name="message"
                                    id="message"
                                    className="block py-2.5 px-0 w-full text-sm text-[#f2e9da] bg-transparent border-0 border-b-2 border-[#3a312a] appearance-none focus:outline-none focus:ring-0 focus:border-[#bd976d] peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="message"
                                    className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Service You Need
                                </label>
                            </div>

                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="floating_first_name"
                                        id="floating_first_name"
                                        className="block py-2.5 px-0 w-full text-sm text-[#f2e9da] bg-transparent border-0 border-b-2 border-[#3a312a] appearance-none focus:outline-none focus:ring-0 focus:border-[#bd976d] peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_first_name"
                                        className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        First name
                                    </label>
                                </div>

                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="floating_last_name"
                                        id="floating_last_name"
                                        className="block py-2.5 px-0 w-full text-sm text-[#f2e9da] bg-transparent border-0 border-b-2 border-[#3a312a] appearance-none focus:outline-none focus:ring-0 focus:border-[#bd976d] peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_last_name"
                                        className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Last name
                                    </label>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="tel"
                                        name="floating_phone"
                                        id="floating_phone"
                                        className="block py-2.5 px-0 w-full text-sm text-[#f2e9da] bg-transparent border-0 border-b-2 border-[#3a312a] appearance-none focus:outline-none focus:ring-0 focus:border-[#bd976d] peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_phone"
                                        className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Phone number
                                    </label>

                                </div>

                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="floating_company"
                                        id="floating_company"
                                        className="block py-2.5 px-0 w-full text-sm text-[#f2e9da] bg-transparent border-0 border-b-2 border-[#3a312a] appearance-none focus:outline-none focus:ring-0 focus:border-[#bd976d] peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_company"
                                        className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Company (Ex. Google)
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="relative w-full bg-[#bd976d] text-stone-50 py-2 px-6 text-sm md:text-base shadow-md overflow-hidden group focus:outline-none transition-all duration-300 "
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#a87f58] to-[#292524] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                                <span className="relative tracking-wider">Send Message</span>
                            </button>
                        </form>



                    </div>
                </div>
            </motion.section >


            {/* Contact and Copyright Section */}
            < section
                id="contact-section"
                className="py-16 px-6 sm:px-24 text-[#f2e9da]"
            >
                {/* Contact Section */}
                < div className="flex flex-col-reverse sm:flex-row w-full justify-between items-center sm:items-end space-y-6 sm:space-y-0" >
                    {/* Copyright */}
                    < div className="text-center sm:text-left my-8  text-sm sm:text-base text-stone-400" >
                        <p>© Copyright ASH-HUB 2024. All rights reserved.</p>
                    </div >

                    {/* Contact Information */}
                    < div className="flex flex-row items-center space-x-2" >
                        {/* Vertical Contact Heading */}
                        < div className="flex-shrink-0" >
                            <h2
                                className="text-3xl sm:text-4xl font-bold tracking-tighter text-[#bd976d]"
                                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                            >
                                CONTACT
                            </h2>
                        </div >

                        {/* Contact Details */}
                        < div className="flex flex-col space-y-8 text-center sm:text-left" >
                            <div>
                                <p className="text-lg sm:text-xl">+92 333 8933350</p>
                            </div>
                            <div>
                                <p className="text-lg sm:text-xl">hamna568@gmail.com</p>
                            </div>
                            <div className="flex justify-center sm:justify-start space-x-4 text-lg sm:text-xl">
                                <a
                                    href="https://www.linkedin.com/in/hamna-arif-723520290/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition duration-300 bg-[#f2e9da]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M3,3v18h18V3H3z M9,17H6.5v-7H9V17z M7.7,8.7c-0.8,0-1.3-0.5-1.3-1.2c0-0.7,0.5-1.2,1.4-1.2c0.8,0,1.3,0.5,1.3,1.2 C9.1,8.2,8.6,8.7,7.7,8.7z M18,17h-2.4v-3.8c0-1.1-0.7-1.3-0.9-1.3c-0.2,0-1.1,0.2-1.1,1.3c0,0.2,0,3.8,0,3.8h-2.5v-7h2.5v1 c0.3-0.6,1-1,2.2-1s2.2,1,2.2,3.2V17z"></path>
                                    </svg>
                                </a>
                                <a
                                    href="https://github.com/hamnarif"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition duration-300 bg-[#f2e9da]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div >
                    </div >
                </div >
            </section >

        </div >
    );
};

export default HomePage;
