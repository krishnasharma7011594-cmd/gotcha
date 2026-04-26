'use client';

import { cn } from '@/lib/utils';
import type { Message } from './ChatInterface';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Languages } from 'lucide-react';
import { Button } from '../ui/button';

interface ChatMessagesProps {
  messages: Message[];
  onTranslateMessage: (messageId: string | number, text: string) => void;
}

export default function ChatMessages({ messages, onTranslateMessage }: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex max-w-[75%] items-end gap-2 group',
              message.sender === 'me' ? 'self-end flex-row-reverse' : 'self-start'
            )}
          >
            <div
              className={cn(
                'rounded-3xl px-4 py-3 text-sm shadow-md relative',
                message.sender === 'me'
                  ? 'bg-accent text-accent-foreground rounded-br-none'
                  : 'bg-muted text-foreground rounded-bl-none',
                message.sender === 'ai' && 'bg-gradient-primary text-primary-foreground rounded-bl-none'
              )}
            >
              {message.sender === 'ai' && (
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <Bot className="h-4 w-4" />
                  <span>AI Assistant</span>
                </div>
              )}
              <p>{message.text}</p>
              {message.translatedText && (
                <p className="text-xs mt-2 pt-2 border-t border-white/20">{message.translatedText}</p>
              )}
               <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity absolute -right-10 bottom-0"
                  onClick={() => onTranslateMessage(message.id, message.text)}
                >
                  <Languages className="h-4 w-4" />
                </Button>
            </div>
            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
