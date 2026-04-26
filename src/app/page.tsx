import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-primary via-white to-secondary p-4">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center space-x-4">
          <Logo className="h-16 w-16 text-accent" />
          <h1 className="font-headline text-6xl font-bold text-foreground">
            Gotcha 2.0
          </h1>
        </div>
        <p className="font-headline text-2xl text-muted-foreground">
          I got you
        </p>

        <Card className="w-full max-w-sm glassmorphism border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">Welcome</CardTitle>
            <CardDescription>Sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="bg-white/80" />
              </div>
              <Link href="/home" passHref>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent">
                  Continue
                </Button>
              </Link>
            </form>
            <div className="mt-4 text-center text-sm">
              <Link href="/home" className="text-muted-foreground underline">
                Continue as Guest
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
