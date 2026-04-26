'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award, BrainCircuit, Pizza, Vault, Car, CreditCard, UtensilsCrossed, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const games = [
  { title: 'Quiz', icon: BrainCircuit, imageId: 'game-quiz', href: '#' },
  { title: 'Fruit Cut', icon: Pizza, imageId: 'game-fruit', href: '#' },
  { title: 'Vault Earn', icon: Vault, imageId: 'game-vault', href: '#' },
  { title: 'AI Tools', icon: BrainCircuit, imageId: 'game-ai', href: '#' },
  { title: 'Cab', icon: Car, imageId: 'game-cab', href: '/games/cab' },
  { title: 'PayEx', icon: CreditCard, imageId: 'game-payex', href: '#' },
  { title: 'Food Delivery', icon: UtensilsCrossed, imageId: 'game-food', href: '/games/food-delivery' },
  { title: 'E-commerce', icon: ShoppingCart, imageId: 'game-ecommerce', href: '#' },
];

export default function GamesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-3xl font-bold">Mini Apps</h1>
        <Button variant="outline" className="rounded-full">
          <Award className="mr-2 h-4 w-4" />
          Leaderboard
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {games.map((game) => {
          const image = PlaceHolderImages.find(img => img.id === game.imageId);
          const GameCard = (
            <Card className="rounded-2xl shadow-lg hover:shadow-glow-primary transition-shadow overflow-hidden group">
              <CardContent className="p-0 relative">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={game.title}
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover transition-transform group-hover:scale-110"
                    data-ai-hint={image.imageHint}
                  />
                )}
                 <div className="absolute inset-0 bg-black/30"></div>
                 <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className='flex items-center gap-2'>
                        <game.icon className="h-5 w-5 text-white" />
                        <h3 className="font-headline text-xl font-semibold text-white">{game.title}</h3>
                    </div>
                 </div>
              </CardContent>
            </Card>
          );

          if (game.href && game.href !== '#') {
            return <Link href={game.href} key={game.title}>{GameCard}</Link>;
          }
          return <div key={game.title}>{GameCard}</div>;
        })}
      </div>
    </div>
  );
}
