'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { GitBranch, Server, Rocket } from 'lucide-react';

interface DeployConfig {
  appType: 'spring' | 'next';
  gitUrl: string;
  branch: string;
  envType: string;
  version: string;
  buildCommand: string;
  envVars: string;
}

export function DeploymentForm() {
  const [deployConfig, setDeployConfig] = useState<DeployConfig>({
    appType: 'spring',
    gitUrl: '',
    branch: 'main',
    envType: 'development',
    version: '',
    buildCommand: '',
    envVars: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle deployment logic
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          Deploy Application
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Application Type */}
          <div className="space-y-2">
            <Label>Application Type</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`p-4 border rounded-lg text-center hover:border-blue-500 transition-colors ${
                  deployConfig.appType === 'spring' ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setDeployConfig({ ...deployConfig, appType: 'spring' })}
              >
                <Server className="w-6 h-6 mx-auto mb-2" />
                Spring Boot
              </button>
              <button
                type="button"
                className={`p-4 border rounded-lg text-center hover:border-blue-500 transition-colors ${
                  deployConfig.appType === 'next' ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setDeployConfig({ ...deployConfig, appType: 'next' })}
              >
                <img src="/images/nextjs-icon.svg" alt="Next.js" className="w-6 h-6 mx-auto mb-2" />
                Next.js
              </button>
            </div>
          </div>

          {/* Source Control */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gitUrl" className="flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Git Repository URL
              </Label>
              <Input
                id="gitUrl"
                placeholder="https://github.com/username/repo.git"
                value={deployConfig.gitUrl}
                onChange={(e) => setDeployConfig({ ...deployConfig, gitUrl: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  placeholder="main"
                  value={deployConfig.branch}
                  onChange={(e) => setDeployConfig({ ...deployConfig, branch: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="envType">Environment</Label>
                <select
                  id="envType"
                  className="w-full h-9 rounded-md border border-input px-3"
                  value={deployConfig.envType}
                  onChange={(e) => setDeployConfig({ ...deployConfig, envType: e.target.value })}
                >
                  <option value="development">Development</option>
                  <option value="staging">Staging</option>
                  <option value="production">Production</option>
                </select>
              </div>
            </div>
          </div>

          {/* Build Configuration */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="version">
                {deployConfig.appType === 'spring' ? 'Java Version' : 'Node Version'}
              </Label>
              <select
                id="version"
                className="w-full h-9 rounded-md border border-input px-3"
                value={deployConfig.version}
                onChange={(e) => setDeployConfig({ ...deployConfig, version: e.target.value })}
              >
                {deployConfig.appType === 'spring' ? (
                  <>
                    <option value="17">Java 17 (LTS)</option>
                    <option value="11">Java 11 (LTS)</option>
                    <option value="8">Java 8</option>
                  </>
                ) : (
                  <>
                    <option value="20">Node 20 (LTS)</option>
                    <option value="18">Node 18</option>
                    <option value="16">Node 16</option>
                  </>
                )}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="buildCommand">Build Command (Optional)</Label>
              <Input
                id="buildCommand"
                placeholder={deployConfig.appType === 'spring' ? './gradlew build' : 'npm run build'}
                value={deployConfig.buildCommand}
                onChange={(e) => setDeployConfig({ ...deployConfig, buildCommand: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="envVars">Environment Variables</Label>
              <textarea
                id="envVars"
                className="w-full h-24 rounded-md border border-input p-2 font-mono text-sm"
                placeholder="DATABASE_URL=jdbc:mysql://localhost:3306/db&#10;API_KEY=your-api-key"
                value={deployConfig.envVars}
                onChange={(e) => setDeployConfig({ ...deployConfig, envVars: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Rocket className="w-4 h-4 mr-2" />
            Deploy Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}