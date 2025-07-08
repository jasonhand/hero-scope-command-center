
import { useState, useEffect } from 'react';
import { GameHeader } from '../components/GameHeader';
import { MetricsDashboard } from '../components/MetricsDashboard';
import { HeroPanel } from '../components/HeroPanel';
import { ActionPanel } from '../components/ActionPanel';
import { AlertFeed } from '../components/AlertFeed';
import { TurnTimer } from '../components/TurnTimer';
import { StartScreen } from '../components/StartScreen';
import { OnboardingTour } from '../components/OnboardingTour';
import { GameProvider } from '../contexts/GameContext';
import { Toaster } from 'sonner';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Show onboarding when game starts for the first time
  useEffect(() => {
    if (gameStarted && !localStorage.getItem('heroScope-onboarding-completed')) {
      setShowOnboarding(true);
    }
  }, [gameStarted]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('heroScope-onboarding-completed', 'true');
  };

  const restartOnboarding = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!gameStarted ? (
        <StartScreen onStart={() => setGameStarted(true)} />
      ) : (
        <GameProvider>
          <div className="flex flex-col h-screen">
            <GameHeader onShowHelp={restartOnboarding} />
            
            <div className="flex flex-1 gap-4 p-4 overflow-auto">
              {/* Main Dashboard Area */}
              <div className="flex-1 flex flex-col gap-4 min-h-0">
                <MetricsDashboard />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <ActionPanel />
                  <TurnTimer />
                </div>
              </div>
              
              {/* Right Sidebar - Optimized for iPad */}
              <div className="w-80 lg:w-72 xl:w-80 flex flex-col gap-4 min-h-0">
                <HeroPanel />
                <AlertFeed />
              </div>
            </div>

            {/* Onboarding Tour */}
            <OnboardingTour 
              isOpen={showOnboarding} 
              onClose={handleOnboardingComplete}
            />

            {/* Toast Notifications */}
            <Toaster 
              position="top-right"
              expand={false}
              richColors
              closeButton
              toastOptions={{
                style: {
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(var(--foreground))'
                }
              }}
            />
          </div>
        </GameProvider>
      )}
    </div>
  );
};

export default Index;
