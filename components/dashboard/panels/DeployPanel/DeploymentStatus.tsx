'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface DeploymentStatusProps {
  status: 'deploying' | 'success' | null;
  progress: number;
}

export function DeploymentStatus({ status, progress }: DeploymentStatusProps) {
  if (!status) return null;

  return (
    <Card>
      <CardContent className="pt-6">
        {status === 'deploying' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Deployment in progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="space-y-2 mt-4">
              {[
                'Cloning repository',
                'Installing dependencies',
                'Building application',
                'Running tests',
                'Deploying'
              ].map((step, index) => (
                <div key={step} className="flex items-center gap-2 text-sm">
                  {index * 20 < progress ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                  )}
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {status === 'success' && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Deployment Successful</AlertTitle>
            <AlertDescription className="text-green-700">
              Your application is now live at: 
              <a href="#" className="flex items-center gap-1 text-green-600 hover:underline mt-1">
                https://your-app.example.com
                <ArrowRight className="w-4 h-4" />
              </a>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}