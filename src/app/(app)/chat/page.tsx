'use client';

import React, { useState } from 'react';
import ChatInterface, { type Recipient, type Message } from '@/components/chat/ChatInterface';
import ChatList from '@/components/chat/ChatList';
import { aiChatAssistant } from '@/ai/flows/ai-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { translateText } from '@/ai/flows/translate-text-flow';
import { languages } from '@/lib/languages';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const aiRecipient: Recipient = {
  id: 'ai-assistant',
  name: 'Gotcha Assistant',
  avatarUrl: '/logo.svg',
  avatarHint: 'logo',
  isAI: true,
};

const otherRecipients: Recipient[] = [
  {
    id: 'user-1',
    name: 'Alex',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'creator-1')?.imageUrl || '',
    avatarHint: PlaceHolderImages.find(p => p.id === 'creator-1')?.imageHint || 'person happy',
  },
  {
    id: 'user-2',
    name: 'Jess',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'creator-2')?.imageUrl || '',
    avatarHint: PlaceHolderImages.find(p => p.id === 'creator-2')?.imageHint || 'person creative',
  },
  {
    id: 'user-3',
    name: 'Chris',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'creator-3')?.imageUrl || '',
    avatarHint: PlaceHolderImages.find(p => p.id === 'creator-3')?.imageHint || 'person cool',
  }
];

const allRecipients = [aiRecipient, ...otherRecipients];

type MessagesState = {
  [key: string]: Message[];
};

const initialMessages: MessagesState = {
  'ai-assistant': [
    { id: 'initial-1', text: 'Hello! I am your Gotcha Assistant. How can I help you today?', sender: 'ai', timestamp: '10:30 AM' },
  ],
  'user-1': [
    { id: 'initial-2', text: 'Hey, what\'s up?', sender: 'them', timestamp: '10:32 AM' },
  ],
  'user-2': [],
  'user-3': [],
};


export default function ChatPage() {
  const [messages, setMessages] = useState<MessagesState>(initialMessages);
  const [isAITyping, setIsAITyping] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState(languages[0].name);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient>(aiRecipient);
  const { toast } = useToast();
  
  const currentMessages = messages[selectedRecipient.id] || [];

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [selectedRecipient.id]: [...(prev[selectedRecipient.id] || []), userMessage],
    }));
    setIsAITyping(true);

    try {
      const result = await aiChatAssistant({ query: messageText });
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: result.response,
        sender: selectedRecipient.isAI ? 'ai' : 'them',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => ({
        ...prev,
        [selectedRecipient.id]: [...(prev[selectedRecipient.id] || []), aiMessage],
      }));
    } catch (error) {
      console.error('AI Assistant Error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to get a response from the AI assistant.',
      });
    } finally {
      setIsAITyping(false);
    }
  };

  const handleTranslateMessage = async (messageId: string | number, text: string) => {
    try {
      const result = await translateText({ text, targetLanguage });
      
      setMessages(prev => ({
        ...prev,
        [selectedRecipient.id]: prev[selectedRecipient.id].map(msg =>
          msg.id === messageId
            ? { ...msg, translatedText: `(${targetLanguage}) ${result.translatedText}` }
            : msg
        ),
      }));

    } catch (error) {
      console.error('Translation Error:', error);
      toast({
        variant: 'destructive',
        title: 'Translation Failed',
        description: 'Could not translate the message.',
      });
    }
  };

  return (
    <div className="h-full w-full flex">
      <div className="hidden md:flex md:w-1/3 lg:w-1/4 border-r">
        <ChatList 
          recipients={allRecipients}
          selectedRecipientId={selectedRecipient.id}
          onSelectRecipient={setSelectedRecipient}
        />
      </div>
      <div className="flex-1 h-full">
        <ChatInterface
          recipient={selectedRecipient}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          isAITyping={isAITyping}
          onTranslateMessage={handleTranslateMessage}
          targetLanguage={targetLanguage}
          onLanguageChange={setTargetLanguage}
          languages={languages}
        />
      </div>
    </div>
  );
}
