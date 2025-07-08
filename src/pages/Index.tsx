
import { useState, useEffect } from 'react';
import { GameHeader } from '../components/GameHeader';
import { MetricsDashboard } from '../components/MetricsDashboard';
import { HeroPanel } from '../components/HeroPanel';
import { ActionPanel } from '../components/ActionPanel';
import { AlertFeed } from '../components/AlertFeed';
import { StartScreen } from '../components/StartScreen';
import { GameProvider } from '../contexts/GameContext';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!gameStarted ? (
        <StartScreen onStart={() => setGameStarted(true)} />
      ) : (
        <GameProvider>
          <div className="flex flex-col h-screen">
            <GameHeader />
            
            <div className="flex flex-1 gap-4 p-4 overflow-hidden">
              {/* Main Dashboard Area */}
              <div className="flex-1 flex flex-col gap-4">
                <MetricsDashboard />
                <ActionPanel />
              </div>
              
              {/* Right Sidebar */}
              <div className="w-80 flex flex-col gap-4">
                <HeroPanel />
                <AlertFeed />
              </div>
            </div>
          </div>
        </GameProvider>
      )}
    </div>
  );
};

export default Index;
