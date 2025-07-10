'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConversation } from '@elevenlabs/react';
import { useToast } from '@/hooks/use-toast';

interface Config {
  elevenLabsAgentId: string;
  elevenLabsApiKey: string;
  geminiApiKey: string;
  googleCalendarApiKey: string;
}

interface FullscreenConversationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullscreenConversation({ isOpen, onClose }: FullscreenConversationProps) {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [micErrorShown, setMicErrorShown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMicErrorShown(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Failed to fetch config:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs');
      toast({
        title: 'Connected!',
        description: 'You can now speak naturally with the AI Assistant.',
      });
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs');
      toast({
        title: 'Disconnected',
        description: 'Voice conversation has ended.',
      });
    },
    onMessage: (message: any) => {
      console.log('Message received:', message);
    },
    onError: (error: any) => {
      console.error('ElevenLabs error:', error);
      toast({
        title: 'Connection Error',
        description: 'Failed to connect to AI Assistant. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const startConversation = useCallback(async () => {
    if (!config?.elevenLabsAgentId) {
      toast({
        title: 'Configuration Error',
        description: 'AI Assistant not properly configured.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: config.elevenLabsAgentId,
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      if (!micErrorShown) {
        toast({
          title: 'Microphone Error',
          description: 'Please allow microphone access to use voice features.',
          variant: 'destructive',
        });
        setMicErrorShown(true);
      }
    }
  }, [conversation, config?.elevenLabsAgentId, toast, micErrorShown]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  }, [conversation]);

  const handleClose = () => {
    if (conversation.status === 'connected') {
      stopConversation();
    }
    onClose();
  };

  // Auto-start conversation when modal opens
  useEffect(() => {
    if (isOpen && config && conversation.status !== 'connected') {
      startConversation();
    }
  }, [isOpen, config, conversation.status, startConversation]);

  if (loading) {
    return null;
  }

  if (!config) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-4 bg-background rounded-lg shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 h-4 w-4 bg-green-500 rounded-full animate-ping" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">AchI: Voice Assistant</h2>
                  <p className="text-sm text-muted-foreground">
                    {conversation.status === 'connected'
                      ? 'Connected • Ready to chat'
                      : 'Connecting...'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleClose} className="h-10 w-10 p-0">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* ElevenLabs Widget Container */}
            <div className="flex-1 p-6">
              <div className="h-full w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="h-24 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
                        <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {conversation.status === 'connected'
                        ? 'Connected to AchI'
                        : 'Connecting to AchI...'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {conversation.status === 'connected'
                        ? 'Speak naturally and the AI will respond with voice'
                        : 'Please wait while we establish the connection'}
                    </p>
                  </div>

                  {/* Connection Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${conversation.status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'}`}
                      />
                      <span className="text-sm font-medium">
                        {conversation.status === 'connected' ? 'Connected' : 'Connecting...'}
                      </span>
                    </div>

                    {conversation.isSpeaking && (
                      <div className="flex items-center justify-center gap-2 text-blue-600">
                        <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">AI Speaking</span>
                      </div>
                    )}
                  </div>

                  {/* Instructions */}
                  <div className="mt-8 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                    <h4 className="font-medium mb-2">How to use:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Speak naturally when you're connected</li>
                      <li>• Wait for AchI to respond with voice</li>
                      {/* <li>• Ask about services, pricing, or schedule a meeting</li> */}
                      <li>• Click outside or the X button to end the call</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t bg-muted/50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${conversation.status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'}`}
                    />
                    {conversation.status === 'connected'
                      ? 'Voice Call Active'
                      : 'Establishing Connection...'}
                  </span>
                  {conversation.isSpeaking && (
                    <span className="flex items-center gap-2 text-blue-600">
                      <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                      AI Speaking
                    </span>
                  )}
                </div>
                <div className="text-muted-foreground">Click outside to end call</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
