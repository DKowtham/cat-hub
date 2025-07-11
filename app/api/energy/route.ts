import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  process.env.ENERGY_API_BASE_URL ||
  "https://app.papernest.com/api/offer-catalog/staff/internal/energy-offers-list";
const TOKEN =
  process.env.ENERGY_API_TOKEN || process.env.APP_BACKEND_ENDPOINT_TOKEN || "";

// CORS headers configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Max-Age": "86400",
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get all query parameters
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    // Determine the endpoint based on the route parameter
    const route = searchParams.get("route");
    let endpoint = API_BASE;

    if (route === "providers") {
      endpoint = `${API_BASE}/providers`;
    }

    // Remove the route parameter from the params to send to the API
    params.delete("route");

    // Make the API call
    const url = `${endpoint}/?${params.toString()}`;
    console.log("Making API call to:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from energy API" },
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
