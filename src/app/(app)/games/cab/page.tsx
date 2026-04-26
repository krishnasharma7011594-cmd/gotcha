'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Car, Dot, History, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const rideOptions = [
  { name: 'VybzGo', time: '3 min away', price: '$8.50', icon: Car },
  { name: 'VybzXL', time: '5 min away', price: '$12.75', icon: Car },
  { name: 'VybzLux', time: '4 min away', price: '$22.00', icon: Car },
];

export default function CabPage() {
  return (
    <div className="relative h-full w-full bg-gray-200">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/games" passHref>
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
            <ArrowLeft />
          </Button>
        </Link>
      </div>

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1599833692483-33b6667554e2?q=80&w=1887&auto=format&fit=crop"
          alt="Map"
          fill
          className="object-cover"
          data-ai-hint="city map"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Main Content Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Card className="rounded-t-3xl border-none shadow-2xl">
          <CardContent className="p-6">
            <div className="w-16 h-1.5 bg-muted rounded-full mx-auto mb-4" />
            <h2 className="font-headline text-2xl font-bold mb-4">Where to?</h2>
            
            <div className="relative mb-4">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Enter destination" className="pl-10 h-12 rounded-lg bg-muted border-none" />
            </div>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="bg-muted p-3 rounded-lg">
                <History className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold">Grand Central</p>
                <p className="text-sm text-muted-foreground">New York, NY</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3">Choose a ride</h3>
            <div className="space-y-3">
              {rideOptions.map((ride) => (
                <div key={ride.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <ride.icon className="h-8 w-8 text-accent" />
                  <div className="flex-1">
                    <p className="font-bold">{ride.name}</p>
                    <p className="text-sm text-muted-foreground">{ride.time}</p>
                  </div>
                  <p className="font-semibold">{ride.price}</p>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 h-12 rounded-full text-lg bg-accent hover:bg-accent/90">
              Confirm Ride
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
