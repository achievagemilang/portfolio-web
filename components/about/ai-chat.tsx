'use client';
import { ChatInterface } from '@/components/chat/chat-interface';
import { useAIChat } from '@/context/ai-chat-context';
import React from 'react';

const AIChat: React.FC = () => {
  const { openVoice } = useAIChat();

  return (
    <div className="w-full max-w-xl mx-auto mt-6 mb-8 h-[480px]">
      <ChatInterface onSwitchToVoice={openVoice} isFloating={false} />
    </div>
  );
};

export default AIChat;
