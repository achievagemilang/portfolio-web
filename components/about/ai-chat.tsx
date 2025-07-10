'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { FullscreenConversation } from '@/components/voice-ai-widget/fullscreen-conversation';
import ReactMarkdown from 'react-markdown';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const CALENDLY_LINK = 'https://calendar.app.google/cEJRExr9jLsgHj469';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hi! I'm AchI, Cip's AI assistant. Ask me anything about Cip to get to know him better. 😊",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  useEffect(() => {
    if (hasInteracted) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [messages, hasInteracted]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setInput('');
    setHasInteracted(true);
    setLoading(true);
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: data.message || "Sorry, I couldn't generate a response right now.",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, there was an error. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    const trimmed = !text.trim() ? input.trim() : text.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setInput('');
    setHasInteracted(true);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: data.message || "Sorry, I couldn't generate a response right now.",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, there was an error. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleOnCall = () => {
    setIsFullscreenOpen(true);
    toast({
      title: 'Starting Voice Call',
      description: 'Opening fullscreen conversation with AI Assistant...',
    });
  };

  return (
    <>
      <FullscreenConversation
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
      />
      <div className="w-full max-w-xl mx-auto mt-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col h-[480px]">
          <div className="flex-1 overflow-y-auto pr-2 mb-2" style={{ scrollbarGutter: 'stable' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                ref={idx === messages.length - 1 ? chatEndRef : undefined}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-line text-sm
                  ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm shadow-md'
                      : 'bg-muted text-muted-foreground dark:bg-zinc-800 dark:text-zinc-100 rounded-bl-sm border border-zinc-200 dark:border-zinc-700'
                  }
                `}
                >
                  {/* If this is the Calendly message, render a button */}
                  {msg.text.includes('Google Calendar') ? (
                    <span>
                      To book a meeting, please use my Google Calendar Appointment:{' '}
                      <a
                        href={CALENDLY_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-600 dark:text-blue-400 font-medium"
                      >
                        Book Now
                      </a>
                    </span>
                  ) : (
                    <ReactMarkdown
                      components={{
                        a: (props) => (
                          <a
                            {...props}
                            className="underline text-blue-600 dark:text-blue-400 font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                        strong: (props) => <strong className="font-bold">{props.children}</strong>,
                        em: (props) => <em className="italic">{props.children}</em>,
                        li: (props) => <li className="ml-4 list-disc">{props.children}</li>,
                        // Add more custom renderers as needed
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-3 flex justify-start">
                <div className="px-4 py-2 rounded-2xl max-w-[80%] text-sm bg-muted text-muted-foreground dark:bg-zinc-800 dark:text-zinc-100 rounded-bl-sm border border-zinc-200 dark:border-zinc-700 animate-pulse">
                  <div className="flex space-x-1 py-1">
                    <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
                    <div
                      className="w-1 h-1 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className="w-1 h-1 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 my-3">
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => handleSendMessage('What services do you offer?')}
            >
              Services
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => handleSendMessage('What is your pricing?')}
            >
              Pricing
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => handleSendMessage("I'd like to schedule a meeting")}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Schedule
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <input
              type="text"
              className="flex-1 min-w-0 rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              aria-label="Ask the AI about Achieva Futura Gemilang"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={toggleOnCall}
              className="h-9 w-9 p-0 hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-950"
              title="Start voice conversation"
            >
              <Phone className="h-4 w-4 text-primary" />
            </Button>
            <Button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="flex-shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm"
              aria-label="Send message"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                'Send'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChat;
