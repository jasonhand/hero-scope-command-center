
import { useGame } from '../contexts/GameContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertTriangle, 
  Zap, 
  Shield, 
  Clock, 
  MapPin,
  Activity,
  TrendingUp
} from 'lucide-react';

export const AlertFeed = () => {
  const { state } = useGame();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'threat': return AlertTriangle;
      case 'anomaly': return Activity;
      case 'deployment': return Shield;
      case 'system': return Zap;
      case 'trend': return TrendingUp;
      default: return Clock;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400 border-green-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'high': return 'text-orange-400 border-orange-400';
      case 'critical': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="p-4 holographic h-64">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-primary">Alert Feed</h3>
        </div>
        
        <Badge variant="outline" className="text-xs border-destructive text-destructive">
          {state.alerts.filter(a => a.severity === 'high' || a.severity === 'critical').length} Critical
        </Badge>
      </div>

      <ScrollArea className="h-48">
        <div className="space-y-2">
          {state.alerts.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm py-8">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div>No active alerts</div>
              <div className="text-xs">System monitoring normal</div>
            </div>
          ) : (
            state.alerts.map((alert, index) => {
              const AlertIcon = getAlertIcon(alert.type);
              
              return (
                <div
                  key={index}
                  className={`p-2 rounded border transition-all duration-300 hover:bg-muted/20 ${
                    alert.severity === 'critical' ? 'animate-pulse' : ''
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <AlertIcon className={`w-4 h-4 mt-0.5 ${getAlertColor(alert.severity).split(' ')[0]}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {alert.title}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getAlertColor(alert.severity)}`}
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-1">
                        {alert.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <span className="text-muted-foreground font-mono">
                            {formatTime(alert.timestamp)}
                          </span>
                          
                          {alert.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {alert.location}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {alert.acknowledged && (
                          <Badge variant="secondary" className="text-xs">
                            ACK
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Quick Stats */}
      <div className="mt-3 pt-3 border-t border-primary/20">
        <div className="flex justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-destructive rounded-full"></div>
            <span className="text-muted-foreground">Critical: {state.alerts.filter(a => a.severity === 'critical').length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">High: {state.alerts.filter(a => a.severity === 'high').length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Total: {state.alerts.length}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
