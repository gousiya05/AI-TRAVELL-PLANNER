
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, Destination } from '../types';
import { getPhraseTranslation } from '../services/chatService';
import { INDIA_DESTINATIONS } from '../constants';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const phraseDestinations = INDIA_DESTINATIONS.filter(d => 
    ['Ladakh', 'Jaipur', 'Udaipur', 'Chennai'].includes(d.name)
);

const DestinationSelectionScreen: React.FC<{ onSelect: (dest: Destination) => void; }> = ({ onSelect }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-on-scroll is-visible">
        <ChatIcon />
        <h3 className="text-xl font-bold text-gray-800 mt-4">Travel Phrase Assistant</h3>
        <p className="text-gray-600 mb-6">Select your destination to start translating useful travel phrases.</p>
        <div className="grid grid-cols-2 gap-3 w-full max-h-56 overflow-y-auto">
            {phraseDestinations.map(dest => (
                <button
                    key={dest.name}
                    onClick={() => onSelect(dest)}
                    className="p-3 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold rounded-lg transition-colors text-sm"
                >
                    {dest.name}
                </button>
            ))}
        </div>
    </div>
);

const Chatbox: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);
    
    useEffect(() => {
        if (!isOpen) {
            setSelectedDestination(null);
            setMessages([]);
        }
    }, [isOpen]);

    const handleDestinationSelect = (destination: Destination) => {
        setSelectedDestination(destination);
        setMessages([
            {
                id: Date.now(),
                text: `Selected destination: <strong>${destination.name}</strong>.<br/>Enter a phrase in your native language to translate for your trip.`,
                sender: 'bot'
            }
        ]);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '' || isLoading || !selectedDestination) return;

        const userMessage: ChatMessage = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue;
        setInputValue('');
        setIsLoading(true);

        try {
            const { english, local, transliteration } = await getPhraseTranslation(currentInput, selectedDestination.name);
            
            const botResponseText = `<strong>English:</strong> ${english}<br/><strong>Local language:</strong> ${local} (${transliteration})`;
            
            const botMessage: ChatMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage: ChatMessage = { id: Date.now() + 1, text: "I'm sorry, I couldn't translate that. Please try another phrase.", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const toggleChatbox = () => setIsOpen(!isOpen);

    const changeDestination = () => {
        setSelectedDestination(null);
        setMessages([]);
    }

    return (
        <>
            <button
                onClick={toggleChatbox}
                className={`fixed bottom-8 right-8 z-[101] w-16 h-16 bg-teal-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-400 ${isOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
                aria-label="Open chat"
            >
                <ChatIcon />
            </button>

            <div
                className={`fixed bottom-8 right-8 z-[101] w-[calc(100vw-4rem)] max-w-sm h-[70vh] max-h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-500 ease-in-out origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <header className="bg-teal-600 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
                     <div>
                        <h3 className="font-bold text-lg">Travel Phrasebook</h3>
                        {selectedDestination && (
                            <button onClick={changeDestination} className="text-sm opacity-90 flex items-center gap-1 hover:opacity-100 transition">
                                {selectedDestination.name} (Change)
                            </button>
                        )}
                    </div>
                    <button onClick={toggleChatbox} className="p-2 hover:bg-white/20 rounded-full transition-colors" aria-label="Close chat">
                        <CloseIcon />
                    </button>
                </header>

                <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                    {!selectedDestination ? (
                        <DestinationSelectionScreen onSelect={handleDestinationSelect} />
                    ) : (
                        <div className="space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.sender === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center flex-shrink-0 text-lg font-bold">T</div>
                                    )}
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-teal-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                        <div className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                 <div className="flex items-end gap-2 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center flex-shrink-0 text-lg font-bold">T</div>
                                    <div className="max-w-[80%] p-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                                        <div className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t rounded-b-2xl">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={selectedDestination ? "Enter phrase to translate..." : "Please select a destination"}
                            className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-200"
                            disabled={!selectedDestination || isLoading}
                            aria-label="Message input"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!selectedDestination || isLoading}
                            className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-500 transition-colors disabled:bg-gray-400"
                            aria-label="Send message"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbox;
