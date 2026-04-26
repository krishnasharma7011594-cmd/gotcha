import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ChevronRight, User, Bell, Lock, Globe, LogOut } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages } from '@/lib/languages';

const settingsItems = [
  { icon: User, title: 'Edit Profile', description: 'Change your name, bio, and avatar', hasToggle: false, href: '/profile' },
  { icon: Lock, title: 'Privacy', description: 'Manage who can see your content', hasToggle: false, href: '#' },
  { icon: Bell, title: 'Notifications', description: 'Likes, comments, and DMs', hasToggle: true, id: 'notifications' },
];

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <h1 className="font-headline text-3xl font-bold mb-8">Settings</h1>
      
      <div className="space-y-4">
        {settingsItems.map((item) => (
          <Card key={item.title} className="rounded-2xl shadow-sm hover:bg-muted/50 transition-colors">
            <div className="flex items-center p-4">
              <div className="p-2 bg-primary/20 rounded-lg mr-4">
                <item.icon className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              {item.hasToggle ? (
                <Switch id={item.id} className="data-[state=checked]:bg-accent" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </Card>
        ))}

        <Card className="rounded-2xl shadow-sm">
          <div className="flex items-center p-4">
            <div className="p-2 bg-primary/20 rounded-lg mr-4">
              <Globe className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Language</p>
              <p className="text-sm text-muted-foreground">Select your preferred language</p>
            </div>
            <Select defaultValue="en">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:bg-destructive/10 transition-colors text-destructive">
          <div className="flex items-center p-4">
            <div className="p-2 bg-destructive/20 rounded-lg mr-4">
              <LogOut className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Logout</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
