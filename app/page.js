'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I\'m your friendly chatbot. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const responses = [
    "That's an interesting question! Let me think about that...",
    "I see what you mean. Here's my perspective on that.",
    "Great question! From what I understand...",
    "Thanks for sharing that with me!",
    "I appreciate you asking. Let me help you with that.",
    "That's a good point. Have you considered...",
    "Interesting! Tell me more about that.",
    "I'm here to help! What else would you like to know?",
    "That makes sense. Let me explain...",
    "I understand. Here's what I think..."
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const botMessage = { role: 'bot', content: randomResponse };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>
          <div style={styles.headerIcon}>💬</div>
          <h1 style={styles.title}>ChatBot</h1>
        </div>

        <div style={styles.messagesContainer}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                ...styles.message,
                ...(msg.role === 'user' ? styles.userMessage : styles.botMessage)
              }}
            >
              <div style={styles.avatar}>
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div style={styles.messageContent}>
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ ...styles.message, ...styles.botMessage }}>
              <div style={styles.avatar}>🤖</div>
              <div style={styles.messageContent}>
                <div style={styles.typingIndicator}>
                  <span style={styles.dot}></span>
                  <span style={styles.dot}></span>
                  <span style={styles.dot}></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            style={styles.input}
          />
          <button onClick={handleSend} style={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  chatBox: {
    width: '100%',
    maxWidth: '800px',
    height: '600px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerIcon: {
    fontSize: '28px',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
  message: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    alignItems: 'flex-start',
  },
  userMessage: {
    flexDirection: 'row-reverse',
  },
  botMessage: {
    flexDirection: 'row',
  },
  avatar: {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '50%',
    flexShrink: 0,
  },
  messageContent: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '18px',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontSize: '15px',
    lineHeight: '1.5',
  },
  inputContainer: {
    display: 'flex',
    gap: '12px',
    padding: '20px',
    backgroundColor: 'white',
    borderTop: '1px solid #e0e0e0',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  sendButton: {
    padding: '12px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '4px 0',
  },
  dot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#999',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'typing 1.4s infinite',
  },
};
