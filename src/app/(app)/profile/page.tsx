import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Settings, Link as LinkIcon, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const userPosts = PlaceHolderImages.filter(img => img.id.startsWith('vybz-')).slice(0, 9);
const hommies = PlaceHolderImages.filter(img => img.id.startsWith('profile-')).slice(0, 4);
const mainProfile = PlaceHolderImages.find(img => img.id === 'profile-main');

export default function ProfilePage() {
  return (
    <div className="w-full">
      {/* Header with Gradient */}
      <div className="relative h-48 w-full bg-gradient-primary">
        <div className="absolute top-4 right-4">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="glassmorphism text-foreground rounded-full">
              <Settings />
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Info */}
      <div className="container mx-auto max-w-4xl -mt-24 px-4">
        <div className="relative flex flex-col items-center">
          <Avatar className="h-32 w-32 border-4 border-background ring-4 ring-accent shadow-glow-accent">
            <AvatarImage src={mainProfile?.imageUrl} data-ai-hint={mainProfile?.imageHint} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          
          <h1 className="font-headline text-3xl font-bold mt-4">Your Name</h1>
          <p className="text-muted-foreground mt-1">@yourusername</p>
          <p className="mt-4 text-center max-w-md">
            Digital creator | Spreading good vybz ✨ | Just trying to be aesthetic
          </p>

          <div className="flex items-center gap-2 mt-2 text-accent">
            <LinkIcon className="h-4 w-4" />
            <a href="#" className="font-semibold hover:underline">your.link/here</a>
          </div>

          <Button variant="outline" className="mt-4 rounded-full">Edit Profile</Button>

          {/* Stats */}
          <div className="flex justify-around w-full max-w-sm mt-6 text-center">
            <div>
              <p className="font-bold text-xl">1.2M</p>
              <p className="text-sm text-muted-foreground">Lovers</p>
            </div>
            <div>
              <p className="font-bold text-xl">450</p>
              <p className="text-sm text-muted-foreground">Lovely</p>
            </div>
            <div>
              <p className="font-bold text-xl">3.4M</p>
              <p className="text-sm text-muted-foreground">Likes</p>
            </div>
          </div>
        </div>

        {/* Tabs for Posts and Hommies */}
        <Tabs defaultValue="posts" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-2 rounded-full">
            <TabsTrigger value="posts" className="rounded-full">Posts</TabsTrigger>
            <TabsTrigger value="hommies" className="rounded-full">Hommies</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div className="grid grid-cols-3 gap-1 md:gap-2 mt-4">
              {userPosts.map(post => (
                <Card key={post.id} className="overflow-hidden rounded-lg">
                  <CardContent className="p-0">
                    <Image 
                      src={post.imageUrl}
                      alt={post.description}
                      width={300}
                      height={400}
                      className="aspect-square object-cover"
                      data-ai-hint={post.imageHint}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="hommies" className="mt-4">
             <Card className="p-6">
                <div className="flex flex-col items-center text-center text-muted-foreground">
                  <Users className="h-12 w-12 mb-4" />
                  <h3 className="font-semibold text-lg text-foreground">Private Trusted Circle</h3>
                  <p className="text-sm mt-2">Content shared with your Hommies is only visible here. You haven't added any Hommies yet.</p>
                  <Button className="mt-4 rounded-full">Find Friends</Button>
                </div>
              </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
