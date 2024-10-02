"use client";
import React, { useState, useEffect, useRef } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useChat } from "ai/react";
import ChatBubble from "./ChatBubble";
import { IoMdChatbubbles, IoMdClose, IoMdMic, IoMdMicOff } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { Message } from "../../types/message";

const initialPredefinedQuestions = [
  "How do I create an account on SmartGrader?",
  "Can you explain how the AI feedback feature works?",
  "What are the subscription plans available for educational institutions?",
  "How do I track my progress on the SmartGrader platform?",
];

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [history, setHistory] = useState<Message[]>([
    { role: "SmartGrader", content: "Hello! How can I help you?" },
  ]);
  const [predefinedQuestions, setPredefinedQuestions] = useState(initialPredefinedQuestions);
  const { messages, input, setInput, handleInputChange, handleSubmit } = useChat({
    api: "../api/chat",
  });
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [speech, setSpeech] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Function to toggle chat visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, history]);

  // Handle clicking on predefined questions
  const handlePredefinedQuestionClick = async (question: string) => {
    setInput(question);
    setPredefinedQuestions([]); // Remove predefined questions after selection
    setIsInputDisabled(false); // Enable input after question is clicked
    await new Promise((resolve) => setTimeout(resolve, 0));
    formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  // Handle speech recognition start
  const handleSpeechToText = () => {
    startSpeechToText();
    setIsInputDisabled(true);
    setSpeech(false);
  };

  // Handle stop listening
  const handleStopListening = () => {
    stopSpeechToText();
    setIsInputDisabled(false);
    setSpeech(true);
     // Clear the previous results after stopping the recording
    // This will clear the results array for the next recording
    setResults([]); 
  };

  // Update input based on speech recognition results
  useEffect(() => {
    if (results.length > 0) {
      // Ensure results are of type `ResultType` before accessing the `transcript`
      const latestResult = results[results.length - 1];
      if (typeof latestResult === "object" && "transcript" in latestResult) {
        setInput(latestResult.transcript);
      }
    }
  }, [results, setInput]);

  // Hide predefined questions when typing or using speech recognition
  useEffect(() => {
    if (input || interimResult) {
      setPredefinedQuestions([]);
    }
  }, [input, interimResult]);

  return (
    <div>
      {/* Toggle Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6  right-8 bg-sky-500 text-white p-4 z-50 rounded-full  transition-transform duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label={isChatOpen ? "Close chat" : "Open chat"}
      >
        {isChatOpen ? <IoMdClose size={30}  /> : <IoMdChatbubbles size={30} />}
      </button>

      {/* Chat window */}
      {isChatOpen && (
        <div className="fixed bottom-[90px] sm:bottom-[10px] lg:bottom-[90px] z-50 max-sm:right-4 sm:right-28 lg:right-12  max-w-96 sm:w-96 max-h-96 max-sm:max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-60px)]  lg:max-h-[calc(100vh-120px)] h-96 border   rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="p-3 bg-blue-500 text-white">
            <h6>Welcome,</h6>
            <h4 className="text-lg font-bold">Hi, I'm Your Smart AI Assistant</h4>
          </div>

          {/* Chat message area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4 bg-white">
            {[...history, ...messages].map((m, index) => (
              <ChatBubble
                key={`message-${index}`}
                role={m.role === "user" ? "User" : "SmartGrader"}
                content={m.content}
              />
            ))}
            {/* Predefined questions */}
            {history.length === 1 && predefinedQuestions.length > 0 && (
              <div className="space-y-2">
                {predefinedQuestions.map((question, index) => (
                  <button
                    key={`question-${index}`}
                    onClick={() => handlePredefinedQuestionClick(question)}
                    className="block w-full text-left text-lg text-gray-500 font-medium bg-red-100 hover:bg-red-200 p-2 rounded-lg"
                    style={{ fontSize: "12px" }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat input area */}
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
    
            }}
            className="p-2 flex items-center bg-white"
          >
            <div className="flex w-full shadow-sm">
              {/* <h1>Recording: {isRecording.toString()}</h1> */}
              <button onClick={isRecording ? handleStopListening : handleSpeechToText} className="px-2">
                {isRecording ?<IoMdMicOff size={30} color="red"/> : <IoMdMic size={30} className="text-sky-500"/>} 
              </button>
            
              {/* Text input field */}
              {isRecording ? (
        <>
        <div className="bg-gray-300 flex w-full rounded-lg p-4">
          <ul className="w-full">
            {results.length > 0 ? (
              results.map((result: any) => (
                <li key={result.timestamp} className="text-gray-700">{result.transcript}</li>
              ))
            ) : (
              <>
                {interimResult ? (
                  <li className="text-gray-700">{interimResult}</li>
                ) : (
                  <li><span className="text-gray-400">Speak Something</span></li>
                )}
              </>
            )}
          </ul>
        </div>
      </>
      
             
              ) : (
                <input
                  className={`flex-1 p-2 border-none rounded-lg w-full text-gray-700 bg-gray-300 focus:outline-none`}
                  value={input}
                  placeholder="Say something or type..."
                  onChange={handleInputChange}
                  disabled={isInputDisabled}
                  aria-label="Chat input"
                />
              )}

              {/* Send button */}
              {!isRecording ?
                  <>
                  <button
                type="submit"
                className={`p-2 flex items-center justify-center ${
                  input  ? "text-blue-500" : "text-gray-500 hover:text-gray-600 cursor-pointer"
                }`}
                disabled={isInputDisabled}
                aria-label="Send message"
              >
               
                <IoSendSharp size={30} />
              </button>
                  </>:""

                
              }
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
