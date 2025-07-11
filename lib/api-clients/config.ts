import type { ApiClientInfo } from "@/types";

// Energy API Configuration
export const apiConfigs: ApiClientInfo[] = [
  {
    id: "french-energy-market",
    name: "French Energy Market",
    description:
      "Access French energy market data with comprehensive filtering options",
    baseURL: "",
    repositoryURL: "https://github.com/papernest/energy-comparator",
    docsURL: "https://docs.papernest.com/energy",
    config: {
      baseURL: "",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    endpoints: [
      {
        id: "french-energy-offers",
        name: "French Energy Offers",
        description:
          "Get energy offers from French providers with advanced filtering",
        method: "GET",
        path: "/api/energy/french",
        requiresAuth: false,
        queryParams: [
          {
            name: "filter_type",
            type: "string",
            required: false,
            description: "Filter type for French market",
            defaultValue: "basic",
            enum: ["basic", "green", "papernest", "recommended"],
          },
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number for pagination",
            defaultValue: 1,
            enum: ["1", "2", "3", "4", "5"],
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Number of results per page",
            defaultValue: 10,
            enum: ["5", "10", "20", "50"],
          },
          {
            name: "has_green_energy",
            type: "boolean",
            required: false,
            description: "Filter for green energy offers only",
            enum: ["true", "false"],
          },
          {
            name: "sort_papernest_partner",
            type: "boolean",
            required: false,
            description: "Sort by Papernest partner priority",
            enum: ["true", "false"],
          },
          {
            name: "provider",
            type: "string",
            required: false,
            description: "Provider filter",
            defaultValue: "all",
            enum: [
              "all",
              "engie",
              "edf",
              "totalenergies",
              "enercoop",
              "papernest",
              "ekwateur",
              "octopus",
              "vattenfall",
              "mint",
              "ilek",
            ],
          },
          {
            name: "power_rating",
            type: "string",
            required: false,
            description: "Power rating in kVA (French grid)",
            enum: ["3", "6", "9", "12", "15", "18", "24", "36"],
          },
          {
            name: "tariff_type",
            type: "string",
            required: false,
            description: "Tariff type filter",
            enum: ["fixed_price", "indexed_price", "variable_price"],
          },
        ],
      },
      {
        id: "french-energy-providers",
        name: "French Energy Providers",
        description: "Get list of available French energy providers",
        method: "GET",
        path: "/api/energy/french",
        requiresAuth: false,
        queryParams: [
          {
            name: "route",
            type: "string",
            required: true,
            description: "Route type",
            defaultValue: "providers",
            enum: ["providers"],
          },
        ],
      },
    ],
  },
  {
    id: "italian-energy-market",
    name: "Italian Energy Market",
    description:
      "Access Italian energy market data with F0/F1/F2 pricing and PUN-based offers",
    baseURL: "",
    repositoryURL: "https://github.com/papernest/energy-comparator",
    docsURL: "https://docs.papernest.com/energy",
    config: {
      baseURL: "",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    endpoints: [
      {
        id: "italian-energy-offers",
        name: "Italian Energy Offers",
        description:
          "Get energy offers from Italian providers with F0/F1/F2 pricing",
        method: "GET",
        path: "/api/energy/italian",
        requiresAuth: false,
        queryParams: [
          {
            name: "filter_type",
            type: "string",
            required: false,
            description: "Filter type for Italian market",
            defaultValue: "basic",
            enum: ["basic", "green", "fixed", "variable", "indexed"],
          },
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number for pagination",
            defaultValue: 1,
            enum: ["1", "2", "3", "4", "5"],
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Number of results per page",
            defaultValue: 10,
            enum: ["5", "10", "20", "50"],
          },
          {
            name: "has_green_energy",
            type: "boolean",
            required: false,
            description: "Filter for green energy offers only",
            enum: ["true", "false"],
          },
          {
            name: "tariff_type",
            type: "string",
            required: false,
            description: "Tariff type filter (Italian specific)",
            enum: ["fixed_price", "indexed_price", "variable_price"],
          },
          {
            name: "provider",
            type: "string",
            required: false,
            description: "Provider filter",
            defaultValue: "all",
            enum: [
              "all",
              "enel",
              "eni",
              "edison",
              "acea",
              "a2a",
              "hera",
              "iren",
              "sorgenia",
              "green_network",
              "plenitude",
            ],
          },
          {
            name: "grid_type",
            type: "string",
            required: false,
            description: "Grid type (Italian specific)",
            enum: ["fixed", "pun_with_kwh_fee"],
          },
          {
            name: "f_rate",
            type: "string",
            required: false,
            description: "F-rate pricing (Italian specific)",
            enum: ["F0", "F1", "F2"],
          },
          {
            name: "pun_based",
            type: "boolean",
            required: false,
            description: "PUN-based offers only",
            enum: ["true", "false"],
          },
        ],
      },
      {
        id: "italian-energy-providers",
        name: "Italian Energy Providers",
        description: "Get list of available Italian energy providers",
        method: "GET",
        path: "/api/energy/italian",
        requiresAuth: false,
        queryParams: [
          {
            name: "route",
            type: "string",
            required: true,
            description: "Route type",
            defaultValue: "providers",
            enum: ["providers"],
          },
        ],
      },
      {
        id: "italian-price-summary",
        name: "Italian Price Summary",
        description: "Get detailed price summary with F0/F1/F2 breakdown",
        method: "GET",
        path: "/api/energy/italian",
        requiresAuth: false,
        queryParams: [
          {
            name: "route",
            type: "string",
            required: true,
            description: "Route type",
            defaultValue: "price_summary",
            enum: ["price_summary"],
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Number of results per page",
            defaultValue: 5,
            enum: ["5", "10", "20"],
          },
        ],
      },
    ],
  },
];

// Get API config by ID
export const getApiConfig = (id: string): ApiClientInfo | undefined => {
  return apiConfigs.find((config) => config.id === id);
};

// Get all API configs
export const getAllApiConfigs = (): ApiClientInfo[] => {
  return apiConfigs;
};
