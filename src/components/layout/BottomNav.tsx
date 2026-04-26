'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, PlusSquare, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/create', icon: PlusSquare, label: 'Create' },
  { href: '/chat', icon: MessageCircle, label: 'Chat' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 p-2 text-muted-foreground transition-colors duration-200',
                isActive ? 'text-accent' : 'hover:text-foreground',
                item.href === '/create' && '-mt-4'
              )}
            >
              {item.href === '/create' ? (
                 <div className="rounded-2xl bg-accent p-3 text-accent-foreground shadow-glow-accent">
                    <item.icon className="h-6 w-6" strokeWidth={2.5} />
                 </div>
              ) : (
                <>
                  <item.icon
                    className='h-6 w-6'
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
