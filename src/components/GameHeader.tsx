
import { useGame } from '../contexts/GameContext';
import { Shield, Zap, Eye, AlertTriangle, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface GameHeaderProps {
  onShowHelp: () => void;
}

export const GameHeader = ({ onShowHelp }: GameHeaderProps) => {
  const { state } = useGame();

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <header className="holographic border-b border-primary/30 p-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title and status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-primary glow" />
            <div>
              <h1 className="text-2xl font-bold text-primary">HeroScope</h1>
              <div className="text-sm text-muted-foreground font-mono">
                Operations Center
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-primary text-primary">
              <Eye className="w-4 h-4 mr-1" />
              Turn {state.turn}
            </Badge>
            
            <Badge variant="outline" className="border-secondary text-secondary">
              <Zap className="w-4 h-4 mr-1" />
              Score: {state.score.toLocaleString()}
            </Badge>
          </div>
        </div>

        {/* Help Button */}
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={onShowHelp}
            className="flex items-center space-x-2 text-accent border-accent/50 hover:bg-accent/10"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Tutorial</span>
          </Button>
        </div>

        {/* Center - Investigation tokens */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground font-mono">
            Investigation Tokens:
          </span>
          <div className="flex space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border-2 ${
                  i < state.investigationTokens
                    ? 'bg-accent border-accent glow'
                    : 'border-muted bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Threat level and phase */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-sm text-muted-foreground font-mono">
              Threat Level
            </div>
            <div className={`text-lg font-bold uppercase ${getThreatColor(state.threatLevel)}`}>
              {state.threatLevel}
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-muted-foreground font-mono">
              Phase
            </div>
            <div className="text-lg font-bold text-primary capitalize">
              {state.gamePhase}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <div className="text-sm font-mono">
              <div className="text-destructive font-bold">
                {state.alerts.filter(a => a.severity === 'high').length}
              </div>
              <div className="text-muted-foreground">
                Active Alerts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground">
        <div className="flex space-x-6">
          <span>SYSTEM STATUS: OPERATIONAL</span>
          <span>HEROES ONLINE: {state.heroes.filter(h => h.available).length}</span>
          <span>DEPLOYED: {state.deployedHeroes.length}</span>
        </div>
        <div className="flex space-x-6">
          <span>UPTIME: 99.97%</span>
          <span>LATENCY: 12ms</span>
          <span>PROCESSING: 1.4M signals/sec</span>
        </div>
      </div>
    </header>
  );
};
