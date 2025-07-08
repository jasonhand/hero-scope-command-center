
import { useState, useEffect } from 'react';
import { GameHeader } from '../components/GameHeader';
import { MetricsDashboard } from '../components/MetricsDashboard';
import { HeroPanel } from '../components/HeroPanel';
import { ActionPanel } from '../components/ActionPanel';
import { AlertFeed } from '../components/AlertFeed';
import { StartScreen } from '../components/StartScreen';
import { OnboardingTour } from '../components/OnboardingTour';
import { GameProvider } from '../contexts/GameContext';

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
                <ActionPanel />
              </div>
              
              {/* Right Sidebar */}
              <div className="w-80 flex flex-col gap-4 min-h-0">
                <HeroPanel />
                <AlertFeed />
              </div>
            </div>

            {/* Onboarding Tour */}
            <OnboardingTour 
              isOpen={showOnboarding} 
              onClose={handleOnboardingComplete}
            />
          </div>
        </GameProvider>
      )}
    </div>
  );
};

export default Index;
