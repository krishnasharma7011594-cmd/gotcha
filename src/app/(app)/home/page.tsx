'use client';

import VybzPlayer from '@/components/VybzPlayer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '@/components/ui/scroll-area';
import Stories from '@/components/home/Stories';

export default function HomePage() {
  // Use a selection of Vybz and profile images for the feed
  const posts = PlaceHolderImages.filter(p => p.id.startsWith('vybz-'));
  const profiles = PlaceHolderImages.filter(p => p.id.startsWith('profile-'));

  return (
    <div className="h-full w-full bg-background md:bg-muted/30">
      <ScrollArea className="h-full">
        <div className="flex flex-col items-center py-0 md:py-8">
          <div className="w-full max-w-lg mx-auto sm:px-0">
             <Stories />
          </div>
          {posts.map((post, index) => {
            // Cycle through profile pictures for variety
            const profile = profiles[index % profiles.length];
            return (
              <VybzPlayer
                key={post.id}
                imageSrc={post.imageUrl}
                imageHint={post.imageHint}
                avatarSrc={profile.imageUrl}
                avatarHint={profile.imageHint}
                username={`user_${profile.id.split('-')[1]}`}
                caption={post.description}
                likes={Math.floor(Math.random() * 500) + 10}
                comments={`${Math.floor(Math.random() * 500) + 10}`}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
