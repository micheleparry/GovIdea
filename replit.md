# Government Idea Browser

## Overview
Government Idea Browser is a data-driven platform that discovers, analyzes, and scores government opportunities through intelligent web scraping and AI analysis. The application helps users browse government contract opportunities, track trending topics, and gain insights into the government contracting landscape. It features a dashboard-style interface similar to Ideabrowser, with AI-powered analysis of pain points and opportunities across various government agencies including DARPA, NSF, DOE, and others.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React and TypeScript using modern tooling:
- **React 18** with functional components and hooks for state management
- **TypeScript** for type safety across the entire client codebase
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query** for server state management and caching
- **Tailwind CSS** with custom design system for styling
- **Shadcn/UI** component library built on Radix UI primitives

The application follows a component-based architecture with:
- Reusable UI components in `/components/ui/`
- Feature-specific components for dashboard sections
- Custom hooks for shared logic
- Clean separation between presentation and business logic

### Backend Architecture
The backend uses a modern Node.js stack:
- **Express.js** server with TypeScript for API endpoints
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** via Neon Database for data persistence
- **RESTful API design** with consistent error handling
- **Middleware patterns** for logging and request processing

Key backend services include:
- **Anthropic AI Service** for analyzing opportunities and generating insights
- **Scraper Service** for collecting data from government sources
- **Storage Layer** with comprehensive CRUD operations

### Database Design
PostgreSQL schema with four main tables:
- **Users** - Basic user authentication and profiles
- **Opportunities** - Government contract opportunities with scoring metrics
- **Trends** - Trending topics and market intelligence
- **Analytics** - Metrics and performance data

The schema uses modern PostgreSQL features like JSONB for flexible data storage and UUID primary keys for better scalability.

### Development and Build Process
- **ESBuild** for server-side bundling and production builds
- **Vite** for client-side development and building
- **TypeScript compilation** with strict type checking
- **Shared types** between client and server via `/shared/` directory
- **Path aliases** for clean import statements

## External Dependencies

### AI and Analysis
- **Anthropic Claude API** - AI-powered opportunity analysis, feasibility scoring, and insight generation
- **Claude Sonnet 4** model for latest AI capabilities

### Database and Infrastructure
- **Neon Database** - Serverless PostgreSQL database with connection pooling
- **Drizzle Kit** - Database migrations and schema management

### UI and Styling
- **Radix UI** - Headless component primitives for accessibility
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Google Fonts** - Typography (Inter, DM Sans, Fira Code, Geist Mono)

### Development Tools
- **Replit Integration** - Development environment with runtime error overlay and cartographer
- **TypeScript** - Type system for both client and server
- **PostCSS** - CSS processing with autoprefixer

### Data Sources (Simulated)
The application is designed to scrape from multiple government sources:
- SAM.gov - Federal contracting opportunities
- SBIR.gov - Small Business Innovation Research
- NSF.gov - National Science Foundation
- DARPA.mil - Defense Advanced Research Projects Agency
- Energy.gov - Department of Energy
- Reddit and Facebook - Community discussions about government contracts

Note: The scraper service currently provides mock data for demonstration purposes, but the architecture supports real web scraping implementation.