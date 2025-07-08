
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { generateCityMetrics, generateAlerts } from '../utils/dataGeneration';

interface GameState {
  turn: number;
  score: number;
  investigationTokens: number;
  heroes: any[];
  cityMetrics: any[];
  alerts: any[];
  gamePhase: 'monitoring' | 'investigation' | 'deployment' | 'resolution';
  selectedMetrics: string[];
  deployedHeroes: any[];
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  turnTimeLeft: number;
  maxTurnTime: number;
  isTimerRunning: boolean;
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<any>;
  startInvestigation: (metricId: string) => void;
  deployHero: (heroId: string, zone: string) => void;
  nextTurn: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const initialState: GameState = {
  turn: 1,
  score: 0,
  investigationTokens: 3,
  heroes: [],
  cityMetrics: [],
  alerts: [],
  gamePhase: 'monitoring',
  selectedMetrics: [],
  deployedHeroes: [],
  threatLevel: 'low',
  turnTimeLeft: 120, // 2 minutes per turn
  maxTurnTime: 120,
  isTimerRunning: false
};

const gameReducer = (state: GameState, action: any): GameState => {
  switch (action.type) {
    case 'SET_HEROES':
      return { ...state, heroes: action.payload };
    case 'SET_METRICS':
      return { ...state, cityMetrics: action.payload };
    case 'SET_ALERTS':
      return { ...state, alerts: action.payload };
    case 'USE_INVESTIGATION_TOKEN':
      return { 
        ...state, 
        investigationTokens: Math.max(0, state.investigationTokens - 1),
        selectedMetrics: [...state.selectedMetrics, action.payload]
      };
    case 'DEPLOY_HERO':
      return {
        ...state,
        deployedHeroes: [...state.deployedHeroes, action.payload]
      };
    case 'NEXT_TURN':
      return {
        ...state,
        turn: state.turn + 1,
        investigationTokens: 3,
        selectedMetrics: [],
        deployedHeroes: [],
        gamePhase: 'monitoring',
        turnTimeLeft: state.maxTurnTime,
        isTimerRunning: false
      };
    case 'SET_PHASE':
      return { ...state, gamePhase: action.payload };
    case 'UPDATE_SCORE':
      return { ...state, score: state.score + action.payload };
    case 'SET_THREAT_LEVEL':
      return { ...state, threatLevel: action.payload };
    case 'START_TIMER':
      return { ...state, isTimerRunning: true };
    case 'PAUSE_TIMER':
      return { ...state, isTimerRunning: false };
    case 'RESET_TIMER':
      return { ...state, turnTimeLeft: state.maxTurnTime, isTimerRunning: false };
    case 'TICK_TIMER':
      return { 
        ...state, 
        turnTimeLeft: Math.max(0, state.turnTimeLeft - 1),
        isTimerRunning: state.turnTimeLeft > 1 ? state.isTimerRunning : false
      };
    default:
      return state;
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.isTimerRunning && state.turnTimeLeft > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isTimerRunning, state.turnTimeLeft]);

  useEffect(() => {
    // Initialize game data
    const initializeGame = async () => {
      try {
        // Fetch heroes from SuperHero API
        const heroResponse = await fetch('https://akabab.github.io/superhero-api/api/all.json');
        const heroData = await heroResponse.json();
        
        // Select random heroes for this session
        const selectedHeroes = heroData
          .sort(() => Math.random() - 0.5)
          .slice(0, 12)
          .map((hero: any) => ({
            id: hero.id,
            name: hero.name,
            image: hero.images?.md || hero.images?.sm,
            powerstats: hero.powerstats,
            biography: hero.biography,
            appearance: hero.appearance,
            work: hero.work,
            connections: hero.connections,
            available: true,
            cooldown: 0
          }));

        dispatch({ type: 'SET_HEROES', payload: selectedHeroes });

        // Generate initial city metrics
        const metrics = generateCityMetrics(selectedHeroes);
        dispatch({ type: 'SET_METRICS', payload: metrics });

        // Generate initial alerts
        const alerts = generateAlerts(metrics);
        dispatch({ type: 'SET_ALERTS', payload: alerts });

      } catch (error) {
        console.error('Failed to initialize game:', error);
        // Fallback to mock data
        const mockHeroes = Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          name: `Hero ${i + 1}`,
          image: `https://picsum.photos/100/100?random=${i}`,
          powerstats: {
            intelligence: Math.floor(Math.random() * 100),
            strength: Math.floor(Math.random() * 100),
            speed: Math.floor(Math.random() * 100),
            durability: Math.floor(Math.random() * 100),
            power: Math.floor(Math.random() * 100),
            combat: Math.floor(Math.random() * 100)
          },
          available: true,
          cooldown: 0
        }));
        
        dispatch({ type: 'SET_HEROES', payload: mockHeroes });
        const metrics = generateCityMetrics(mockHeroes);
        dispatch({ type: 'SET_METRICS', payload: metrics });
        const alerts = generateAlerts(metrics);
        dispatch({ type: 'SET_ALERTS', payload: alerts });
      }
    };

    initializeGame();
  }, []);

  const startInvestigation = (metricId: string) => {
    if (state.investigationTokens > 0) {
      dispatch({ type: 'USE_INVESTIGATION_TOKEN', payload: metricId });
    }
  };

  const deployHero = (heroId: string, zone: string) => {
    const hero = state.heroes.find(h => h.id === heroId);
    if (hero && hero.available) {
      dispatch({ 
        type: 'DEPLOY_HERO', 
        payload: { heroId, zone, hero } 
      });
    }
  };

  const nextTurn = () => {
    // Generate new metrics and alerts for next turn
    const metrics = generateCityMetrics(state.heroes);
    const alerts = generateAlerts(metrics);
    
    dispatch({ type: 'SET_METRICS', payload: metrics });
    dispatch({ type: 'SET_ALERTS', payload: alerts });
    dispatch({ type: 'NEXT_TURN' });
  };

  const startTimer = () => {
    dispatch({ type: 'START_TIMER' });
  };

  const pauseTimer = () => {
    dispatch({ type: 'PAUSE_TIMER' });
  };

  const resetTimer = () => {
    dispatch({ type: 'RESET_TIMER' });
  };

  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      startInvestigation,
      deployHero,
      nextTurn,
      startTimer,
      pauseTimer,
      resetTimer
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
