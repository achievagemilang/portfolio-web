'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, Send, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const CALENDLY_LINK = 'https://calendar.app.google/cEJRExr9jLsgHj469';

interface ChatInterfaceProps {
  onClose?: () => void;
  onSwitchToVoice?: () => void;
  isFloating?: boolean;
}

export function ChatInterface({ onClose, onSwitchToVoice, isFloating }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hi! I'm AchI, Cip's experimental AI assistant. I'm still learning, but feel free to ask me anything about Cip! 😊",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [messages, hasInteracted]);

  const handleSendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setHasInteracted(true);
    setLoading(true);

    fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed }),
    })
      .then((res) =>
        res.json().then((data) => {
          if (res.ok) {
            setMessages((prev) => [
              ...prev,
              {
                sender: 'ai',
                text: data.message || "Sorry, I couldn't generate a response right now.",
              },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                sender: 'ai',
                text:
                  data.message ||
                  "I'm having trouble connecting to the AI service right now. Please try again later.",
              },
            ]);
          }
        })
      )
      .catch(() => {
        setMessages((prev) => [...prev, { sender: 'ai', text: 'Sorry, connection error.' }]);
      })
      .finally(() => {
        setInput('');
        setLoading(false);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div
      className={`flex flex-col h-full ${isFloating ? 'bg-background' : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg'}`}
    >
      {/* Header for Floating Mode */}
      {isFloating && (
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-semibold text-sm">AchI Assistant</span>
            <Badge
              variant="outline"
              className="text-[10px] px-1 py-0 h-5 border-red-200 text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800"
            >
              Beta
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            {onSwitchToVoice && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={onSwitchToVoice}
                title="Switch to Voice Mode"
              >
                <Phone className="h-4 w-4" />
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarGutter: 'stable' }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            ref={idx === messages.length - 1 ? chatEndRef : undefined}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm whitespace-pre-wrap break-words
                ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-muted text-foreground rounded-bl-sm border border-border'
                }
            `}
            >
              <ReactMarkdown
                components={{
                  a: (props) => (
                    <a
                      {...props}
                      className="underline font-medium hover:text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                  strong: (props) => <strong className="font-bold">{props.children}</strong>,
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-muted border border-border rounded-bl-sm">
              <div className="flex space-x-1">
                <div
                  className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: '0s' }}
                />
                <div
                  className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar mask-grad-right">
        {['Services', 'Schedule'].map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 whitespace-nowrap text-xs py-1"
            onClick={() => {
              if (tag === 'Schedule') handleSendMessage("I'd like to schedule a meeting");
              else handleSendMessage(`What is your ${tag.toLowerCase()}?`);
            }}
          >
            {tag === 'Schedule' && <Calendar className="h-3 w-3 mr-1 inline" />}
            {tag}
          </Badge>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-border flex gap-2">
        {/* If not floating (embedded in page), show voice button here if switching is needed, 
             but typically embedded version might process voice differently. 
             For simplicity, we leave voice switch in header for floating, 
             and maybe add a small button here if needed for embedded. 
             Actually, strict request was for floating widget behavior. 
         */}
        {!isFloating && onSwitchToVoice && (
          <Button variant="outline" size="icon" onClick={onSwitchToVoice} className="shrink-0">
            <Phone className="h-4 w-4" />
          </Button>
        )}

        <input
          className="flex-1 bg-muted/50 border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <Button
          size="icon"
          onClick={() => handleSendMessage(input)}
          disabled={!input.trim() || loading}
          className="rounded-full shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
