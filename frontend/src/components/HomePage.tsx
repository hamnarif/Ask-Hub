import React from "react";

const HomePage: React.FC = () => {
    return (
        <div className="bg-stone-900 text-white min-h-screen">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#bd976d]">
                    Smarter AI, Total Privacy
                </h1>
                <p className="text-lg md:text-xl text-stone-50 max-w-2xl mb-8">
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

            {/* Services Section */}
            <section className="py-16 px-6 md:px-12">
                <h2 className="text-3xl font-bold text-center mb-12 text-[#bd976d]">
                    Our Services
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
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
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-6 md:px-12 bg-stone-800">
                <h2 className="text-3xl font-bold text-center mb-12 text-[#bd976d]">
                    What Our Clients Say
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-stone-700 p-6 rounded-lg shadow-lg">
                        <p className="text-stone-50 mb-4">
                            "The AI chatbot seamlessly integrated with our website and provided a fantastic
                            user experience. Highly recommended!"
                        </p>
                        <p className="font-semibold text-[#bd976d]">- Client Name</p>
                    </div>
                    <div className="bg-stone-700 p-6 rounded-lg shadow-lg">
                        <p className="text-stone-50 mb-4">
                            "Their privacy-preserving solutions are unmatched. We trust them for all our
                            sensitive AI needs."
                        </p>
                        <p className="font-semibold text-[#bd976d]">- Client Name</p>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="flex flex-col items-center justify-center text-center py-16 px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#bd976d]">Ready to Get Started?</h2>
                <p className="text-stone-50 text-lg mb-8">
                    Discover how our AI solutions can transform your business. Try it today!
                </p>
                <button className="bg-[#bd976d] hover:bg-[#a87f58] text-white py-3 px-6 rounded-lg">
                    Contact Us Now
                </button>
            </section>
        </div>
    );
};

export default HomePage;
