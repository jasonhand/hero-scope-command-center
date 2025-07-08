import { useGame } from '../contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

export const TurnTimer = () => {
  const { state, startTimer, pauseTimer, resetTimer, nextTurn } = useGame();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((state.maxTurnTime - state.turnTimeLeft) / state.maxTurnTime) * 100;
  };

  const getTimerColor = () => {
    const percentage = (state.turnTimeLeft / state.maxTurnTime) * 100;
    if (percentage > 50) return 'text-success';
    if (percentage > 25) return 'text-warning';
    return 'text-destructive';
  };

  // Show warning toasts as time runs out
  useEffect(() => {
    if (state.turnTimeLeft === 30 && state.isTimerRunning) {
      toast.warning('⏰ 30 seconds remaining!', {
        description: 'Time is running out for this turn'
      });
    } else if (state.turnTimeLeft === 10 && state.isTimerRunning) {
      toast.error('🚨 10 seconds left!', {
        description: 'Turn will end automatically soon'
      });
    } else if (state.turnTimeLeft === 0 && state.isTimerRunning) {
      toast.error('⏰ Time\'s up!', {
        description: 'Turn ended automatically'
      });
      nextTurn();
    }
  }, [state.turnTimeLeft, state.isTimerRunning, nextTurn]);

  return (
    <Card className="p-3 holographic border-primary/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Turn Timer</span>
        </div>
        <div className={`text-lg font-mono font-bold ${getTimerColor()}`}>
          {formatTime(state.turnTimeLeft)}
        </div>
      </div>

      <Progress 
        value={getProgressPercentage()} 
        className="h-2 mb-3"
        style={{
          background: 'hsl(var(--muted))'
        }}
      />

      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={state.isTimerRunning ? pauseTimer : startTimer}
            className="h-8 w-8 p-0"
          >
            {state.isTimerRunning ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTimer}
            className="h-8 w-8 p-0"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          {state.gamePhase} phase
        </div>
      </div>
    </Card>
  );
};