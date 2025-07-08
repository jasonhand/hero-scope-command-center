
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Eye, Target } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [glitchText, setGlitchText] = useState('HeroScope');

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchChars = ['#', '@', '$', '%', '&', '*'];
      const original = 'HeroScope';
      let glitched = '';
      
      for (let i = 0; i < original.length; i++) {
        if (Math.random() < 0.1) {
          glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitched += original[i];
        }
      }
      
      setGlitchText(glitched);
      
      setTimeout(() => setGlitchText('HeroScope'), 100);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-slate-900 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse"></div>
        <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div
              key={i}
              className="border border-primary/10 animate-pulse"
              style={{
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero silhouettes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent glow-pulse mb-4">
            {glitchText}
          </h1>
          <div className="text-2xl font-bold text-primary tracking-widest">
            SIGNAL OVERRIDE
          </div>
          <div className="text-lg text-muted-foreground mt-2 font-mono">
            HERO OPERATIONS CENTER v2.4.7
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-xl text-foreground/80 leading-relaxed">
            Monitor superhero activity through advanced signal analysis.
            Distinguish real threats from noise. Deploy heroes strategically.
            <span className="block mt-2 text-primary font-semibold">
              The city's safety depends on your data-driven decisions.
            </span>
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="holographic rounded-lg p-4 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-sm font-semibold">Real-time Monitoring</div>
          </div>
          <div className="holographic rounded-lg p-4 text-center">
            <Eye className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-sm font-semibold">Signal Analysis</div>
          </div>
          <div className="holographic rounded-lg p-4 text-center">
            <Target className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-sm font-semibold">Threat Detection</div>
          </div>
          <div className="holographic rounded-lg p-4 text-center">
            <Zap className="w-8 h-8 text-destructive mx-auto mb-2" />
            <div className="text-sm font-semibold">Hero Deployment</div>
          </div>
        </div>

        {/* Start Button */}
        <div className="space-y-4">
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-background font-bold text-xl px-12 py-6 rounded-lg cyber-border glow-pulse transform hover:scale-105 transition-all duration-300"
          >
            <Shield className="w-6 h-6 mr-3" />
            Enter Operations Center
          </Button>
          
          <div className="text-sm text-muted-foreground font-mono">
            [CLASSIFIED CLEARANCE REQUIRED]
          </div>
        </div>

        {/* Version info */}
        <div className="absolute bottom-8 left-8 text-xs text-muted-foreground font-mono">
          <div>BUILD: 2024.07.08.1337</div>
          <div>STATUS: OPERATIONAL</div>
          <div>SECURITY: MAXIMUM</div>
        </div>

        <div className="absolute bottom-8 right-8 text-xs text-muted-foreground font-mono">
          <div>HEROES ONLINE: 847</div>
          <div>THREATS MONITORED: 23,451</div>
          <div>SIGNALS PROCESSED: 1.2M/sec</div>
        </div>
      </div>
    </div>
  );
};
