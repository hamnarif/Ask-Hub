import React from "react";

interface ChatsProps {
    messages: { user?: string; bot?: string; file?: string }[];
}

const Chats: React.FC<ChatsProps> = ({ messages }) => {
    return (
        <div className="flex-grow overflow-y-auto mb-4 px-4 md:px-8">
            {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-stone-600 to-[#bd976d] font-bold text-center">
                        Hello, Upload your PDF to chat
                    </p>
                </div>
            ) : (
                messages.map((message, index) => (
                    <div key={index}>
                        {/* User Input */}
                        {(message.user || message.file) && (
                            <div className="flex justify-end mb-2">
                                <div className="max-w-xs text-right bg-stone-900 text-white rounded-xl p-4 space-y-2">
                                    {/* PDF File (if present) */}
                                    {message.file && (
                                        <div className="bg-red-700 text-white rounded-full px-3 py-1 w-fit flex items-center mx-auto">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-2 fill-current"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 3h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
                                            </svg>
                                            <span>{message.file}</span>
                                        </div>
                                    )}
                                    {/* User Text */}
                                    {message.user && (
                                        <div className="whitespace-pre-wrap">{message.user}</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Bot Response */}
                        {message.bot && (
                            <div className="flex justify-start mt-2">
                                <div className="max-w-xs text-left text-stone-100 rounded-xl p-4">
                                    <div className="whitespace-pre-wrap">{message.bot}</div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Chats;
