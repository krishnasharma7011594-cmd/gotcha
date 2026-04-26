'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function Stories() {
  const stories = PlaceHolderImages.filter(p => p.id.startsWith('creator-'));
  const mainProfile = PlaceHolderImages.find(p => p.id === 'profile-main');

  return (
    <div className="py-4 border-b sm:border rounded-none sm:rounded-lg mb-0 sm:mb-4">
      <ScrollArea>
        <div className="flex space-x-4 px-4">
            {mainProfile && (
                <div className="flex flex-col items-center gap-1.5 w-20">
                    <Avatar className="h-16 w-16 border-2 border-muted">
                        <AvatarImage src={mainProfile.imageUrl} data-ai-hint={mainProfile.imageHint} />
                        <AvatarFallback>Me</AvatarFallback>
                    </Avatar>
                    <p className="text-xs font-medium truncate w-full text-center text-muted-foreground">Your Story</p>
                </div>
            )}
          {stories.map(story => (
            <div key={story.id} className="flex flex-col items-center gap-1.5 w-20">
              <Avatar className="h-16 w-16 ring-2 ring-offset-2 ring-offset-background ring-accent">
                <AvatarImage src={story.imageUrl} data-ai-hint={story.imageHint} />
                <AvatarFallback>{story.id.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="text-xs font-medium truncate w-full text-center">creator_{story.id.split('-')[1]}</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-0" />
      </ScrollArea>
    </div>
  );
}
