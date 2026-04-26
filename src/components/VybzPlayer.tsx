'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface PostCardProps {
  avatarSrc: string;
  avatarHint: string;
  username: string;
  imageSrc: string;
  imageHint: string;
  caption: string;
  likes: number;
  comments: string;
}

export default function VybzPlayer({
  avatarSrc,
  avatarHint,
  username,
  imageSrc,
  imageHint,
  caption,
  likes,
  comments,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const { toast } = useToast();

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(prev => !prev);
  };

  const handleTip = (amount: number) => {
    toast({
      title: 'Tip Sent!',
      description: `You successfully tipped ${username} ${amount} coins.`,
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto rounded-none sm:rounded-xl border-0 sm:border-t shadow-none sm:shadow-lg my-0 sm:my-4">
      <CardHeader className="flex flex-row items-center gap-3 p-3">
        <Avatar className="h-9 w-9 border-2 border-accent">
          <AvatarImage src={avatarSrc} data-ai-hint={avatarHint} />
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="font-semibold">{username}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Coins className="mr-2 h-4 w-4" />
                <span>Tip Creator</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {[10, 20, 50].map((amount) => (
                  <DropdownMenuItem key={amount} onClick={() => handleTip(amount)}>
                    <Coins className="mr-2 h-4 w-4" />
                    <span>{amount} Coins</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={imageSrc}
            alt={`Post by ${username}`}
            fill
            className="object-cover"
            data-ai-hint={imageHint}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-3">
        <div className="flex w-full items-center">
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleLike}>
              <Heart className={cn("h-6 w-6", isLiked && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Bookmark className="h-6 w-6" />
          </Button>
        </div>
        <div className="px-2 w-full">
          <p className="font-semibold text-sm">{likeCount.toLocaleString()} likes</p>
          <div className="text-sm mt-1">
            <span className="font-semibold">{username}</span>{' '}
            <span>{caption}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            View all {comments} comments
          </p>
        </div>
         <div className="w-full flex items-center gap-2 mt-2">
            <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Input
              placeholder="Add a comment..."
              className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm p-0 h-auto"
            />
        </div>
      </CardFooter>
    </Card>
  );
}
