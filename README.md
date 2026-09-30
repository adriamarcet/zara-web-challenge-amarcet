# Zara Web Challenge

Responsive smartphone catalog built for the Napptilus frontend technical
challenge. The application lets users search the catalog, inspect and configure
a product, browse similar items, and manage a persistent shopping cart.

## Features

- Product catalog limited to 20 results, with server-side search and a result
  counter.
- Product detail with storage and color selection, dynamic pricing,
  specifications, and similar products.
- Persistent cart with independent lines for every configured product.
- Responsive layouts for mobile, tablet, desktop, and wide desktop viewports.
- Loading, empty, error, and not-found states.
- Accessible navigation, form labels, status messages, and keyboard focus
  styles.
- Client-side image processing to remove connected white backgrounds and
  normalize product artwork.

## Technology

| Area       | Choice                                                           |
| ---------- | ---------------------------------------------------------------- |
| Build tool | Vite 6                                                           |
| UI         | React 19                                                         |
| Routing    | React Router 7                                                   |
| Styling    | styled-components, CSS custom properties, and shared breakpoints |
| State      | React Context and local component state                          |
| Data       | Native `fetch` API                                               |
| Tests      | Vitest, jsdom, and React Testing Library                         |
| Quality    | ESLint and Prettier                                              |

## Getting started

### Requirements

- Node.js 20 or newer
- npm 10 or newer
- An API key for the challenge API

### Installation

```bash
git clone git@github.com:adriamarcet/zara-web-challenge-amarcet.git
cd zara-web-challenge-amarcet
npm ci
cp .env.example .env.local
```

Add the API key to `.env.local`:

```env
VITE_X_API_KEY=your_api_key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

All requests to the products API include the key in the `x-api-key` header.
Variables prefixed with `VITE_` are embedded in the browser bundle, so this key
must not be treated as a server-side secret. A production system that requires a
private credential should place the API call behind a backend or serverless
proxy.

## Available scripts

| Command                | Purpose                                 |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start the Vite development server       |
| `npm run build`        | Create the production build in `dist/`  |
| `npm run preview`      | Serve the production build locally      |
| `npm test`             | Run Vitest in watch mode                |
| `npm test -- --run`    | Run the test suite once                 |
| `npm run lint`         | Check the code with ESLint              |
| `npm run format`       | Format the repository with Prettier     |
| `npm run format:check` | Check formatting without changing files |

For a complete local verification:

```bash
npm run lint
npm run format:check
npm test -- --run
npm run build
```

## Application routes

| Route                  | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `/`                    | Product catalog and debounced search                     |
| `/products/:productId` | Product configuration, specifications, and similar items |
| `/cart`                | Persistent cart, total, and item removal                 |
| `*`                    | Not-found page                                           |

## Architecture

The project uses a small layered structure. It keeps shared infrastructure
centralized while colocating each component with its styles and tests.

```text
src/
|-- components/       UI components grouped by screen or responsibility
|-- context/          Product and cart state providers
|-- layouts/          Shared route layout
|-- services/         Products API access
|-- styles/           Reset, utilities, tokens, and responsive breakpoints
|-- utils/            Framework-independent helpers
|-- App.jsx           Route definitions
`-- main.jsx          Application providers and browser entry point
```

### Data flow

```text
Product UI -> ProductsProvider / ProductDetail -> productsService -> Store API
Cart UI    -> CartProvider -> localStorage
```

- `productsService` owns the API base URL, query parameters, error handling,
  deduplication, and `x-api-key` header.
- `ProductsProvider` fetches the catalog and exposes loading, error, products,
  and search state.
- `ProductDetail` loads a single product and keeps its selected color and
  storage local to the screen.
- `CartProvider` validates stored data, calculates totals, and persists each
  configured product as an independent line.

## Technical decisions

### Vite and client-side routing

The challenge is a client-rendered application without server-rendering or
backend requirements. Vite keeps development and production builds simple,
while React Router provides explicit catalog, detail, cart, and fallback routes.

### State management

React Context is used only for state shared across routes: the catalog and the
cart. Product configuration remains local to the detail page. This avoids an
additional state library for a deliberately small state model.

### Search and request lifecycle

Search is sent to the API after a 250 ms debounce instead of filtering only the
currently loaded results. Requests use `AbortController`, preventing obsolete
responses from updating state after a new search or route change.

### Cart persistence

The cart is stored in `localStorage`. Stored entries are validated before use,
and storage failures fall back to an in-memory cart. Every add operation creates
a unique line, so repeated products and different configurations can be removed
independently.

### Styling and responsive behavior

Visual components use styled-components, while global tokens, utilities, and
breakpoints live under `src/styles`. The catalog progresses from one column on
mobile to three on tablet and five once the viewport can support wide product
cards.

### Product images

Remote image URLs are normalized to HTTPS. Once an image loads, background
processing uses Canvas during browser idle time to remove white pixels connected
to the image edges and encode a centered WebP result. Canvas dimensions follow
the rendered image size, generated object URLs are revoked with their component
lifecycle, and failures fall back to the original image.

### JavaScript scope

The implementation uses JavaScript because TypeScript was not required and the
application has a small, well-tested data surface. API and storage boundaries
are still isolated so runtime validation or static typing could be introduced
without restructuring the UI.

## Testing

The test suite covers the API service, providers, catalog states, product cards,
image processing, product configuration, specifications, similar items, and the
cart flow.

```bash
npm test -- --run
```

Tests that render React components use jsdom and React Testing Library. Service
tests mock `fetch`, while provider and component tests exercise observable user
behavior and persistence boundaries.

## Deployment

This project builds to static assets and can be deployed to Vercel, Netlify,
Cloudflare Pages, or any static host.

Use the following build settings:

| Setting              | Value            |
| -------------------- | ---------------- |
| Install command      | `npm ci`         |
| Build command        | `npm run build`  |
| Output directory     | `dist`           |
| Environment variable | `VITE_X_API_KEY` |

Because the application uses `BrowserRouter`, the host must rewrite unknown
paths such as `/products/:productId` and `/cart` to `/index.html`. Configure the
same API key in the deployment environment before building, then verify the
production output locally with:

```bash
npm run build
npm run preview
```
