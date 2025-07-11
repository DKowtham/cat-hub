import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  "https://app.papernest.com/api/offer-catalog/staff/internal/energy-offers-list";
const TOKEN =
  process.env.ENERGY_API_TOKEN ||
  process.env.APP_BACKEND_ENDPOINT_TOKEN ||
  "4f513673dded1898fcc62a4f7ad19780f92bff4e2cb26e1a5f0abeafc9d6a32c";

const COUNTRY = "ITA";

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

    // Filter types based on Italian shell file
    const filterType = searchParams.get("filter_type") || "basic";

    switch (filterType) {
      case "green":
        params.append("has_green_energy", "true");
        break;
      case "fixed":
        params.append("tariff_type__in", "fixed_price");
        break;
      case "variable":
        params.append("tariff_type__in", "variable_price");
        break;
      case "indexed":
        params.append("tariff_type__in", "indexed_price");
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

    // Tariff type filtering (Italian specific)
    const tariffType = searchParams.get("tariff_type");
    if (tariffType) {
      params.append("tariff_type__in", tariffType);
    }

    // Provider filtering
    const provider = searchParams.get("provider");
    if (provider && provider !== "all") {
      params.append("provider", provider);
    }

    // Grid type filtering (Italian specific: fixed or pun_with_kwh_fee)
    const gridType = searchParams.get("grid_type");
    if (gridType) {
      params.append("grid_type", gridType);
    }

    // F-rate filtering (Italian specific: F0, F1, F2)
    const fRate = searchParams.get("f_rate");
    if (fRate) {
      params.append("f_rate", fRate);
    }

    // PUN-based offer filtering
    const punBased = searchParams.get("pun_based");
    if (punBased === "true") {
      params.append("pun_based", "true");
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

      console.log("Making Italian Providers API call to:", url);

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

    // Handle specific analysis endpoints (Italian specific)
    if (route === "price_summary") {
      const url = `${endpoint}/?${params.toString()}`;

      console.log("Making Italian Price Summary API call to:", url);

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

      // Process data for Italian price summary with F0/F1/F2 structure
      const processedData = {
        ...data,
        results: data.results?.map((offer: any) => ({
          name: offer.name,
          provider: offer.provider?.name,
          green_energy: offer.has_green_energy,
          tariff_type: offer.tariff_type,
          price_structure: offer.price?.elec_grids
            ? offer.price.elec_grids.fixed
              ? {
                  type: "fixed",
                  annual_price:
                    offer.price.elec_grids.fixed.annual_price_non_wht,
                  f0_price: offer.price.elec_grids.fixed.F0_non_wht,
                  f1_price: offer.price.elec_grids.fixed.F1_non_wht,
                  f2_price: offer.price.elec_grids.fixed.F2_non_wht,
                }
              : offer.price.elec_grids.pun_with_kwh_fee
              ? {
                  type: "pun_with_kwh_fee",
                  annual_price:
                    offer.price.elec_grids.pun_with_kwh_fee
                      .annual_price_non_wht,
                  f0_price: offer.price.elec_grids.pun_with_kwh_fee.F0_non_wht,
                  f1_price: offer.price.elec_grids.pun_with_kwh_fee.F1_non_wht,
                  f2_price: offer.price.elec_grids.pun_with_kwh_fee.F2_non_wht,
                }
              : { type: "unknown" }
            : { type: "no_data" },
        })),
      };

      return NextResponse.json(processedData, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Make API call for offers
    const url = `${endpoint}/?${params.toString()}`;

    console.log("Making Italian Offers API call to:", url);

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
    console.error("Italian Energy API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch Italian energy data",
        details: error instanceof Error ? error.message : "Unknown error",
        country: COUNTRY,
        endpoint: "Italian Energy API",
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
