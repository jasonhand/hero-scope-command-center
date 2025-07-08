
import { useGame } from '../contexts/GameContext';
import { MetricCard } from './MetricCard';
import { TrendingUp, TrendingDown, Activity, Zap, Shield, AlertTriangle } from 'lucide-react';

export const MetricsDashboard = () => {
  const { state, dispatch } = useGame();

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'crime': return AlertTriangle;
      case 'power': return Zap;
      case 'emergency': return Activity;
      case 'seismic': return TrendingUp;
      case 'communication': return Shield;
      default: return TrendingDown;
    }
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="min-h-0">{/* Ensures proper overflow behavior */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">City Metrics Dashboard</h2>
        <div className="text-sm text-muted-foreground font-mono">
          Real-time monitoring • Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.cityMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            icon={getMetricIcon(metric.type)}
            isSelected={state.selectedMetrics.includes(metric.id)}
            onInvestigate={() => state.investigationTokens > 0 && dispatch({ 
              type: 'USE_INVESTIGATION_TOKEN', 
              payload: metric.id 
            })}
          />
        ))}
      </div>

      </div>
    </div>
  );
};
