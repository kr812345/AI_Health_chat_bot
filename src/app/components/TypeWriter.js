'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function TypeWriter({ content, typingSpeed = 20 }) {
    const [displayedContent, setDisplayedContent] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setIsTyping(true);
        setDisplayedContent('');
        
        let currentIndex = 0;
        const contentLength = content.length;
        
        const typingInterval = setInterval(() => {
            if (currentIndex < contentLength) {
                setDisplayedContent(prev => prev + content[currentIndex]);
                currentIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
    }, [content, typingSpeed]);

    return (
        <div className={`prose prose-sm max-w-none ${isTyping ? 'typing' : ''}`}>
            <ReactMarkdown>
                {displayedContent}
            </ReactMarkdown>
            {isTyping && (
                <span className="inline-block w-1 h-4 ml-1 bg-green-500 animate-pulse" />
            )}
        </div>
    );
}