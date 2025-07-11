'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
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
      console.log('Connected to AI Assistant');
      toast({
        title: 'Connected',
        description: 'Voice assistant is ready',
      });
    },
    onDisconnect: () => {
      console.log('Disconnected from AI Assistant');
      toast({
        title: 'Disconnected',
        description: 'Call ended',
      });
    },
    onMessage: (message: any) => {
      console.log('Message received:', message);
    },
    onError: (error: any) => {
      console.error('AI Assistant error:', error);
      toast({
        title: 'Connection failed',
        description: 'Please try again',
        variant: 'destructive',
      });
    },
  });

  const startConversation = useCallback(async () => {
    if (!config?.elevenLabsAgentId) {
      toast({
        title: 'Configuration error',
        description: 'AI Assistant not configured',
        variant: 'destructive',
      });
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: config.elevenLabsAgentId,
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      if (!micErrorShown) {
        toast({
          title: 'Microphone access required',
          description: 'Please allow microphone access',
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

  useEffect(() => {
    if (isOpen && config && conversation.status !== 'connected') {
      startConversation();
    }
  }, [isOpen, config, conversation.status, startConversation]);

  if (loading || !config) {
    return null;
  }

  const isConnected = conversation.status === 'connected';
  const isConnecting = conversation.status === 'connecting';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-4 md:inset-8 lg:inset-16 bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                      isConnected ? 'bg-green-500' : isConnecting ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}
                  />
                  {isConnected && (
                    <div className="absolute inset-0 h-3 w-3 bg-green-500 rounded-full animate-ping opacity-75" />
                  )}
                </div>
                <div>
                  <h1 className="text-xl font-semibold">AchI: Voice Mode</h1>
                  <p className="text-sm text-muted-foreground">
                    {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md mx-auto">
                {/* Avatar/Status Circle */}
                <div className="relative mb-8">
                  <motion.div
                    animate={isConnected ? { scale: [1, 1.05, 1] } : {}}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                    className={`h-32 w-32 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ${
                      isConnected
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25'
                        : isConnecting
                          ? 'bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/25'
                          : 'bg-gradient-to-br from-gray-400 to-gray-600'
                    }`}
                  >
                    {isConnected ? (
                      <Mic className="h-12 w-12 text-white" />
                    ) : isConnecting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'linear',
                        }}
                      >
                        <Phone className="h-12 w-12 text-white" />
                      </motion.div>
                    ) : (
                      <MicOff className="h-12 w-12 text-white" />
                    )}
                  </motion.div>

                  {/* Speaking indicator */}
                  {conversation.isSpeaking && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        Speaking...
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Status Text */}
                <div className="space-y-2 mb-8">
                  <h2 className="text-2xl font-bold">
                    {isConnected
                      ? 'Ready to chat'
                      : isConnecting
                        ? 'Connecting...'
                        : 'Connection failed'}
                  </h2>
                  <p className="text-muted-foreground">
                    {isConnected
                      ? "Speak naturally and I'll respond with voice"
                      : isConnecting
                        ? 'Establishing secure connection'
                        : 'Please try again or check your microphone'}
                  </p>
                </div>

                {/* Action Button */}
                {!isConnected && !isConnecting && (
                  <Button onClick={startConversation} size="lg" className="rounded-full px-8">
                    <Phone className="h-4 w-4 mr-2" />
                    Reconnect
                  </Button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/50 bg-muted/30">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <div
                      className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}
                    />
                    {isConnected ? 'Live call' : 'Not connected'}
                  </span>
                  {conversation.isSpeaking && (
                    <span className="flex items-center gap-2 text-blue-600 font-medium">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        className="h-2 w-2 bg-blue-500 rounded-full"
                      />
                      AI responding
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <PhoneOff className="h-4 w-4 mr-2" />
                  End call
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
