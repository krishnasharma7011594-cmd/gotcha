import { Button } from '@/components/ui/button';
import { Music, Zap, RotateCw } from 'lucide-react';

export default function CreatePage() {
  return (
    <div className="relative h-full w-full bg-gray-900 flex items-center justify-center">
      {/* Mock Camera View */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <p className="text-white/50 text-lg">Camera Preview</p>
      </div>

      {/* Glassy Overlay UI */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        {/* Top Controls */}
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" className="glassmorphism rounded-full h-12 w-12 text-white">
            <RotateCw />
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-4">
            <Button variant="ghost" size="icon" className="glassmorphism rounded-full h-12 w-12 text-white">
              <Zap />
              <span className="sr-only">Filters</span>
            </Button>
            <Button variant="ghost" size="icon" className="glassmorphism rounded-full h-12 w-12 text-white">
              <Music />
              <span className="sr-only">Music</span>
            </Button>
          </div>

          {/* Record Button */}
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              className="h-20 w-20 rounded-full bg-white shadow-glow-primary ring-4 ring-white/50"
              aria-label="Record Vybz"
            >
              <div className="h-16 w-16 rounded-full bg-accent shadow-inner"></div>
            </Button>
          </div>
          
          <div>
            {/* Placeholder for Upload Button */}
            <div className="h-12 w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
