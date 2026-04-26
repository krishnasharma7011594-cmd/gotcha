'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Coins, LayoutGrid, MessageCircle, LogOut, User, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mainNavItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/explore', icon: null, label: 'Explore' },
];

const secondaryNavItems = [
  { href: '/wallet', icon: Coins, label: 'Karma' },
  { href: '/games', icon: LayoutGrid, label: 'Mini Apps' },
  { href: '/chat', icon: MessageCircle, label: 'Chat' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const mainProfile = PlaceHolderImages.find(img => img.id === 'profile-main');

  return (
    <aside className="w-64 flex-col border-r bg-background p-6 flex">
      <Link href="/home" className="flex items-center gap-2 mb-8">
        <Logo className="h-8 w-8 text-accent" />
        <span className="font-headline text-2xl font-bold">Gotcha 2.0</span>
      </Link>

      <nav className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Discover</h3>
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 text-lg font-semibold hover:text-accent transition-colors",
              isActive ? "text-accent" : "text-foreground"
            )}>
              {item.icon && <item.icon className="h-6 w-6" />}
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <nav className="flex flex-col gap-3 mt-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Menu</h3>
        {secondaryNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive && "bg-muted text-primary"
            )}>
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <Link href="/profile" className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname === '/profile' && "bg-muted text-primary"
            )}>
            <Avatar className="h-8 w-8">
                <AvatarImage src={mainProfile?.imageUrl} data-ai-hint={mainProfile?.imageHint} />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
          <span>Profile</span>
        </Link>
        <Button variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
      </div>
    </aside>
  );
}
