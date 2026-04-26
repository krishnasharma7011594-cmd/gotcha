import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowDownLeft, ArrowUpRight, Send, Coins } from 'lucide-react';

const transactions = [
  { type: 'earned', description: 'Daily Login Bonus', amount: 10, icon: ArrowDownLeft, color: 'text-green-500' },
  { type: 'spent', description: 'Tipped @coolcreator', amount: 5, icon: ArrowUpRight, color: 'text-red-500' },
  { type: 'earned', description: 'Vybz Reached 1K Likes', amount: 50, icon: ArrowDownLeft, color: 'text-green-500' },
  { type: 'spent', description: 'Redeemed Voucher', amount: 100, icon: ArrowUpRight, color: 'text-red-500' },
];

export default function WalletPage() {
  return (
    <div className="bg-gradient-to-b from-primary/20 via-background to-secondary/20 min-h-full">
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <h1 className="font-headline text-3xl font-bold mb-8 text-center">Wallet & Karma</h1>

        {/* Coin Balance Card */}
        <Card className="mb-8 rounded-2xl shadow-lg text-center bg-gradient-accent text-accent-foreground">
          <CardHeader>
            <CardDescription className="text-accent-foreground/80">Total Balance</CardDescription>
            <CardTitle className="font-headline text-5xl flex items-center justify-center gap-2">
              <Coins className="h-10 w-10" />
              1,234
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 justify-center">
            <Button variant="secondary" className="rounded-full bg-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/30">
              <Send className="mr-2 h-4 w-4" /> Transfer
            </Button>
            <Button variant="secondary" className="rounded-full bg-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/30">Redeem</Button>
          </CardContent>
        </Card>

        {/* Karma Score */}
        <Card className="mb-8 rounded-2xl glassmorphism">
          <CardHeader>
            <CardTitle>Karma Score</CardTitle>
            <CardDescription>Your community engagement level</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="relative h-24 w-24">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  className="stroke-current text-muted"
                  strokeWidth="3" fill="none"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  className="stroke-current text-accent"
                  strokeWidth="3" fill="none"
                  strokeDasharray="75, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-xl text-accent">75</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Pro Vybzer</p>
              <p className="text-sm text-muted-foreground">25 points to next level</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Transaction List */}
        <div>
          <h2 className="font-headline text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <Card key={i} className="rounded-lg p-3 glassmorphism">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full bg-muted mr-3 ${tx.color}`}>
                    <tx.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{tx.description}</p>
                  </div>
                  <div className={`font-semibold flex items-center gap-1 ${tx.color}`}>
                    {tx.type === 'earned' ? '+' : '-'} {tx.amount}
                    <Coins className="h-4 w-4"/>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
