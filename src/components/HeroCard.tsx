
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Brain, 
  Gauge, 
  Shield, 
  Sword, 
  Clock,
  MapPin,
  Star
} from 'lucide-react';

interface HeroCardProps {
  hero: any;
  isDeployed: boolean;
  onDeploy: (zone: string) => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ hero, isDeployed, onDeploy }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'intelligence': return Brain;
      case 'strength': return Gauge;
      case 'speed': return Zap;
      case 'durability': return Shield;
      case 'power': return Star;
      case 'combat': return Sword;
      default: return Zap;
    }
  };

  const getStatColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    if (value >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getOverallRating = () => {
    if (!hero.powerstats) return 0;
    const stats = Object.values(hero.powerstats).filter(v => typeof v === 'number');
    return Math.round(stats.reduce((sum: number, stat: any) => sum + stat, 0) / stats.length);
  };

  const zones = ['Downtown', 'Harbor', 'Industrial', 'Residential', 'Tech District'];

  return (
    <Card className={`p-3 holographic transition-all duration-300 ${
      isDeployed ? 'ring-2 ring-destructive' : hero.available ? 'hover:scale-105' : 'opacity-50'
    }`}>
      <div className="flex items-start space-x-3">
        {/* Hero Avatar */}
        <div className="relative">
          <img
            src={hero.image || `https://picsum.photos/60/60?random=${hero.id}`}
            alt={hero.name}
            className="w-12 h-12 rounded-lg object-cover border border-primary/30"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://picsum.photos/60/60?random=${hero.id}`;
            }}
          />
          {!hero.available && (
            <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
          {isDeployed && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
          )}
        </div>

        {/* Hero Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm text-foreground truncate">
              {hero.name}
            </h4>
            <Badge variant="outline" className="text-xs">
              {getOverallRating()}
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-2 mb-2">
            {hero.powerstats && Object.entries(hero.powerstats).slice(0, 3).map(([stat, value]) => {
              const StatIcon = getStatIcon(stat);
              return (
                <div key={stat} className="flex items-center space-x-1">
                  <StatIcon className="w-3 h-3 text-muted-foreground" />
                  <span className={`text-xs font-mono ${getStatColor(value as number)}`}>
                    {value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {isDeployed ? (
                <Badge variant="destructive" className="text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  Deployed
                </Badge>
              ) : hero.available ? (
                <Badge variant="outline" className="text-xs border-success text-success">
                  Ready
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Cooldown: {hero.cooldown || 2}t
                </Badge>
              )}
            </div>

            {!isDeployed && hero.available && (
              <div className="flex space-x-1">
                {zones.slice(0, 2).map((zone) => (
                  <Button
                    key={zone}
                    size="sm"
                    variant="outline"
                    onClick={() => onDeploy(zone)}
                    className="text-xs px-2 py-1 h-6"
                  >
                    {zone.slice(0, 3)}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Expanded Details */}
          {showDetails && (
            <div className="mt-3 pt-2 border-t border-primary/20 space-y-2">
              {hero.powerstats && (
                <div className="space-y-1">
                  {Object.entries(hero.powerstats).map(([stat, value]) => {
                    const StatIcon = getStatIcon(stat);
                    return (
                      <div key={stat} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <StatIcon className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs capitalize">{stat}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getStatColor(value as number)} bg-current transition-all duration-300`}
                              style={{ width: `${(value as number)}%` }}
                            />
                          </div>
                          <span className={`text-xs font-mono w-6 text-right ${getStatColor(value as number)}`}>
                            {value}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {hero.biography?.publisher && (
                <div className="text-xs text-muted-foreground">
                  Publisher: {hero.biography.publisher}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Toggle Details */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDetails(!showDetails)}
        className="w-full mt-2 text-xs"
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </Button>
    </Card>
  );
};
