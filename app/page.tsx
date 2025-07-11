import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllApiConfigs } from "@/lib/api-clients/config";
import {
  ExternalLink,
  Github,
  BookOpen,
  Zap,
  MapPin,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const apiConfigs = getAllApiConfigs();

  const getApiIcon = (apiId: string) => {
    switch (apiId) {
      case "french-energy-market":
        return <Zap className="h-8 w-8" style={{ color: "#1E90FF" }} />;
      case "italian-energy-market":
        return <MapPin className="h-8 w-8" style={{ color: "#FF4D4F" }} />;
      default:
        return <Globe className="h-8 w-8" style={{ color: "#13C2C2" }} />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "#FFFFFF" }}>
            CAT HUB - Energy Dashboard
          </h1>
          <p className="mt-2" style={{ color: "#A6A6A6" }}>
            Access and compare energy markets across France and Italy
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#A6A6A6" }}
                  >
                    Energy Markets
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {apiConfigs.length}
                  </p>
                </div>
                <div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: "rgba(30, 144, 255, 0.2)" }}
                >
                  <Zap className="h-6 w-6" style={{ color: "#1E90FF" }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#A6A6A6" }}
                  >
                    Total Endpoints
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {apiConfigs.reduce(
                      (sum, config) => sum + config.endpoints.length,
                      0
                    )}
                  </p>
                </div>
                <div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: "rgba(0, 208, 132, 0.2)" }}
                >
                  <ExternalLink
                    className="h-6 w-6"
                    style={{ color: "#00D084" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#A6A6A6" }}
                  >
                    Energy Providers
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    200+
                  </p>
                </div>
                <div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: "rgba(19, 194, 194, 0.2)" }}
                >
                  <Globe className="h-6 w-6" style={{ color: "#13C2C2" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Energy Markets Grid */}
        <div>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#FFFFFF" }}
          >
            Energy Markets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiConfigs.map((config) => (
              <Card
                key={config.id}
                className="hover:shadow-xl transition-all duration-200"
                style={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getApiIcon(config.id)}
                      <span className="ml-3">{config.name}</span>
                    </div>
                    <Badge variant="outline">
                      {config.endpoints.length} endpoints
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm" style={{ color: "#A6A6A6" }}>
                      {config.description}
                    </p>

                    <div className="text-xs" style={{ color: "#A6A6A6" }}>
                      <p className="font-medium" style={{ color: "#FFFFFF" }}>
                        Base URL:
                      </p>
                      <p className="font-mono break-all">
                        {config.baseURL || "Local API"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {config.endpoints.map((endpoint) => (
                        <Badge
                          key={endpoint.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {endpoint.method}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Link href={`/api-clients/${config.id}`}>
                        <Button className="w-full">Test Energy API</Button>
                      </Link>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <a
                            href={config.repositoryURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-1" />
                            Repo
                          </a>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <a
                            href={config.docsURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <BookOpen className="h-4 w-4 mr-1" />
                            Docs
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Energy Setup Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Market Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2" style={{ color: "#FFFFFF" }}>
                  Environment Variables
                </h4>
                <p className="text-sm mb-2" style={{ color: "#A6A6A6" }}>
                  Configure energy API access by creating a{" "}
                  <code
                    className="px-1 py-0.5 rounded"
                    style={{ backgroundColor: "#1A1A1A", color: "#1E90FF" }}
                  >
                    .env.local
                  </code>{" "}
                  file:
                </p>
                <div
                  className="p-4 rounded-md border"
                  style={{ backgroundColor: "#0D0D0D", borderColor: "#2E2E2E" }}
                >
                  <code
                    className="text-sm font-mono"
                    style={{ color: "#00D084" }}
                  >
                    {`# Energy API Configuration
ENERGY_API_TOKEN=your-energy-api-token
APP_BACKEND_ENDPOINT_TOKEN=your-backend-token

# Optional: Custom energy API URLs
NEXT_PUBLIC_FRENCH_ENERGY_API_URL=http://localhost:3000/api/energy/french
NEXT_PUBLIC_ITALIAN_ENERGY_API_URL=http://localhost:3000/api/energy/italian

# Repository URLs
NEXT_PUBLIC_ENERGY_REPO_URL=https://github.com/papernest/energy-comparator`}
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: "#FFFFFF" }}>
                  Available Markets
                </h4>
                <p className="text-sm" style={{ color: "#A6A6A6" }}>
                  Access comprehensive energy data for France and Italy with
                  filtering options for{" "}
                  <code
                    className="px-1 py-0.5 rounded"
                    style={{ backgroundColor: "#1A1A1A", color: "#13C2C2" }}
                  >
                    providers
                  </code>
                  ,{" "}
                  <code
                    className="px-1 py-0.5 rounded"
                    style={{ backgroundColor: "#1A1A1A", color: "#13C2C2" }}
                  >
                    green energy
                  </code>
                  , and{" "}
                  <code
                    className="px-1 py-0.5 rounded"
                    style={{ backgroundColor: "#1A1A1A", color: "#13C2C2" }}
                  >
                    pricing structures
                  </code>
                  .
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
