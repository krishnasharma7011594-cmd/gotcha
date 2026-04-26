'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Recipient } from './ChatInterface';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Logo } from '../icons/Logo';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

interface ChatListProps {
  recipients: Recipient[];
  selectedRecipientId: string;
  onSelectRecipient: (recipient: Recipient) => void;
}

export default function ChatList({ recipients, selectedRecipientId, onSelectRecipient }: ChatListProps) {
  return (
    <div className="flex flex-col h-full w-full bg-muted/50">
      <div className="p-4 border-b">
        <h2 className="font-headline text-2xl font-bold">Chats</h2>
        <div className="relative mt-4">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input placeholder="Search chats..." className="pl-9 rounded-full bg-background" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {recipients.map((recipient) => (
            <button
              key={recipient.id}
              onClick={() => onSelectRecipient(recipient)}
              className={cn(
                "flex items-center gap-4 p-4 w-full text-left hover:bg-accent/50 transition-colors",
                selectedRecipientId === recipient.id && 'bg-accent/80'
              )}
            >
              <Avatar className="h-12 w-12 border-2 border-primary">
                {recipient.isAI ? (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Logo className="h-7 w-7 text-accent" />
                  </div>
                ) : (
                  <AvatarImage src={recipient.avatarUrl} data-ai-hint={recipient.avatarHint} />
                )}
                <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <h3 className="font-semibold">{recipient.name}</h3>
                <p className="text-sm text-muted-foreground truncate">Last message preview...</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
