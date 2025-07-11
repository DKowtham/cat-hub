"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  Github,
  ExternalLink,
  Code,
  BookOpen,
  Zap,
  MapPin,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllApiConfigs } from "@/lib/api-clients/config";

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: "CAT HUB",
    href: "/",
    icon: Home,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

// Helper function to get appropriate icons for energy markets
const getApiIcon = ({
  apiId,
  className,
}: {
  apiId: string;
  className?: string;
}) => {
  switch (apiId) {
    case "french-energy-market":
      return <Zap className={className} />;
    case "italian-energy-market":
      return <MapPin className={className} />;
    default:
      return <Globe className={className} />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const apiConfigs = getAllApiConfigs();

  return (
    <div
      className={cn("flex h-full w-64 flex-col", className)}
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div
        className="flex h-16 items-center justify-center border-b"
        style={{ borderColor: "#2E2E2E" }}
      >
        <h1 className="text-xl font-semibold" style={{ color: "#FFFFFF" }}>
          CAT HUB
        </h1>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {/* Main Navigation */}
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  isActive ? "" : "hover:bg-gray-700"
                )}
                style={{
                  backgroundColor: isActive ? "#1E90FF" : "transparent",
                  color: "#FFFFFF",
                }}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Energy Markets Section */}
        <div className="pt-6">
          <h2
            className="px-2 text-xs font-semibold uppercase tracking-wide"
            style={{ color: "#A6A6A6" }}
          >
            Energy Markets
          </h2>
          <div className="mt-2 space-y-1">
            {apiConfigs.map((apiConfig) => {
              const href = `/api-clients/${apiConfig.id}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={apiConfig.id}
                  href={href}
                  className={cn(
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                    isActive ? "" : "hover:bg-gray-700"
                  )}
                  style={{
                    backgroundColor: isActive ? "#1E90FF" : "transparent",
                    color: "#FFFFFF",
                  }}
                >
                  {getApiIcon({
                    apiId: apiConfig.id,
                    className: "mr-3 h-5 w-5",
                  })}
                  {apiConfig.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Documentation Links */}
        <div className="pt-6">
          <h2
            className="px-2 text-xs font-semibold uppercase tracking-wide"
            style={{ color: "#A6A6A6" }}
          >
            Documentation
          </h2>
          <div className="mt-2 space-y-1">
            {apiConfigs.map((apiConfig) => (
              <div key={`docs-${apiConfig.id}`} className="space-y-1">
                {/* GitHub Repository Link */}
                <a
                  href={apiConfig.repositoryURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
                  style={{ color: "#FFFFFF" }}
                >
                  <Github className="mr-3 h-4 w-4" />
                  <span className="truncate">{apiConfig.name} Repo</span>
                  <ExternalLink className="ml-auto h-3 w-3" />
                </a>

                {/* API Documentation Link */}
                <a
                  href={apiConfig.docsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
                  style={{ color: "#FFFFFF" }}
                >
                  <BookOpen className="mr-3 h-4 w-4" />
                  <span className="truncate">{apiConfig.name} Docs</span>
                  <ExternalLink className="ml-auto h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t p-4" style={{ borderColor: "#2E2E2E" }}>
        <div className="flex items-center">
          <Zap className="h-8 w-8" style={{ color: "#1E90FF" }} />
          <div className="ml-3">
            <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>
              CAT HUB
            </p>
            <p className="text-xs" style={{ color: "#A6A6A6" }}>
              v1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
