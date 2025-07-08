import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  Activity, 
  Zap, 
  AlertTriangle,
  Search,
  Users,
  Target
} from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const onboardingSteps = [
  {
    title: "Welcome to HeroScope",
    content: "You're the commander of a superhero response team protecting a futuristic city. Monitor threats, deploy heroes, and keep the city safe!",
    icon: Shield,
    highlight: null
  },
  {
    title: "City Metrics Dashboard", 
    content: "These cards show real-time city data: crime levels, power grid status, emergency calls, and more. Watch for unusual patterns that might indicate threats.",
    icon: Activity,
    highlight: "metrics"
  },
  {
    title: "Investigate Anomalies",
    content: "Click 'INVESTIGATE' on suspicious metrics to analyze them deeper. You have limited investigation tokens, so use them wisely!",
    icon: Search,
    highlight: "investigate"
  },
  {
    title: "Hero Roster",
    content: "Your available heroes with their power stats. Each hero has unique abilities - some are better for certain types of threats.",
    icon: Users,
    highlight: "heroes"
  },
  {
    title: "Deploy Heroes",
    content: "When you detect a threat, deploy heroes to different city zones. Match hero strengths to threat types for maximum effectiveness.",
    icon: Target,
    highlight: "deploy"
  },
  {
    title: "Action Panel",
    content: "Use emergency protocols when needed: City-wide alerts, evacuation orders, or request backup. Each action has consequences!",
    icon: AlertTriangle,
    highlight: "actions"
  },
  {
    title: "Alert Feed",
    content: "Stay informed with real-time city alerts. This helps you understand what's happening and plan your response strategy.",
    icon: Zap,
    highlight: "alerts"
  },
  {
    title: "Your Mission",
    content: "Keep the city safe by monitoring metrics, investigating threats, and deploying heroes strategically. Good luck, Commander!",
    icon: Shield,
    highlight: null
  }
];

export const OnboardingTour = ({ isOpen, onClose }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const currentStepData = onboardingSteps[currentStep];
  const IconComponent = currentStepData.icon;

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Card className="w-full max-w-md holographic border-primary/50">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <IconComponent className="w-6 h-6 text-primary glow" />
                <Badge variant="outline" className="text-xs">
                  {currentStep + 1} of {onboardingSteps.length}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipTour}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">
                {currentStepData.title}
              </h3>
              
              <p className="text-foreground leading-relaxed">
                {currentStepData.content}
              </p>

              {/* Highlight indicator */}
              {currentStepData.highlight && (
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-sm text-primary font-medium">
                    💡 Look for: <span className="font-mono">{currentStepData.highlight}</span> elements on the dashboard
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="flex space-x-1">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                className="flex items-center space-x-2 glow-pulse"
              >
                <span>{currentStep === onboardingSteps.length - 1 ? 'Start Mission' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Skip option */}
            {currentStep > 0 && currentStep < onboardingSteps.length - 1 && (
              <div className="text-center mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipTour}
                  className="text-muted-foreground hover:text-foreground text-xs"
                >
                  Skip tutorial
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};