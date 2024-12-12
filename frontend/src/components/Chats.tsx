import React from "react";

interface ChatsProps {
    messages: { user: string; bot: string }[];
}

const Chats: React.FC<ChatsProps> = ({ messages }) => {
    return (
        <div className="flex-grow overflow-y-auto mb-4">
            {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-stone-600 to-[#bd976d] font-bold text-center">
                        Hello, Upload your PDF to chat
                    </p>
                </div>
            ) : (
                messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.user ? "justify-end" : "justify-start"
                        } mb-2`}
                    >
                        <div
                            className={`${
                                message.user
                                    ? "bg-gradient-to-r from-[#a87f58] to-[#292524]"
                                    : "bg-stone-700"
                            } text-stone-50 rounded-xl p-3 max-w-xs`}
                        >
                            {message.user || message.bot}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Chats;
