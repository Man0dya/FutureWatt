import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Chatbot.css';
import { FaUser, FaRobot, FaTimes } from 'react-icons/fa';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [suggestedQuestions, setSuggestedQuestions] = useState([]);
    const [questionHistory, setQuestionHistory] = useState([]);
    const [showHelpMessage, setShowHelpMessage] = useState(true); // Initially show the help message
    const whatsappLink = 'https://wa.me/94706811309?text=Hello!%20I%20have%20a%20Question%20?';
    const messagesEndRef = useRef(null);

    const addBotMessage = useCallback((text, newQuestions = []) => {
        setTimeout(() => {
            setMessages((prev) => [...prev, { sender: 'bot', text }]);
            setSuggestedQuestions(newQuestions);
            setQuestionHistory((prevHistory) => [...prevHistory, newQuestions]);
        }, 500);
    }, []);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const initialQuestions = [
                'What solar packages do you have?',
                'What are the benefits of solar systems?',
                'I need help with an existing order.'
            ];
            const initialMessage = 'Welcome to FutureWatt! How can I assist you today?';
            setMessages([{ sender: 'bot', text: initialMessage }]);
            setSuggestedQuestions(initialQuestions);
            setQuestionHistory([initialQuestions]);
        } else if (!isOpen) {
            setSuggestedQuestions([]);
            setQuestionHistory([]);

        }
    }, [isOpen, messages.length]);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setShowHelpMessage(false);
        }
    };

    const handleSendMessage = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            const userMessage = e.target.value.trim();
            handleUserInput(userMessage);
            e.target.value = '';
        }
    };

    const handleButtonClick = (question) => {
        handleUserInput(question);
    };

    const handleGoBack = () => {
        if (questionHistory.length > 1) {
            const newHistory = [...questionHistory];
            newHistory.pop();
            setQuestionHistory(newHistory);
            setSuggestedQuestions(newHistory[newHistory.length - 1]);
            setMessages((prev) => prev.slice(0, prev.length - (prev[prev.length - 1]?.sender === 'bot' ? 2 : 1)));
        }
    };

    const handleUserInput = (message) => {
        setMessages((prev) => [...prev, { sender: 'user', text: message }]);
        setSuggestedQuestions([]);
        processUserMessage(message);
    };

    const processUserMessage = useCallback((message) => {
        const lowerMessage = message.toLowerCase();
        let response = `Sorry, I don’t understand. Please select an option or contact our WhatsApp support: <a href="${whatsappLink}" target="_blank" class="text-orange-600 underline">Chat on WhatsApp</a>`;
        let newQuestions = [];

        switch (lowerMessage) {
            case 'what solar packages do you have?':
                response = 'Great! We offer three main types of solar packages. Which one are you interested in?';
                newQuestions = ['On-Grid Solar System', 'Off-Grid Solar System', 'Solar Hot Water System'];
                break;
            case 'on-grid solar system':
                response = 'On-grid systems connect to the public electricity grid. They’re cost-effective and allow net metering. Would you like to:';
                newQuestions = ['See pricing options.', 'Check installation requirements.', 'Speak to an expert.'];
                break;
            case 'off-grid solar system':
                response = 'Off-grid systems operate independently with battery storage. Perfect for remote areas. Would you like to:';
                newQuestions = ['See packages', 'Get a cost estimate', 'Contact support'];
                break;
            case 'solar hot water system':
                response = 'Solar water heaters reduce energy bills by using sunlight. Would you like to:';
                newQuestions = ['Compare models', 'Check if your home is suitable', 'Contact support'];
                break;
            case 'see pricing options.':
            case 'check installation requirements.':
                response = `Let’s explore our on-grid solar packages! <Link to="/Packages/OnGrid" class="text-orange-600 underline">View On-Grid Packages</Link>`;
                newQuestions = ['Speak to an expert.', 'Compare with off-grid systems', 'Learn about financing'];
                break;
            case 'see packages':
            case 'get a cost estimate':
                response = `Check out our off-grid solar packages! <Link to="/Packages/OffGrid" class="text-orange-600 underline">View Off-Grid Packages</Link>`;
                newQuestions = ['Contact support', 'Compare with on-grid systems', 'Learn about installation'];
                break;
            case 'compare models':
            case 'check if your home is suitable':
                response = `Explore our solar hot water systems! <Link to="/Packages/HotWater" class="text-orange-600 underline">View Hot Water Systems</Link>`;
                newQuestions = ['Contact support', 'Learn about maintenance', 'Compare costs'];
                break;
            case 'speak to an expert.':
            case 'contact support':
                response = `Our team is ready to help! <a href="${whatsappLink}" target="_blank" class="text-orange-600 underline">Chat on WhatsApp</a>`;
                newQuestions = ['What solar packages do you have?', 'What are the benefits of solar systems?', 'I need help with an existing order.'];
                break;
            case 'what are the benefits of solar systems?':
                response = 'Solar systems offer many advantages! What would you like to know?';
                newQuestions = ['Cost savings & ROI', 'Environmental benefits'];
                break;
            case 'cost savings & roi':
                response = 'Solar can cut electricity bills by up to 80%. With net metering and incentives, ROI is typically 5-7 years. Would you like to:';
                newQuestions = ['Calculate your savings', 'See financing options', 'Contact support to compare packages'];
                break;
            case 'calculate your savings':
                response = `Savings depend on system size, energy usage, and location. A 5kW system can save $500-$1000 annually. Contact us for a personalized estimate: <a href="${whatsappLink}" target="_blank" class="text-orange-600 underline">Chat on WhatsApp</a>`;
                newQuestions = ['See financing options', 'Contact support to compare packages', 'What solar packages do you have?'];
                break;
            case 'see financing options':
                response = `We offer flexible financing, including 0% interest plans and leases. Contact us to explore options: <a href="${whatsappLink}" target="_blank" class="text-orange-600 underline">Chat on WhatsApp</a>`;
                newQuestions = ['Calculate your savings', 'Contact support to compare packages', 'What solar packages do you have?'];
                break;
            case 'contact support to compare packages':
                response = `Our team can help you compare packages! <a href="${whatsappLink}" target="_blank" class="text-orange-600 underline">Chat on WhatsApp</a>`;
                newQuestions = ['What solar packages do you have?', 'What are the benefits of solar systems?', 'I need help with an existing order.'];
                break;
            case 'environmental benefits':
                response = 'Solar reduces carbon footprint and fossil fuel dependence. Want to:';
                newQuestions = ['See CO2 reduction estimates', 'Learn about green incentives', 'Explore eco-friendly models'];
                break;
            case 'see co2 reduction estimates':
                response = `A 5kW solar system can reduce CO2 emissions by ~4 tons annually, equivalent to planting 100 trees. Contact us for details: <a href="${whatsappLink}" target="_blank" class="text-orange-600 underline">Chat on WhatsApp</a>`;
                newQuestions = ['Learn about green incentives', 'Explore eco-friendly models', 'What solar packages do you have?'];
                break;
            case 'learn about green incentives':
                response = `Many regions offer tax credits and rebates for solar. Contact us to check local incentives: <a href="${whatsappLink}" target="_blank" class="text-orange-600 underline">Chat on WhatsApp</a>`;
                newQuestions = ['See CO2 reduction estimates', 'Explore eco-friendly models', 'What solar packages do you have?'];
                break;
            case 'explore eco-friendly models':
                response = `Our systems use high-efficiency panels and recyclable materials. Contact us for model details: <a href="${whatsappLink}" target="_blank" class="text-orange-600 underline">Chat on WhatsApp</a>`;
                newQuestions = ['See CO2 reduction estimates', 'Learn about green incentives', 'What solar packages do you have?'];
                break;
            case 'i need help with an existing order.':
                response = 'I can assist with your order. What do you need?';
                newQuestions = ['Track my order status', 'Modify/cancel my order', 'Get technical support'];
                break;
            case 'track my order status':
            case 'modify/cancel my order':
                response = `Let’s help you with your order! <Link to="/ContactUs" class="text-orange-600 underline">Visit Contact Us</Link>`;
                newQuestions = ['Get technical support', 'What solar packages do you have?', 'What are the benefits of solar systems?'];
                break;
            case 'get technical support':
                response = `Our team can assist with technical issues. <a href="${whatsappLink}" target="_blank" class="text-orange-600 underline">Chat on WhatsApp</a>`;
                newQuestions = ['Track my order status', 'Modify/cancel my order', 'What solar packages do you have?'];
                break;
            default:
                if (lowerMessage.includes('on-grid')) {
                    response = 'On-grid systems connect to the public electricity grid. Would you like to:';
                    newQuestions = ['See pricing options.', 'Check installation requirements.', 'Speak to an expert.'];
                } else if (lowerMessage.includes('off-grid')) {
                    response = 'Off-grid systems operate independently with battery storage. Would you like to:';
                    newQuestions = ['See packages', 'Get a cost estimate', 'Contact support'];
                } else if (lowerMessage.includes('hot water') || lowerMessage.includes('water heater')) {
                    response = 'Solar water heaters reduce energy bills. Would you like to:';
                    newQuestions = ['Compare models', 'Check if your home is suitable', 'Contact support'];
                } else if (lowerMessage.includes('benefit') || lowerMessage.includes('advantage')) {
                    response = 'Solar systems offer many advantages! What would you like to know?';
                    newQuestions = ['Cost savings & ROI', 'Environmental benefits'];
                } else if (lowerMessage.includes('order')) {
                    response = 'I can assist with your order. What do you need?';
                    newQuestions = ['Track my order status', 'Modify/cancel my order', 'Get technical support'];
                } else if (lowerMessage.includes('package')) {
                    response = 'We offer various solar packages tailored to different needs. Which type are you most interested in?';
                    newQuestions = ['On-Grid Solar System', 'Off-Grid Solar System', 'Solar Hot Water System'];
                }
        }

        addBotMessage(response, newQuestions);
    }, [addBotMessage, whatsappLink]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleDismissHelp = () => {
        setShowHelpMessage(false);
    };

    return (
        <>
            <div className="chatbot-button-container">
                {showHelpMessage && (
                    <div className="help-message">
                        Do you need help?
                        <button className="dismiss-button" onClick={handleDismissHelp}>
                            <FaTimes />
                        </button>
                    </div>
                )}
                <div className="chatbot-button" onClick={toggleChatbot}>
                    💬
                </div>
            </div>
            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chatbot-message-container ${msg.sender === 'user' ? 'user-message-container' : 'bot-message-container'}`}
                            >
                                <div className="message-icon">
                                    {msg.sender === 'user' ? <FaUser /> : <FaRobot />}
                                </div>
                                <div
                                    className={`chatbot-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                                    dangerouslySetInnerHTML={{ __html: msg.text }}
                                />
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {suggestedQuestions.length > 0 && (
                        <div className="suggested-questions">
                            {suggestedQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    className="question-button"
                                    onClick={() => handleButtonClick(question)}
                                >
                                    {question}
                                </button>
                            ))}
                            {questionHistory.length > 1 && (
                                <button className="back-button" onClick={handleGoBack}>
                                    🔙 Go Back
                                </button>
                            )}
                        </div>
                    )}
                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Type your message or select an option..."
                            onKeyPress={handleSendMessage}
                            className="w-full p-2 border rounded text-black"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;