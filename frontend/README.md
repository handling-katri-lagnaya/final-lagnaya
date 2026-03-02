# Khatri Lagnaya - Frontend

A modern matrimonial platform built with React and Vite for the Kshetriya Khatri community.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Tanstack Query** - Data fetching and caching

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/          # Images and static files
├── components/      # Reusable UI components
│   ├── ui/         # shadcn/ui components
│   └── admin/      # Admin-specific components
├── config/         # Configuration files
├── contexts/       # React context providers
├── data/           # Static data and constants
├── hooks/          # Custom React hooks
├── lib/            # Utility libraries
├── pages/          # Page components
└── utils/          # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features

- User authentication and authorization
- Profile creation and management
- Advanced matchmaking with Guna matching
- Family meeting scheduling
- Payment integration (Razorpay)
- Admin dashboard
- Responsive design

## Environment Variables

Create a `.env` file in the root directory with necessary environment variables for API endpoints and third-party services.

## License

Private - All rights reserved
