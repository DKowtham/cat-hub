import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllApiConfigs } from "@/lib/api-clients/config";
import {
  Settings as SettingsIcon,
  ExternalLink,
  Github,
  BookOpen,
} from "lucide-react";

export default function Settings() {
  const apiConfigs = getAllApiConfigs();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your API client configurations and application settings
          </p>
        </div>

        {/* Application Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="mr-2 h-5 w-5" />
              Application Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Version</p>
                <p className="text-sm text-gray-900">1.0.0</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Framework</p>
                <p className="text-sm text-gray-900">Next.js 15</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Package Manager
                </p>
                <p className="text-sm text-gray-900">Bun</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Build Status
                </p>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Configurations */}
        <Card>
          <CardHeader>
            <CardTitle>API Configurations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiConfigs.map((config) => (
                <div key={config.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {config.name}
                    </h3>
                    <Badge variant="outline">
                      {config.endpoints.length} endpoints
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-600">Base URL</p>
                      <p className="text-gray-900 font-mono break-all">
                        {config.baseURL}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Timeout</p>
                      <p className="text-gray-900">{config.config.timeout}ms</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">
                        Authentication
                      </p>
                      <p className="text-gray-900">
                        {config.config.apiKey ? "API Key Configured" : "None"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Status</p>
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={config.repositoryURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Repository
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={config.docsURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BookOpen className="h-4 w-4 mr-1" />
                        Documentation
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuration Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Environment Variables</h4>
                <p className="text-sm text-gray-600 mb-3">
                  The following environment variables are being used:
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <code className="text-gray-700">
                        NEXT_PUBLIC_USER_API_URL
                      </code>
                      <span className="text-gray-500">
                        {process.env.NEXT_PUBLIC_USER_API_URL || "Not set"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <code className="text-gray-700">
                        NEXT_PUBLIC_POSTS_API_URL
                      </code>
                      <span className="text-gray-500">
                        {process.env.NEXT_PUBLIC_POSTS_API_URL || "Not set"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <code className="text-gray-700">
                        NEXT_PUBLIC_COMMENTS_API_URL
                      </code>
                      <span className="text-gray-500">
                        {process.env.NEXT_PUBLIC_COMMENTS_API_URL || "Not set"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Adding New APIs</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                  <li>
                    Edit{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">
                      lib/api-clients/config.ts
                    </code>
                  </li>
                  <li>
                    Add environment variables to{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">
                      .env.local
                    </code>
                  </li>
                  <li>
                    Update sidebar icons in{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">
                      components/layout/sidebar.tsx
                    </code>
                  </li>
                  <li>Restart the development server</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
