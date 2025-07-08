
import { useGame } from '../contexts/GameContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeroCard } from './HeroCard';
import { Users, Shield, Zap } from 'lucide-react';

export const HeroPanel = () => {
  const { state } = useGame();

  const availableHeroes = state.heroes.filter(hero => hero.available);
  const deployedHeroes = state.deployedHeroes;

  return (
    <Card className="p-4 holographic h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-primary">Hero Roster</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs border-success text-success">
            <Users className="w-3 h-3 mr-1" />
            {availableHeroes.length} Available
          </Badge>
          
          {deployedHeroes.length > 0 && (
            <Badge variant="outline" className="text-xs border-destructive text-destructive">
              <Zap className="w-3 h-3 mr-1" />
              {deployedHeroes.length} Deployed
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {state.heroes.slice(0, 8).map((hero) => (
          <HeroCard
            key={hero.id}
            hero={hero}
            isDeployed={deployedHeroes.some(d => d.heroId === hero.id)}
            onDeploy={(zone) => {
              if (hero.available) {
                state.dispatch({
                  type: 'DEPLOY_HERO',
                  payload: { heroId: hero.id, zone, hero }
                });
              }
            }}
          />
        ))}
      </div>

      {/* Deployment Summary */}
      {deployedHeroes.length > 0 && (
        <div className="mt-4 pt-4 border-t border-primary/20">
          <h4 className="text-sm font-semibold text-primary mb-2">
            Active Deployments
          </h4>
          <div className="space-y-2">
            {deployedHeroes.map((deployment, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{deployment.hero.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {deployment.zone}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-primary/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-lg font-bold text-primary font-mono">
              {state.heroes.reduce((sum, hero) => sum + (hero.powerstats?.power || 0), 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Power</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-secondary font-mono">
              {Math.round(state.heroes.reduce((sum, hero) => sum + (hero.powerstats?.intelligence || 0), 0) / state.heroes.length)}
            </div>
            <div className="text-xs text-muted-foreground">Avg Intelligence</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
