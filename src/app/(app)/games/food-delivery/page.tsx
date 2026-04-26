'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, Filter, Search, Star, Utensils } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const restaurants = [
  { name: 'The Golden Spoon', cuisine: 'Italian, Pizza', rating: 4.5, time: '25-30 min', imageId: 'vybz-2' },
  { name: 'Burger Bliss', cuisine: 'Burgers, Fast Food', rating: 4.2, time: '15-20 min', imageId: 'vybz-4' },
  { name: 'Sushi Central', cuisine: 'Japanese, Sushi', rating: 4.8, time: '30-35 min', imageId: 'vybz-7' },
  { name: 'Taco Town', cuisine: 'Mexican', rating: 4.4, time: '20-25 min', imageId: 'vybz-1' },
];

export default function FoodDeliveryPage() {
  return (
    <div className="bg-background min-h-full">
      <div className="container mx-auto max-w-4xl py-6 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/games" passHref>
            <Button size="icon" variant="ghost">
              <ArrowLeft />
            </Button>
          </Link>
          <div>
            <p className="text-sm font-semibold">Deliver to</p>
            <p className="font-bold text-accent">Home - 123 Main St</p>
          </div>
        </div>

        <h1 className="font-headline text-4xl font-bold mb-4">What would you like to eat?</h1>

        {/* Search and Filter */}
        <div className="flex items-center gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for restaurants or dishes"
              className="pl-10 h-12 rounded-full bg-muted/50 border-none"
            />
          </div>
          <Button size="icon" variant="outline" className="h-12 w-12 rounded-full flex-shrink-0">
            <Filter />
          </Button>
        </div>

        {/* Restaurant List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restaurants.map((resto) => {
            const image = PlaceHolderImages.find(img => img.id === resto.imageId);
            return (
              <Card key={resto.name} className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  {image && (
                    <div className="relative h-40 w-full">
                      <Image
                        src={image.imageUrl}
                        alt={resto.name}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-headline text-xl font-bold">{resto.name}</h3>
                      <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-0.5 rounded-md text-sm">
                        <Star className="h-3 w-3 fill-white" />
                        <span>{resto.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">{resto.cuisine}</p>
                    <p className="text-muted-foreground text-sm mt-2">{resto.time}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
            <Button variant="outline" className="rounded-full">Show all restaurants</Button>
        </div>
      </div>
    </div>
  );
}
