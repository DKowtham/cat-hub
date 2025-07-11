import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  "https://app.papernest.com/api/offer-catalog/staff/internal/energy-offers-list";
const TOKEN =
  process.env.ENERGY_API_TOKEN || process.env.APP_BACKEND_ENDPOINT_TOKEN;

const COUNTRY = "FRA";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Max-Age": "86400",
};

export async function GET(request: NextRequest) {
  try {
    // Validate that API token is available
    if (!TOKEN) {
      console.error("French Energy API Error: Missing API token");
      return NextResponse.json(
        {
          error: "API configuration error",
          details:
            "Missing ENERGY_API_TOKEN or APP_BACKEND_ENDPOINT_TOKEN environment variable",
          country: COUNTRY,
          endpoint: "French Energy API",
        },
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }

    const { searchParams } = new URL(request.url);

    // Get query parameters
    const params = new URLSearchParams();
    params.append("country", COUNTRY);
    params.append("energy_type", "electricity");
    params.append("scope__contains", "seo");

    // Pagination
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    params.append("page", page);
    params.append("limit", limit);

    // Filter types based on shell file
    const filterType = searchParams.get("filter_type") || "basic";

    switch (filterType) {
      case "green":
        params.append("has_green_energy", "true");
        break;
      case "papernest":
        params.append("sort_papernest_partner", "true");
        break;
      case "recommended":
        params.append("sort_papernest_partner", "true");
        params.set("limit", "3");
        break;
      case "basic":
      default:
        // No additional filters for basic
        break;
    }

    // Additional filters from shell file
    const greenEnergy = searchParams.get("has_green_energy");
    if (greenEnergy === "true") {
      params.append("has_green_energy", "true");
    }

    const sortPapernest = searchParams.get("sort_papernest_partner");
    if (sortPapernest === "true") {
      params.append("sort_papernest_partner", "true");
    }

    // Provider filtering
    const provider = searchParams.get("provider");
    if (provider && provider !== "all") {
      params.append("provider", provider);
    }

    // Power rating filtering
    const powerRating = searchParams.get("power_rating");
    if (powerRating) {
      params.append("power_rating", powerRating);
    }

    // Tariff type filtering
    const tariffType = searchParams.get("tariff_type");
    if (tariffType) {
      params.append("tariff_type__in", tariffType);
    }

    // Handle providers endpoint
    const route = searchParams.get("route");
    let endpoint = API_BASE;

    if (route === "providers") {
      endpoint = `${API_BASE}/providers`;
      // Remove offer-specific parameters for providers endpoint
      const providerParams = new URLSearchParams();
      providerParams.append("country", COUNTRY);

      const url = `${endpoint}/?${providerParams.toString()}`;

      console.log("Making French Providers API call to:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Token ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      return NextResponse.json(data, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Make API call for offers
    const url = `${endpoint}/?${params.toString()}`;

    console.log("Making French Offers API call to:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("French Energy API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch French energy data",
        details: error instanceof Error ? error.message : "Unknown error",
        country: COUNTRY,
        endpoint: "French Energy API",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}
