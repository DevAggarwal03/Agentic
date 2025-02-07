import { useState, useRef, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Navbar from '../Components/Navbar';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isConnected } = useAccount();

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Connect to WebSocket
  useEffect(() => {
    const connectWebSocket = () => {
      setIsConnecting(true);
      const ws = new WebSocket('ws://localhost:8000/chat');

      ws.onopen = () => {
        console.log('Connected to chat server');
        setIsConnecting(false);
        setSocket(ws);
      };

      ws.onmessage = (event) => {
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.role === 'bot') {
            // Update last bot message
            return [...prev.slice(0, -1), { role: 'bot', content: event.data }];
          }
          // Add new bot message
          return [...prev, { role: 'bot', content: event.data }];
        });
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnecting(false);
      };

      ws.onclose = () => {
        console.log('Disconnected from chat server');
        setSocket(null);
        setIsConnecting(false);
      };

      return ws;
    };

    if (!socket) {
      const ws = connectWebSocket();
      return () => ws.close();
    }
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    // Send message to server
    socket.send(input);
    
    // Clear input
    setInput('');
  };

  return (
    <div className='flex flex-col h-screen bg-gray-900'>
    <Navbar />
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-white'
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">
                {message.content}
              </pre>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form 
        onSubmit={sendMessage}
        className="border-t border-gray-700 p-4 bg-gray-800"
      >
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!socket || isConnecting}
          />
          <button
            type="submit"
            disabled={!socket || isConnecting || !input.trim()}
            className={`px-6 py-2 rounded-lg font-semibold ${
              socket && !isConnecting && input.trim()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isConnecting ? 'Connecting...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ChatPage; 