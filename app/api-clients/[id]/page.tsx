"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { EndpointTester } from "@/components/api-clients/endpoint-tester";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BaseApiClient } from "@/lib/api-clients/base";
import { getApiConfig } from "@/lib/api-clients/config";
import { useState, useEffect } from "react";
import { Github, BookOpen, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

interface ApiClientPageProps {
  params: Promise<{ id: string }>;
}

export default function ApiClientPage({ params }: ApiClientPageProps) {
  const [apiConfig, setApiConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEndpointId, setSelectedEndpointId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const resolvedParams = await params;
        const config = getApiConfig(resolvedParams.id);

        if (!config) {
          notFound();
          return;
        }

        setApiConfig(config);
      } catch (error) {
        console.error("Error loading API config:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, [params]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-300">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (!apiConfig) {
    return null;
  }

  const client = new BaseApiClient(apiConfig.config);
  const selectedEndpoint = selectedEndpointId
    ? apiConfig.endpoints.find((e) => e.id === selectedEndpointId)
    : null;

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-600 text-white";
      case "POST":
        return "bg-blue-600 text-white";
      case "PUT":
        return "bg-yellow-600 text-white";
      case "PATCH":
        return "bg-orange-600 text-white";
      case "DELETE":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{apiConfig.name}</h1>
            <p className="text-gray-300 mt-2">{apiConfig.description}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <a
                href={apiConfig.repositoryURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                Repository
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={apiConfig.docsURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Documentation
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-300">Base URL</p>
                <p className="font-mono text-sm text-white break-all">
                  {apiConfig.baseURL}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300">
                  Total Endpoints
                </p>
                <p className="text-sm text-white">
                  {apiConfig.endpoints.length}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300">Timeout</p>
                <p className="text-sm text-white">
                  {apiConfig.config.timeout}ms
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300">
                  Authentication
                </p>
                <p className="text-sm text-white">
                  {apiConfig.config.apiKey ? "API Key Configured" : "None"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Endpoints List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {apiConfig.endpoints.map((endpoint) => (
                    <button
                      key={endpoint.id}
                      onClick={() => setSelectedEndpointId(endpoint.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedEndpointId === endpoint.id
                          ? "border-orange-500 bg-orange-900/20"
                          : "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-white">
                          {endpoint.name}
                        </span>
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-300 mb-2">
                        {endpoint.description}
                      </p>
                      <code className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded">
                        {endpoint.path}
                      </code>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Endpoint Tester */}
          <div className="lg:col-span-2">
            {selectedEndpoint ? (
              <EndpointTester client={client} endpoint={selectedEndpoint} />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-gray-300">
                    <BookOpen className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2 text-white">
                      Select an Endpoint
                    </h3>
                    <p className="text-sm">
                      Choose an endpoint from the list on the left to start
                      testing
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
