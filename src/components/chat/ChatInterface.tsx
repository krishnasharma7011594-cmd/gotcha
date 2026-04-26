'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Mic, SendHorizonal } from 'lucide-react';
import ChatMessages from './ChatMessages';
import { Logo } from '../icons/Logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface Recipient {
  id: string;
  name: string;
  avatarUrl: string;
  avatarHint: string;
  isAI?: boolean;
}

export interface Message {
  id: number | string;
  text: string;
  sender: 'me' | 'them' | 'ai';
  timestamp: string;
  translatedText?: string;
}

interface Language {
  code: string;
  name: string;
}

interface ChatInterfaceProps {
  recipient: Recipient;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isAITyping?: boolean;
  onTranslateMessage: (messageId: string | number, text: string) => void;
  targetLanguage: string;
  onLanguageChange: (language: string) => void;
  languages: Language[];
}

export default function ChatInterface({ 
  recipient, 
  messages = [], 
  onSendMessage, 
  isAITyping,
  onTranslateMessage,
  targetLanguage,
  onLanguageChange,
  languages,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isAITyping) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 border-b p-4 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Button variant="ghost" size="icon" className="md:hidden">
          <ArrowLeft />
        </Button>
        <Avatar className="h-10 w-10 border-2 border-primary">
          {recipient.isAI ? (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Logo className="h-6 w-6 text-accent" />
            </div>
          ) : (
            <AvatarImage src={recipient.avatarUrl} data-ai-hint={recipient.avatarHint} />
          )}
          <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="font-headline text-lg font-semibold">{recipient.name}</h2>
          {isAITyping && recipient.id === 'ai-assistant' && <p className="text-xs text-accent animate-pulse">Assistant is typing...</p>}
          {isAITyping && !recipient.isAI && <p className="text-xs text-accent animate-pulse">is typing...</p>}
        </div>
        <div className="ml-auto">
          <Select value={targetLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Translate to..." />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.name}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Messages */}
      <ChatMessages messages={messages} onTranslateMessage={onTranslateMessage} />

      {/* Input Area */}
      <footer className="border-t p-4 bg-background">
        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 rounded-full bg-muted px-4"
            disabled={isAITyping}
          />
          <Button type="button" variant="ghost" size="icon" className="rounded-full">
            <Mic />
          </Button>
          <Button type="submit" size="icon" className="rounded-full bg-accent text-accent-foreground" disabled={isAITyping || !inputValue.trim()}>
            <SendHorizonal />
          </Button>
        </form>
      </footer>
    </div>
  );
}
