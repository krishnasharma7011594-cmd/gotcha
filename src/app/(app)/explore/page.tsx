import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bot, MessageSquare, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const creators = PlaceHolderImages.filter(img => img.id.startsWith('creator-'));
const vybz = PlaceHolderImages.filter(img => img.id.startsWith('vybz-')).slice(4, 13); // Get 9 for a 3x3 grid
const bots = [
    { name: 'Story Weaver', description: 'Helps you write creative stories.', icon: Bot },
    { name: 'Meme Lord', description: 'Generates memes on any topic.', icon: MessageSquare },
    { name: 'Quiz Master', description: 'Creates and runs fun quizzes.', icon: Bot },
]

export default function ExplorePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search creators, Vybz, bots..."
          className="w-full rounded-full bg-muted/50 pl-12 h-12 text-lg glassmorphism border-primary/20 shadow-sm"
        />
      </div>

      <Tabs defaultValue="vybz" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-full">
          <TabsTrigger value="vybz" className="rounded-full">Vybz</TabsTrigger>
          <TabsTrigger value="profiles" className="rounded-full">Profiles</TabsTrigger>
          <TabsTrigger value="bots" className="rounded-full">Bots</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vybz" className="mt-6">
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {vybz.map((vyb) => (
              <Link href="/home" key={vyb.id}>
                <Card className="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105">
                  <CardContent className="p-0">
                    <Image
                      src={vyb.imageUrl}
                      alt={vyb.description}
                      width={300}
                      height={400}
                      className="aspect-[3/4] object-cover"
                      data-ai-hint={vyb.imageHint}
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profiles" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {creators.map((creator) => (
                    <Card key={creator.id} className="text-center flex flex-col items-center p-4 rounded-xl glassmorphism">
                        <Avatar className="h-20 w-20 border-2 border-accent shadow-glow-accent mb-3">
                          <AvatarImage src={creator.imageUrl} data-ai-hint={creator.imageHint} />
                          <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold">creator_{creator.id.split('-')[1]}</p>
                        <p className="text-xs text-muted-foreground">Top Creator</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full">Follow</Button>
                    </Card>
                ))}
            </div>
        </TabsContent>

        <TabsContent value="bots" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bots.map((bot) => (
                    <Card key={bot.name} className="p-4 flex items-center gap-4 rounded-xl glassmorphism hover:bg-primary/10 transition-colors">
                        <div className="p-3 bg-primary/20 rounded-lg">
                           <bot.icon className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <p className="font-semibold">{bot.name}</p>
                            <p className="text-sm text-muted-foreground">{bot.description}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-auto">
                            <MessageSquare className="h-5 w-5" />
                        </Button>
                    </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
