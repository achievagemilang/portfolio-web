'use client';

import { ChatInterface } from '@/components/chat/chat-interface';
import { FullscreenConversation } from '@/components/voice-ai-widget/fullscreen-conversation';
import { useAIChat } from '@/context/ai-chat-context';
import { AnimatePresence, motion } from 'framer-motion';
import { BotMessageSquareIcon } from 'lucide-react';

export default function GlobalAIChat() {
  const { viewState, openChat, openVoice, close } = useAIChat();

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {viewState === 'closed' && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/30 transition-shadow hover:shadow-red-500/50"
            aria-label="Open AI Assistant"
          >
            <BotMessageSquareIcon className="h-6 w-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Interface */}
      <AnimatePresence>
        {viewState === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[9999] w-[90vw] max-w-[400px] h-[500px] rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5"
          >
            <ChatInterface isFloating={true} onClose={close} onSwitchToVoice={openVoice} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Voice Interface */}
      <FullscreenConversation isOpen={viewState === 'voice'} onClose={close} />
    </>
  );
}
