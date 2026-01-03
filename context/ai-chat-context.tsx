'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type ViewState = 'closed' | 'chat' | 'voice';

interface AIChatContextType {
  viewState: ViewState;
  openChat: () => void;
  openVoice: () => void;
  close: () => void;
  toggleChat: () => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export function AIChatProvider({ children }: { children: ReactNode }) {
  const [viewState, setViewState] = useState<ViewState>('closed');

  const openChat = () => setViewState('chat');
  const openVoice = () => setViewState('voice');
  const close = () => setViewState('closed');

  const toggleChat = () => {
    setViewState((prev) => (prev === 'closed' ? 'chat' : 'closed'));
  };

  return (
    <AIChatContext.Provider value={{ viewState, openChat, openVoice, close, toggleChat }}>
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChat() {
  const context = useContext(AIChatContext);
  if (context === undefined) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }
  return context;
}
