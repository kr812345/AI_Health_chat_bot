'use client';

import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';
import TypeWriter from './components/TypeWriter';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setError(null);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to get response');
      }

      if (!data.text) {
        throw new Error('Received empty response from API');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setError(error.message);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message}. Please try again.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg min-h-[600px] flex flex-col">
        <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center gap-2">
          <FaHeartbeat size={24} />
          <h1 className="text-xl font-semibold">AI Health Coach</h1>
        </div>
        
        {!messages.length && (
          <div className="p-6 text-center text-gray-600">
            <FaHeartbeat size={48} className="mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-semibold mb-2">Welcome to your AI Health Coach! 👋</h2>
            <p className="mb-4">I'm here to help you with questions about:</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left">
              <ul className="space-y-2">
                <li>🥗 Nutrition & Diet</li>
                <li>💪 Fitness & Exercise</li>
                <li>🧘‍♂️ Mental Wellness</li>
              </ul>
              <ul className="space-y-2">
                <li>❤️ General Health</li>
                <li>😴 Sleep & Recovery</li>
                <li>✨ Healthy Habits</li>
              </ul>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              ⚕️ Note: I provide general health information only. Always consult healthcare professionals for medical advice.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              🤖 Remember: My responses are AI-generated and may not always be accurate. Please verify important information from reliable sources.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-lg p-4 ${
                  message.role === 'user' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                {message.role === 'assistant' ? (
                  <TypeWriter content={message.content} typingSpeed={20} />
                ) : (
                  <div>{message.content}</div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-lg p-4 border border-gray-200 flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                <span>Analyzing your health question...</span>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about health, nutrition, fitness, or wellness..."
              className="flex-1 p-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:border-green-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FiSend size={20} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
