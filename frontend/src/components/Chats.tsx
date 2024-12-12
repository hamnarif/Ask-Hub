import React, { useEffect, useRef } from "react";

interface ChatsProps {
    messages: { user?: string; bot?: string; file?: string }[];
}

const Chats: React.FC<ChatsProps> = ({ messages }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="h-full overflow-y-auto pr-2 sm:pr-4 space-y-3 sm:space-y-4 scrollbar-custom">
            {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-stone-600 to-[#bd976d] font-bold text-center px-4">
                        Hello, Upload your PDF to chat
                    </p>
                </div>
            ) : (
                <>
                    {messages.map((message, index) => (
                        <div key={index} className="space-y-3 sm:space-y-4">
                            {/* User Input */}
                            {(message.user || message.file) && (
                                <div className="flex justify-end">
                                    <div className="max-w-[85%] sm:max-w-[80%] text-right bg-stone-900 text-white rounded-xl p-3 sm:p-4 space-y-2">
                                        {/* PDF File (if present) */}
                                        {message.file && (
                                            <div className="bg-red-700 text-white rounded-full px-2 sm:px-3 py-1 w-fit flex items-center mx-auto">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 fill-current"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 3h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
                                                </svg>
                                                <span className="break-all text-xs sm:text-sm">{message.file}</span>
                                            </div>
                                        )}
                                        {/* User Text */}
                                        {message.user && (
                                            <div className="whitespace-pre-wrap break-words text-sm sm:text-base">
                                                {message.user}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Bot Response */}
                            {message.bot && (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] sm:max-w-[80%] text-left text-stone-100 rounded-xl p-3 sm:p-4">
                                        <div className="whitespace-pre-wrap break-words text-sm sm:text-base">
                                            {message.bot}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </>
            )}
        </div>
    );
};

export default Chats;
