import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import LoadingSpinner from '../LoadingSpinner';

const genAI = new GoogleGenerativeAI('AIzaSyBI5ww5nTJFPl9NlqVpeZlZCNxAmgkhtk4'); // Use provided API key directly

const GeminiPage = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState('');

  const bottomRef = useRef(null);

  const suggestions = [
    'Explain quantum computing in simple terms',
    'How to create a React app?',
    'Best travel spots in 2025',
    'Write a poem about space'
  ];

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setLoading(true);
    setStreamedResponse('');

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContentStream([query]);

      let fullResponse = '';
      for await (const chunk of result.stream) {
        const part = chunk.text();
        if (part) {
          fullResponse += part;
          setStreamedResponse((prev) => prev + part);
        }
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: fullResponse }]);
      setStreamedResponse('');
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);

      let errorMessage = 'Error retrieving response.';

      if (error.message && (error.message.includes('429') || error.message.includes('RATE_LIMIT_EXCEEDED'))) {
        errorMessage = 'There are some internal errors. Please try again after some time.';
      } else if (error.message && error.message.includes('API_KEY_INVALID')) {
        errorMessage = 'There are some internal errors. Please try again after some time.';
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: errorMessage }]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, streamedResponse]);



  return (
    <div className="gemini-wrapper">
      <aside className="sidebar">
        <header className="gemini-header">
          <h1>Mint AI ✨</h1>
        </header>
        <h2>Suggestions</h2>
        <ul>
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => setQuery(s)}>{s}</li>
          ))}
        </ul>
      </aside>

      <div className="gemini-page">
        <main className="gemini-chat">
          <div className="chat-box">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="bubble">
                  <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    remarkPlugins={[remarkGfm]}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {streamedResponse && (
              <div className="message assistant">
                <div className="bubble">
                  <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    remarkPlugins={[remarkGfm]}
                  >
                    {streamedResponse}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {loading && !streamedResponse && (
              <div className="message assistant">
                <div className="bubble loading">
                  Typing<span className="dots">...</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="input-bar">
            <input
              type="text"
              value={query}
              placeholder="Ask something..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={!query.trim() || loading}>
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GeminiPage;
