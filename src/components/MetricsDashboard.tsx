
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
    <div className="flex-1 p-4">
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

      {state.selectedMetrics.length > 0 && (
        <div className="mt-6 p-4 holographic rounded-lg">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Investigation Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.selectedMetrics.map((metricId) => {
              const metric = state.cityMetrics.find(m => m.id === metricId);
              if (!metric) return null;

              return (
                <div key={metricId} className="p-3 bg-muted/20 rounded border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{metric.name}</h4>
                    <span className="text-xs text-primary font-mono">
                      ANALYZED
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>Pattern detected: {metric.pattern || 'Irregular spikes'}</div>
                    <div>Confidence: {metric.confidence || '87%'}</div>
                    <div className="mt-2 text-xs">
                      {metric.analysis || 'Unusual activity detected in sector 7. Correlates with high-strength hero deployments.'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
