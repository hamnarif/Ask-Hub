import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Chats from "./Chats";
import pencilChatIcon from "../assets/pencil-chat.svg";

const ChatBot = () => {
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isFileSent, setIsFileSent] = useState(false); // To track if the file has been sent
    const [isProcessing, setIsProcessing] = useState(false); // To track PDF processing
    const navigate = useNavigate();

    const [messages, setMessages] = useState<{ user?: string; bot?: string; file?: string }[]>([]);
    const [inputValue, setInputValue] = useState("");

    const abortControllerRef = useRef<AbortController | null>(null);

    // Add cleanup effect when component unmounts
    useEffect(() => {
        return () => {
            // Cleanup function that runs when component unmounts
            if (isProcessing && uploadedFile) {
                handleRemoveFile();
            }
        };
    }, [isProcessing, uploadedFile]);

    // Reset state for a new chat without reloading the page
    const handleNewChat = () => {
        setMessages([]);
        setUploadedFile(null);
        setIsUploading(false);
        setIsFileSent(false);
        setIsProcessing(false);
        setInputValue("");
    };

    const scrollToSection = (section: string) => {
        navigate(`/#${section}`);
        const interval = setInterval(() => {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                clearInterval(interval);
            }
        }, 100);
    };

    const handleServicesClick = () => scrollToSection("services-section");
    const handleAboutClick = () => scrollToSection("about-section");
    const handleContactClick = () => scrollToSection("contact-section");

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isFileSent) {
            alert("You can only upload one PDF per chat.");
            return;
        }

        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setIsUploading(true);
            setIsProcessing(true);
            setUploadedFile(file.name);

            // Create new AbortController for this request
            abortControllerRef.current = new AbortController();
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("http://127.0.0.1:8000/process-pdf/", {
                    method: "POST",
                    body: formData,
                    signal: abortControllerRef.current.signal // Add abort signal
                });

                if (response.ok) {
                    setIsFileSent(true);
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.detail}`);
                    setUploadedFile(null);
                    setIsFileSent(false);
                }
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    console.log('Request was cancelled');
                } else {
                    alert("An error occurred while uploading the PDF. Please try again.");
                }
                setUploadedFile(null);
                setIsFileSent(false);
            } finally {
                setIsUploading(false);
                setIsProcessing(false);
                abortControllerRef.current = null;
            }
        } else {
            alert("Only PDF files are allowed!");
        }
    };

    const handleRemoveFile = async () => {
        if (abortControllerRef.current) {
            // Abort the ongoing fetch request
            abortControllerRef.current.abort();
        }
    
        if (uploadedFile) {
            // Send cancellation signal to the backend
            try {
                await fetch("http://127.0.0.1:8000/cancel-processing/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ filename: uploadedFile }),
                });
            } catch (err) {
                console.error("Error sending cancellation request to backend:", err);
            }
        }
    
        // Reset state variables
        setUploadedFile(null);
        setIsUploading(false);
        setIsProcessing(false);
        setIsFileSent(false);
        setInputValue("");
        
        // Reset file input if it exists
        const fileInput = document.getElementById("file-upload") as HTMLInputElement;
        if (fileInput) {
            fileInput.value = "";
        }
    };
    
    const handleSendMessage = () => {
        if (!uploadedFile && inputValue.trim() === "") return; // Prevent empty messages
    
        // Add the new message to the chat
        const newMessage = {
            file: uploadedFile || undefined,
            user: inputValue.trim() || undefined,
            bot: "Backend not connected", // Replace this with backend response later
        };
    
        // Clear the file and input states **before** updating the messages
        setUploadedFile(null); // Reset file state
        setIsFileSent(false); // Reset file sent state
        setInputValue(""); // Clear text input
    
        // Clear file input in DOM
        const fileInput = document.getElementById("file-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    
        // Update the chat messages
        setMessages((prev) => [...prev, newMessage]);
    };
    
    return (
        <main className="h-screen w-screen flex flex-col bg-stone-900 overflow-hidden">
            <Navbar
                onServicesClick={handleServicesClick}
                onAboutClick={handleAboutClick}
                onContactClick={handleContactClick}
            />
            
            {/* Desktop New Chat Icon */}
            <aside className="absolute top-20 left-8 cursor-pointer hidden md:flex items-center space-x-2 z-10" onClick={handleNewChat}>
                <img
                    src={pencilChatIcon}
                    alt="New Chat"
                    className="w-8 h-8 hover:brightness-125 transition duration-200"
                />
                <span className="text-stone-300 text-sm">New Chat</span>
            </aside>

            {/* Mobile New Chat Icon */}
            <aside className="fixed top-20 left-4 md:hidden z-20 bg-gradient-to-r from-[#a87f58] to-[#292524] p-3 rounded-full shadow-lg cursor-pointer hover:brightness-110 transition-all duration-200"
                onClick={handleNewChat}>
                <img
                    src={pencilChatIcon}
                    alt="New Chat"
                    className="w-6 h-6 brightness-200"
                />
            </aside>

            <section className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 relative">
                <article className="bg-stone-950 text-center rounded-xl shadow-lg p-4 sm:p-6 w-full md:w-10/12 lg:w-8/12 h-[85vh] flex flex-col">
                    {/* Chats Component */}
                    <div className="flex-1 overflow-hidden">
                        <Chats
                            messages={messages}
                            isProcessing={isProcessing}
                            isFileSent={isFileSent}
                        />
                    </div>

                    {/* Input Area */}
                    <div className="w-full relative mt-4 flex-shrink-0">
                        {/* File Upload Icon */}
                        <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-stone-200 z-10">
                            {!isFileSent && (
                                <label
                                    htmlFor="file-upload"
                                    className={`cursor-pointer p-2 ${(isUploading || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <svg
                                        width="800px"
                                        height="800px"
                                        viewBox="0 0 16 16"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className={`w-4 sm:w-5 h-4 sm:h-5 fill-white ${(isUploading || isProcessing) ? 'opacity-50' : ''}`}
                                    >
                                        <path
                                            fill="#FFFFFF"
                                            d="M9.387 2.102a2.034 2.034 0 012.864 0c.776.785.749 2.178 0 2.928-.75.749-6.39 6.465-6.39 6.465a.642.642 0 01-.898 0 .685.685 0 010-.937l5.896-5.966a.75.75 0 10-1.066-1.054L3.896 9.504a2.184 2.184 0 000 3.045 2.142 2.142 0 003.033 0l6.39-6.466c1.36-1.377 1.36-3.658 0-5.035-1.364-1.381-3.636-1.381-5 0L1.938 7.513A5.001 5.001 0 00.5 11.026c0 1.316.516 2.58 1.437 3.514A4.892 4.892 0 005.42 16c1.308 0 2.56-.526 3.482-1.46l6.383-6.466a.75.75 0 10-1.068-1.053l-6.382 6.465A3.392 3.392 0 015.419 14.5a3.392 3.392 0 01-2.414-1.014A3.501 3.501 0 012 11.026c0-.924.363-1.808 1.005-2.46l6.382-6.464z"
                                        />
                                    </svg>
                                </label>
                            )}
                            <input
                                id="file-upload"
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={handleFileUpload}
                                disabled={isUploading || isProcessing}
                            />
                        </div>

                        <div
                            className={`w-full bg-gradient-to-r from-[#a87f58] to-[#292524] p-3 sm:p-4 text-stone-50 placeholder:text-stone-200 rounded-full pl-14 pr-12 outline-none flex flex-col ${uploadedFile ? "h-24 sm:h-32" : "h-16 sm:h-20"
                                }`}
                            style={{ paddingLeft: "4rem" }} // Adjust padding to fix overlapping
                        >
                            {uploadedFile && (
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="bg-red-700 p-1.5 sm:p-2 rounded-full">
                                        {isUploading || isProcessing ? (
                                            <svg
                                                className="animate-spin h-6 w-6 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C3.58 0 0 8 0 8h4z"
                                                ></path>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 fill-current text-white"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 3h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium truncate">{uploadedFile}</span>
                                    <button
                                        onClick={handleRemoveFile}
                                        className="text-white hover:text-red-600 text-xs p-1"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                            <textarea
                                className="bg-transparent outline-none w-full text-sm sm:text-base text-stone-100 placeholder:text-stone-200 resize-none overflow-hidden"
                                placeholder="Ask Hub"
                                disabled={!uploadedFile || isUploading || isProcessing} // Disable when no file or uploading/processing
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.shiftKey) {
                                        e.preventDefault();
                                        setInputValue((prev) => prev + "\n");
                                    } else if (e.key === "Enter" && inputValue.trim() !== "") {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                rows={uploadedFile ? 2 : 1}
                            />
                        </div>

                        {/* Send Button */}
                        <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                            <button
                                onClick={handleSendMessage}
                                className="p-2"
                                disabled={isUploading || isProcessing || inputValue.trim() === ""}
                            >
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 122.88 122.88"
                                    className={`w-4 sm:w-5 h-4 sm:h-5 fill-current text-stone-200 transition duration-300 ease-in-out ${isUploading || isProcessing || inputValue.trim() === ""
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:brightness-200 hover:drop-shadow-glow"
                                        }`}
                                >
                                    <polygon points="122.88,0 81.35,122.88 62.34,60.54 0,41.53 122.88,0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    );
};

export default ChatBot;
