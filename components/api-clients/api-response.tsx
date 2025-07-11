"use client";

import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { JsonViewer } from "./json-viewer";
import {
  getStatusCodeColor,
  getStatusCodeBadgeColor,
  formatDate,
} from "@/lib/utils";
import { getStatusCodeCategory } from "@/types";
import type { ApiResponse as ApiResponseType } from "@/types";

interface ApiResponseProps {
  response: ApiResponseType;
  isLoading?: boolean;
  error?: any;
  startTime?: number;
  endTime?: number;
}

export const ApiResponse: React.FC<ApiResponseProps> = ({
  response,
  isLoading = false,
  error,
  startTime,
  endTime,
}) => {
  const [isHeadersCollapsed, setIsHeadersCollapsed] = useState(true);
  const responseTime = startTime && endTime ? endTime - startTime : null;

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300)
      return <CheckCircle className="h-5 w-5" style={{ color: "#00D084" }} />; // success green
    if (status >= 300 && status < 400)
      return <AlertCircle className="h-5 w-5" style={{ color: "#FADB14" }} />; // warning yellow
    if (status >= 400 && status < 500)
      return <XCircle className="h-5 w-5" style={{ color: "#FF4D4F" }} />; // danger red
    if (status >= 500)
      return <XCircle className="h-5 w-5" style={{ color: "#FF4D4F" }} />; // danger red
    return <AlertCircle className="h-5 w-5" style={{ color: "#13C2C2" }} />; // info cyan
  };

  const getStatusVariant = (status: number) => {
    if (status >= 200 && status < 300) return "success";
    if (status >= 300 && status < 400) return "warning";
    if (status >= 400 && status < 500) return "error";
    if (status >= 500) return "destructive";
    return "outline";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock
              className="mr-2 h-5 w-5 animate-spin"
              style={{ color: "#1E90FF" }}
            />
            <span style={{ color: "#FFFFFF" }}>Loading...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ color: "#A6A6A6" }}>Making API request...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <XCircle className="mr-2 h-5 w-5" style={{ color: "#FF4D4F" }} />
            <span style={{ color: "#FF4D4F" }}>Error</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div style={{ color: "#FF4D4F" }}>
              {error.message || "An error occurred"}
            </div>

            {error.status && (
              <div className="flex items-center space-x-2">
                <Badge variant="error">
                  {error.status} {error.statusText}
                </Badge>
                <span className="text-sm" style={{ color: "#A6A6A6" }}>
                  {getStatusCodeCategory(error.status)}
                </span>
              </div>
            )}

            {error.data && (
              <JsonViewer
                data={error.data}
                title="Error Details"
                className="border-red-600"
              />
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Response Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              {getStatusIcon(response.status)}
              <span className="ml-2" style={{ color: "#FFFFFF" }}>
                Response Status
              </span>
            </div>
            {responseTime && (
              <div
                className="flex items-center text-sm"
                style={{ color: "#A6A6A6" }}
              >
                <Clock className="mr-1 h-4 w-4" />
                {responseTime}ms
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Badge variant={getStatusVariant(response.status)}>
              {response.status} {response.statusText}
            </Badge>
            <span className="text-sm" style={{ color: "#A6A6A6" }}>
              {getStatusCodeCategory(response.status)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Response Headers */}
      {response.headers && Object.keys(response.headers).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsHeadersCollapsed(!isHeadersCollapsed)}
              style={{ color: "#FFFFFF" }}
            >
              <span>Response Headers</span>
              <div className="flex items-center">
                <span className="text-sm mr-2" style={{ color: "#A6A6A6" }}>
                  {Object.keys(response.headers).length} headers
                </span>
                {isHeadersCollapsed ? (
                  <ChevronRight
                    className="h-4 w-4"
                    style={{ color: "#A6A6A6" }}
                  />
                ) : (
                  <ChevronDown
                    className="h-4 w-4"
                    style={{ color: "#A6A6A6" }}
                  />
                )}
              </div>
            </CardTitle>
          </CardHeader>
          {!isHeadersCollapsed && (
            <CardContent>
              <div className="space-y-2">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="font-medium" style={{ color: "#FFFFFF" }}>
                      {key}:
                    </span>
                    <span className="font-mono" style={{ color: "#A6A6A6" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Response Data */}
      <JsonViewer
        data={response.data}
        title="Response Data"
        style={{
          borderColor: "#00D084", // success green border for successful response
        }}
      />
    </div>
  );
};
