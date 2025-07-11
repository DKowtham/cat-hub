"use client";

import React, { useState } from "react";
import { Play, FileText, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApiResponse } from "./api-response";
import { BaseApiClient } from "@/lib/api-clients/base";
import type { ApiEndpoint } from "@/types";

interface EndpointTesterProps {
  client: BaseApiClient;
  endpoint: ApiEndpoint;
}

export const EndpointTester: React.FC<EndpointTesterProps> = ({
  client,
  endpoint,
}) => {
  // Initialize query parameters with default values
  const initializeQueryParams = () => {
    const initialParams: Record<string, string> = {};
    endpoint.queryParams?.forEach((param) => {
      if (param.defaultValue !== undefined) {
        initialParams[param.name] = String(param.defaultValue);
      }
    });
    return initialParams;
  };

  const [queryParams, setQueryParams] = useState<Record<string, string>>(
    initializeQueryParams()
  );
  const [bodyParams, setBodyParams] = useState<string>("");
  const [pathParams, setPathParams] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const handleQueryParamChange = (key: string, value: string) => {
    setQueryParams((prev) => ({ ...prev, [key]: value }));
  };

  const handlePathParamChange = (key: string, value: string) => {
    setPathParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleExecute = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setStartTime(Date.now());

    try {
      let parsedBodyParams = undefined;

      if (bodyParams.trim()) {
        try {
          parsedBodyParams = JSON.parse(bodyParams);
        } catch (e) {
          throw new Error("Invalid JSON in request body");
        }
      }

      const result = await client.executeEndpoint(endpoint, {
        queryParams:
          Object.keys(queryParams).length > 0 ? queryParams : undefined,
        bodyParams: parsedBodyParams,
        pathParams: Object.keys(pathParams).length > 0 ? pathParams : undefined,
      });

      setResponse(result);
      setEndTime(Date.now());
    } catch (err) {
      setError(err);
      setEndTime(Date.now());
    } finally {
      setIsLoading(false);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-white";
      case "POST":
        return "text-white";
      case "PUT":
        return "text-white";
      case "PATCH":
        return "text-white";
      case "DELETE":
        return "text-white";
      default:
        return "text-white";
    }
  };

  const getMethodBgColor = (method: string) => {
    switch (method) {
      case "GET":
        return "#00D084"; // success green
      case "POST":
        return "#1E90FF"; // primary blue
      case "PUT":
        return "#FADB14"; // warning yellow
      case "PATCH":
        return "#13C2C2"; // info cyan
      case "DELETE":
        return "#FF4D4F"; // danger red
      default:
        return "#1A1A1A"; // panel color
    }
  };

  // Extract path parameters from endpoint path
  const pathParamNames = (endpoint.path.match(/\{([^}]+)\}/g) || []).map(
    (match) => match.slice(1, -1)
  );

  return (
    <div className="space-y-6">
      {/* Endpoint Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              {endpoint.name}
            </div>
            <Badge
              className={getMethodColor(endpoint.method)}
              style={{ backgroundColor: getMethodBgColor(endpoint.method) }}
            >
              {endpoint.method}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2" style={{ color: "#A6A6A6" }}>
                Description
              </p>
              <p style={{ color: "#FFFFFF" }}>{endpoint.description}</p>
            </div>

            <div>
              <p className="text-sm mb-2" style={{ color: "#A6A6A6" }}>
                Path
              </p>
              <code
                className="px-2 py-1 rounded text-sm font-mono"
                style={{
                  backgroundColor: "#0D0D0D", // ultra dark background for code
                  color: "#FFFFFF", // text primary for code
                  border: `1px solid #2E2E2E`, // border color
                }}
              >
                {endpoint.path}
              </code>
            </div>

            {endpoint.requiresAuth && (
              <div>
                <Badge variant="outline">Requires Authentication</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings2 className="mr-2 h-5 w-5" />
            Parameters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Path Parameters */}
            {pathParamNames.length > 0 && (
              <div>
                <h4 className="font-medium mb-3" style={{ color: "#FFFFFF" }}>
                  Path Parameters
                </h4>
                <div className="space-y-3">
                  {pathParamNames.map((paramName) => (
                    <div key={paramName}>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: "#A6A6A6" }}
                      >
                        {paramName}
                      </label>
                      <Input
                        value={pathParams[paramName] || ""}
                        onChange={(e) =>
                          handlePathParamChange(paramName, e.target.value)
                        }
                        placeholder={`Enter ${paramName}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Query Parameters */}
            {endpoint.queryParams && endpoint.queryParams.length > 0 && (
              <div>
                <h4 className="font-medium mb-3" style={{ color: "#FFFFFF" }}>
                  Query Parameters
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {endpoint.queryParams.map((param) => (
                    <div key={param.name} className="space-y-2">
                      <label
                        className="block text-sm font-medium"
                        style={{ color: "#A6A6A6" }}
                      >
                        {param.name}
                        {param.required && (
                          <span style={{ color: "#FF4D4F" }} className="ml-1">
                            *
                          </span>
                        )}
                      </label>
                      {param.enum && param.enum.length > 0 ? (
                        <Select
                          value={queryParams[param.name] || ""}
                          onChange={(e) =>
                            handleQueryParamChange(param.name, e.target.value)
                          }
                          options={param.enum.map((value) => ({
                            value,
                            label:
                              value.charAt(0).toUpperCase() +
                              value.slice(1).replace(/_/g, " "),
                          }))}
                          placeholder={
                            param.description || `Select ${param.name}`
                          }
                        />
                      ) : (
                        <Input
                          value={queryParams[param.name] || ""}
                          onChange={(e) =>
                            handleQueryParamChange(param.name, e.target.value)
                          }
                          placeholder={
                            param.description || `Enter ${param.name}`
                          }
                          type={param.type === "number" ? "number" : "text"}
                        />
                      )}
                      {param.description && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#A6A6A6" }}
                        >
                          {param.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Body Parameters */}
            {endpoint.bodyParams && endpoint.bodyParams.length > 0 && (
              <div>
                <h4 className="font-medium mb-3" style={{ color: "#FFFFFF" }}>
                  Request Body (JSON)
                </h4>
                <Textarea
                  value={bodyParams}
                  onChange={(e) => setBodyParams(e.target.value)}
                  placeholder={`{
  ${endpoint.bodyParams
    .map(
      (param) =>
        `"${param.name}": "${
          param.type === "string"
            ? "value"
            : param.type === "number"
            ? 0
            : "value"
        }"`
    )
    .join(",\n  ")}
}`}
                  rows={Math.min(10, endpoint.bodyParams.length + 2)}
                  className="font-mono text-sm"
                />
                <div className="mt-2 text-xs" style={{ color: "#A6A6A6" }}>
                  <p style={{ color: "#FFFFFF" }}>Required fields:</p>
                  <ul className="list-disc list-inside">
                    {endpoint.bodyParams
                      .filter((param) => param.required)
                      .map((param) => (
                        <li key={param.name}>
                          <span className="font-medium">{param.name}</span> (
                          {param.type})
                          {param.description && ` - ${param.description}`}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Execute Button */}
            <Button
              onClick={handleExecute}
              disabled={isLoading}
              className="w-full"
            >
              <Play className="mr-2 h-4 w-4" />
              {isLoading ? "Executing..." : "Execute Request"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Response */}
      {(response || error || isLoading) && (
        <ApiResponse
          response={response}
          isLoading={isLoading}
          error={error}
          startTime={startTime || undefined}
          endTime={endTime || undefined}
        />
      )}
    </div>
  );
};
