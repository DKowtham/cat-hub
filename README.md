# CAT HUB - Energy Market Dashboard

A comprehensive energy market dashboard for testing and monitoring French and Italian energy APIs. Built with Next.js 15, TypeScript, TailwindCSS, and modern UI components with a professional dark theme.

## 🚀 Features

- **⚡ Energy Market APIs**: Test French and Italian energy market endpoints
- **🌙 Dark Theme UI**: Professional ultra-dark dashboard design system
- **📊 Real-time Monitoring**: API status codes, response times, and error handling
- **🔧 Parameter Testing**: Grid-based parameter interface with collapsible headers
- **📱 Responsive Design**: Mobile-friendly with adaptive column layouts
- **🎨 Syntax Highlighting**: JSON viewer with copy functionality and collapsible sections
- **🌍 Multi-Market Support**: Dedicated French and Italian energy market integration
- **📈 Provider Comparison**: Energy provider data with filtering and pagination

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with custom dark theme
- **UI Components**: Custom components with Radix UI primitives
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Package Manager**: Bun
- **API Integration**: Papernest Energy Catalog API

## 🌟 Design System

### Color Palette

- **Background**: `#0D0D0D` (Ultra Dark)
- **Panels**: `#1A1A1A` (Dark Panel)
- **Cards**: `#111111` (Dark Card)
- **Primary**: `#1E90FF` (Blue)
- **Success**: `#00D084` (Green)
- **Danger**: `#FF4D4F` (Red)
- **Warning**: `#FADB14` (Yellow)
- **Info**: `#13C2C2` (Cyan)
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#A6A6A6`
- **Borders**: `#2E2E2E`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:DKowtham/cat-hub.git
   cd cat-hub
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your energy API credentials:

   ```env
   # Energy API Configuration
   ENERGY_API_TOKEN=your-papernest-api-token
   APP_BACKEND_ENDPOINT_TOKEN=your-backup-token
   ```

4. **Start the development server**

   ```bash
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔌 API Integration

### French Energy Market

- **Endpoint**: `/api/energy/french`
- **Features**:
  - Basic energy offers
  - Green energy filtering
  - Papernest partner priority
  - Power rating filtering (3-36 kVA)
  - Provider filtering (EDF, Engie, TotalEnergies, etc.)

### Italian Energy Market

- **Endpoint**: `/api/energy/italian`
- **Features**:
  - Basic energy offers
  - Fixed/Variable price filtering
  - F0/F1/F2 tariff types
  - Grid type filtering (Fixed, PUN with kWh fee)
  - Green energy options

### Supported Parameters

#### French Market

- `filter_type`: basic, green, papernest, recommended
- `page`: Pagination (1-5)
- `limit`: Results per page (5, 10, 20, 50)
- `provider`: Energy provider filter
- `power_rating`: kVA rating (3-36)
- `has_green_energy`: Green energy filter
- `sort_papernest_partner`: Partner priority

#### Italian Market

- `filter_type`: basic, green, fixed, variable, indexed
- `page`: Pagination (1-5)
- `limit`: Results per page (5, 10, 20, 50)
- `tariff_type`: fixed_price, variable_price, indexed_price
- `grid_type`: fixed, pun_with_kwh_fee
- `f_rate`: F0, F1, F2
- `has_green_energy`: Green energy filter

## 📁 Project Structure

```
cat-hub/
├── app/                          # Next.js app directory
│   ├── api/
│   │   └── energy/
│   │       ├── french/           # French energy API routes
│   │       └── italian/          # Italian energy API routes
│   ├── api-clients/              # API client testing pages
│   │   └── [id]/                 # Dynamic API client pages
│   ├── providers/                # React Query providers
│   ├── settings/                 # Settings page
│   ├── globals.css               # Global styles with dark theme
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Dashboard homepage
├── components/                   # React components
│   ├── api-clients/             # API testing components
│   │   ├── api-response.tsx     # Response display with collapsible headers
│   │   ├── endpoint-tester.tsx  # Parameter grid interface
│   │   └── json-viewer.tsx      # JSON formatting with syntax highlighting
│   ├── layout/                  # Layout components
│   │   ├── main-layout.tsx      # Main application layout
│   │   └── sidebar.tsx          # Navigation sidebar
│   └── ui/                      # Reusable UI components
├── lib/                         # Utility libraries
│   ├── api-clients/            # API client configurations
│   └── utils/                  # Utility functions
├── types/                      # TypeScript definitions
├── hooks/                      # Custom React hooks
└── tailwind.config.js          # Tailwind CSS configuration
```

## 🎨 UI Features

### Parameter Interface

- **Grid Layout**: Responsive 1-3 column grid for parameters
- **Smart Inputs**: Type-aware inputs (text, number, select)
- **Default Values**: Pre-populated with sensible defaults
- **Validation**: Client-side parameter validation

### Response Display

- **Status Indicators**: Color-coded HTTP status badges
- **Collapsible Headers**: Foldable response headers with count
- **JSON Viewer**: Syntax-highlighted with copy/collapse functionality
- **Performance Metrics**: Response time tracking

### Navigation

- **Market Switcher**: Quick access to French/Italian markets
- **Provider Links**: Direct GitHub and documentation links
- **Status Overview**: Real-time API health indicators

## 🔧 Development

### Building for Production

```bash
bun run build
```

### Running Production Build

```bash
bun run start
```

### Linting

```bash
bun run lint
```

## 🌍 Environment Configuration

The application supports multiple environments:

- **Development**: Local development with hot reload
- **Production**: Optimized build with Next.js
- **Environment Variables**: Secure API token management

## 📊 API Monitoring

### Response Handling

- **2xx Success**: Green indicators
- **3xx Redirect**: Yellow indicators
- **4xx Client Error**: Red indicators
- **5xx Server Error**: Dark red indicators

### Performance Tracking

- Millisecond-precision response times
- Request/response size monitoring
- Error rate tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository.

## 🙏 Acknowledgments

- **Papernest**: Energy market API provider
- **Next.js Team**: Amazing React framework
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide**: Beautiful icon library

---

**Built with ❤️ for the energy market community**

_CAT HUB - Connecting markets, empowering decisions_
