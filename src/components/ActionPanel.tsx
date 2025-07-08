import { useGame } from '../contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Search, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

export const ActionPanel = () => {
  const { state, dispatch, nextTurn } = useGame();

  const handlePhaseTransition = () => {
    switch (state.gamePhase) {
      case 'monitoring':
        dispatch({ type: 'SET_PHASE', payload: 'investigation' });
        break;
      case 'investigation':
        dispatch({ type: 'SET_PHASE', payload: 'deployment' });
        break;
      case 'deployment':
        dispatch({ type: 'SET_PHASE', payload: 'resolution' });
        break;
      case 'resolution':
        nextTurn();
        break;
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'monitoring': return Search;
      case 'investigation': return Target;
      case 'deployment': return Play;
      case 'resolution': return CheckCircle;
      default: return Clock;
    }
  };

  const getPhaseDescription = (phase: string) => {
    switch (phase) {
      case 'monitoring': return 'Analyze city metrics and identify potential threats';
      case 'investigation': return 'Use investigation tokens to drill down into suspicious data';
      case 'deployment': return 'Deploy heroes to handle confirmed threats';
      case 'resolution': return 'Review results and calculate performance scores';
      default: return '';
    }
  };

  const getPhaseAction = (phase: string) => {
    switch (phase) {
      case 'monitoring': return 'Begin Investigation';
      case 'investigation': return 'Start Deployment';
      case 'deployment': return 'Execute Mission';
      case 'resolution': return 'Next Turn';
      default: return 'Continue';
    }
  };

  const PhaseIcon = getPhaseIcon(state.gamePhase);

  return (
    <Card className="p-4 holographic">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <PhaseIcon className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary capitalize">
              {state.gamePhase} Phase
            </h3>
            <p className="text-sm text-muted-foreground">
              {getPhaseDescription(state.gamePhase)}
            </p>
          </div>
        </div>

        <Badge variant="outline" className="text-primary border-primary">
          Turn {state.turn}
        </Badge>
      </div>

      {/* Phase-specific content */}
      <div className="mb-4">
        {state.gamePhase === 'monitoring' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Active Metrics:</span>
              <span className="font-mono">{state.cityMetrics.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Anomalies Detected:</span>
              <span className="font-mono text-destructive">
                {state.cityMetrics.filter(m => m.anomaly).length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Threat Level:</span>
              <Badge variant="destructive" className="text-xs">
                {state.threatLevel.toUpperCase()}
              </Badge>
            </div>
          </div>
        )}

        {state.gamePhase === 'investigation' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tokens Remaining:</span>
              <div className="flex space-x-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < state.investigationTokens
                        ? 'bg-accent'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Investigated:</span>
              <span className="font-mono">{state.selectedMetrics.length}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Click "Investigate" on metric cards to analyze patterns
            </div>
          </div>
        )}

        {state.gamePhase === 'deployment' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Heroes Available:</span>
              <span className="font-mono text-success">
                {state.heroes.filter(h => h.available).length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Currently Deployed:</span>
              <span className="font-mono text-destructive">
                {state.deployedHeroes.length}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Deploy heroes to zones based on your investigation
            </div>
          </div>
        )}

        {state.gamePhase === 'resolution' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Threats Resolved:</span>
              <span className="font-mono text-success">
                {Math.floor(Math.random() * state.deployedHeroes.length + 1)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">False Alarms:</span>
              <span className="font-mono text-warning">
                {Math.floor(Math.random() * 2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Score Earned:</span>
              <span className="font-mono text-primary">
                +{Math.floor(Math.random() * 500 + 200)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {state.gamePhase === 'investigation' && (
            <Button
              variant="outline"
              size="sm"
              disabled={state.investigationTokens === 0}
              className="text-xs"
            >
              <Search className="w-3 h-3 mr-1" />
              Auto-Investigate
            </Button>
          )}
          
          {state.gamePhase === 'deployment' && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <Target className="w-3 h-3 mr-1" />
              Suggest Deployment
            </Button>
          )}
        </div>

        <Button
          onClick={handlePhaseTransition}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-background font-semibold"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          {getPhaseAction(state.gamePhase)}
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 flex items-center space-x-2">
        {['monitoring', 'investigation', 'deployment', 'resolution'].map((phase, index) => (
          <div key={phase} className="flex items-center">
            <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
              phase === state.gamePhase
                ? 'bg-primary'
                : index < ['monitoring', 'investigation', 'deployment', 'resolution'].indexOf(state.gamePhase)
                  ? 'bg-success'
                  : 'bg-muted'
            }`} />
            {index < 3 && (
              <div className="w-2 h-px bg-muted mx-1" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
