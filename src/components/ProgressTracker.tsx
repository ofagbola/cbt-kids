import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getProgress, CBTJourney, getJourneys } from '@/lib/storage';

interface ProgressTrackerProps {
  className?: string;
  showDetails?: boolean;
}

export default function ProgressTracker({ className, showDetails = false }: ProgressTrackerProps) {
  const [progress, setProgress] = useState(getProgress());
  const [recentJourneys, setRecentJourneys] = useState<CBTJourney[]>([]);

  useEffect(() => {
    // Refresh progress data
    setProgress(getProgress());
    
    if (showDetails) {
      const journeys = getJourneys();
      setRecentJourneys(journeys.slice(-3).reverse()); // Show last 3 journeys
    }
  }, [showDetails]);

  const completionRate = progress.totalJourneys > 0 
    ? Math.round((progress.completedJourneys / progress.totalJourneys) * 100)
    : 0;

  return (
    <Card className={`bg-card border-border ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {progress.completedJourneys}
            </div>
            <div className="text-sm text-muted-foreground">
              Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {progress.totalJourneys}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Sessions
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-body font-semibold">Completion Rate</span>
            <span className="font-heading font-bold text-primary">{completionRate}%</span>
          </div>
          <Progress 
            value={completionRate} 
            className="h-3 bg-primary/20"
          />
        </div>

        {/* Achievement Badges */}
        <div className="flex flex-wrap gap-2">
          {progress.completedJourneys >= 1 && (
            <Badge variant="secondary" className="bg-primary/20 text-primary font-body">
              First Journey
            </Badge>
          )}
          {progress.completedJourneys >= 5 && (
            <Badge variant="secondary" className="bg-accent/20 text-accent font-body">
              CBT Explorer
            </Badge>
          )}
          {progress.completedJourneys >= 10 && (
            <Badge variant="secondary" className="bg-secondary/20 text-secondary font-body">
              CBT Master
            </Badge>
          )}
        </div>

        {/* Recent Journeys */}
        {showDetails && recentJourneys.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-lg text-primary">
              Recent Adventures
            </h4>
            <div className="space-y-2">
              {recentJourneys.map((journey) => (
                <div 
                  key={journey.id}
                  className="bg-card/50 p-3 rounded-lg border border-border"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-body font-semibold text-sm text-foreground">
                        "{journey.problem}"
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {journey.timestamp.toLocaleDateString()} • {journey.feeling} feeling
                      </p>
                    </div>
                    {journey.completed && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        ✅ Complete
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorite Strategies */}
        {progress.favoriteStrategies.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-lg text-primary">
              Your Favorite Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {progress.favoriteStrategies.slice(0, 3).map((strategy, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="bg-accent/10 text-accent border-accent/30 font-body text-xs"
                >
                  {strategy}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Encouragement Message */}
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <p className="text-sm font-body text-center text-primary font-semibold">
            {progress.completedJourneys === 0 
              ? "Ready for your first CBT adventure?"
              : progress.completedJourneys < 3
              ? "You're doing great! Keep exploring!"
              : "You're becoming a CBT expert! Amazing work!"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}