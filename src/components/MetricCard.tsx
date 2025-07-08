
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { toast } from 'sonner';
import { useGame } from '../contexts/GameContext';

interface MetricCardProps {
  metric: any;
  icon: any;
  isSelected: boolean;
  onInvestigate: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  metric, 
  icon: Icon, 
  isSelected, 
  onInvestigate 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { state } = useGame();

  const handleInvestigate = () => {
    if (state.investigationTokens > 0) {
      onInvestigate();
      toast.success(`🔍 Investigating ${metric.name}`, {
        description: `Pattern detected: ${metric.pattern || 'Irregular spikes'}. Confidence: ${metric.confidence || '87%'}`,
        action: {
          label: 'View Details',
          onClick: () => console.log('Show detailed analysis')
        }
      });
    } else {
      toast.error('❌ No investigation tokens remaining', {
        description: 'Complete this phase to get more tokens'
      });
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400 border-green-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'high': return 'text-orange-400 border-orange-400';
      case 'critical': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const TrendIcon = getTrendIcon(metric.trend);

  return (
    <Card 
      className={`p-4 holographic transition-all duration-300 cursor-pointer hover:scale-105 ${
        isSelected ? 'ring-2 ring-primary glow' : ''
      } ${
        metric.anomaly ? 'threat-pulse' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">{metric.name}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge 
            variant="outline" 
            className={`text-xs ${getSeverityColor(metric.severity)}`}
          >
            {metric.severity.toUpperCase()}
          </Badge>
          
          {metric.anomaly && (
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
          )}
        </div>
      </div>

      {/* Current Value */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-2xl font-bold text-primary font-mono">
            {metric.currentValue}
          </div>
          <div className="text-xs text-muted-foreground">
            {metric.unit}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <TrendIcon className={`w-4 h-4 ${metric.trend === 'up' ? 'text-destructive' : 'text-success'}`} />
          <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-destructive' : 'text-success'}`}>
            {metric.change}
          </span>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="h-20 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={metric.data}>
            <defs>
              <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill={`url(#gradient-${metric.id})`}
              fillOpacity={0.6}
            />
            {metric.anomaly && (
              <Area
                type="monotone"
                dataKey="anomaly"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                fill="none"
                strokeDasharray="4 4"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground font-mono">
          Last 24h • {metric.dataPoints} points
        </div>
        
        <Button
          size="sm"
          variant="outline"
          onClick={handleInvestigate}
          disabled={isSelected}
          className={`text-xs ${isSelected ? 'bg-primary/20' : 'hover:bg-primary/10'}`}
        >
          <Search className="w-3 h-3 mr-1" />
          {isSelected ? 'Analyzed' : 'Investigate'}
        </Button>
      </div>

      {/* Expanded details on hover */}
      {isHovered && (
        <div className="absolute inset-0 bg-card/95 backdrop-blur-sm rounded-lg p-4 z-10 border border-primary/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-primary">{metric.name}</h4>
            <Badge variant="secondary" className="text-xs">
              Sector {metric.sector || Math.floor(Math.random() * 10) + 1}
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Baseline:</span>
              <span className="font-mono">{metric.baseline || '45.2'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Peak:</span>
              <span className="font-mono">{metric.peak || '78.9'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Variance:</span>
              <span className="font-mono">{metric.variance || '±12.3'}</span>
            </div>
            
            {metric.correlatedHeroes && (
              <div className="mt-3 pt-2 border-t border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">
                  Correlated Heroes:
                </div>
                <div className="flex flex-wrap gap-1">
                  {metric.correlatedHeroes.slice(0, 3).map((hero: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {hero}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
