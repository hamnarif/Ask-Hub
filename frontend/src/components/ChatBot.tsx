import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Chats from "./Chats"; 
import pencilChatIcon from "../assets/pencil-chat.svg"; 

const ChatBot = () => {
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isFileSent, setIsFileSent] = useState(false); // To track if the file has been sent
    const navigate = useNavigate();

    const [messages, setMessages] = useState<{ user?: string; bot?: string; file?: string }[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleNewChat = () => {
        window.location.reload(); 
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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isFileSent) {
            alert("You can only upload one PDF per chat.");
            return;
        }
        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setIsUploading(true);
            setUploadedFile(file.name); // Save the file name in state
            setTimeout(() => setIsUploading(false), 2000);
        } else {
            alert("Only PDF files are allowed!");
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setIsUploading(false);
        (document.getElementById("file-upload") as HTMLInputElement).value = "";
    };

    const handleSendMessage = () => {
        if (!uploadedFile && inputValue.trim() === "") return; // Prevent empty messages

        const newMessage = {
            file: uploadedFile || undefined, // Add the file if uploaded
            user: inputValue.trim() || undefined, // Add user input if provided
            bot: "Backend not connected", // Add a bot response
        };

        setMessages((prev) => [...prev, newMessage]); // Add the message to the chat
        setInputValue(""); // Clear the text input

        if (uploadedFile) {
            setIsFileSent(true); // Mark the file as sent
            setUploadedFile(null); // Reset the uploaded file
            (document.getElementById("file-upload") as HTMLInputElement).value = ""; // Clear file input
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-stone-900 overflow-hidden">
            <Navbar
                onServicesClick={handleServicesClick}
                onAboutClick={handleAboutClick}
                onContactClick={handleContactClick}
            />
            {/* New Chat Icon */}
            <div className="absolute top-20 left-8 cursor-pointer flex items-center space-x-2 z-10" onClick={handleNewChat}>
                <img
                    src={pencilChatIcon}
                    alt="New Chat"
                    className="w-8 h-8 hover:brightness-125 transition duration-200"
                />
                <span className="text-stone-200 text-sm">New Chat</span>
            </div>

            <div className="flex-1 flex items-center justify-center px-8 relative">
                {/* Chat Component */}
                <div className="bg-stone-950 text-center rounded-xl shadow-lg p-6 w-8/12 h-[85vh] flex flex-col">
                    {/* Chats Component */}
                    <div className="flex-1 overflow-hidden">
                        <Chats messages={messages} />
                    </div>

                    {/* Input Area */}
                    <div className="w-full relative mt-4 flex-shrink-0">
                        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-stone-200">
                            {!isFileSent && ( // Disable file upload if the file is sent
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <svg
                                        width="800px"
                                        height="800px"
                                        viewBox="0 0 16 16"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="w-5 h-5 fill-white"
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
                            />
                        </div>

                        <div
                            className={`w-full bg-gradient-to-r from-[#a87f58] to-[#292524] p-4 text-stone-50 placeholder:text-stone-200 rounded-full pl-10 outline-none flex flex-col ${uploadedFile ? "h-32" : "h-20"
                                }`}
                        >
                            {uploadedFile && (
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="bg-red-700 p-2 rounded-full">
                                        {isUploading ? (
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
                                    <span className="text-sm font-medium">{uploadedFile}</span>
                                    <button
                                        onClick={handleRemoveFile}
                                        className="text-white hover:text-red-600 text-xs p-1"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}


                            <textarea
                                className="bg-transparent outline-none w-full text-stone-100 mt-2 mx-4 placeholder:text-stone-200 resize-none overflow-hidden"
                                placeholder="Ask Hub"
                                disabled={!uploadedFile && !isFileSent} // Disable if no file is selected or sent
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)} // Update inputValue on change
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.shiftKey) {
                                        // Allow Shift + Enter to insert a new line
                                        e.preventDefault();
                                        setInputValue((prev) => prev + "\n");
                                    } else if (e.key === "Enter") {
                                        // Send the message on Enter without Shift
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                rows={uploadedFile ? 4 : 2} // Dynamically set rows based on context
                            />

                        </div>

                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                            <button onClick={handleSendMessage}>
                                <svg
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 122.88 122.88"
                                    xmlSpace="preserve"
                                    className="w-5 h-5 fill-current text-stone-200  transition duration-300 ease-in-out hover:brightness-200 hover:drop-shadow-glow"
                                >
                                    <polygon
                                        className="st0"
                                        points="122.88,0 81.35,122.88 62.34,60.54 0,41.53 122.88,0"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
