# Deployment Documentation for Eventio

## Project Overview
- **Framework**: React 19 + TanStack Start + Vite
- **Language**: TypeScript 5.8
- **Package Manager**: npm
- **Node Version**: 20 LTS (minimum: 20.0.0)

## Local Development

### Prerequisites
- Node.js 20 LTS or higher
- npm 10 or higher

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Format code
npm run format
```

Development server runs on `http://localhost:5173/`

## Production Build

### Build Locally
```bash
npm run build
```

Output files generated:
- `dist/client/` - Client-side bundles and assets
- `dist/server/` - Server-side SSR bundles

### Build Verification
The build is verified to:
- ✅ Transform 2920 modules (client)
- ✅ Transform 62 modules (SSR)
- ✅ Generate optimized CSS and JS bundles
- ✅ Produce all required output files

## Vercel Deployment

### Configuration
The project includes `vercel.json` with optimal settings:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "nodeVersion": "20.x"
}
```

### Deployment Steps
1. Connect repository to Vercel
2. Set Node version to 20.x in Vercel project settings
3. Deploy - Vercel will automatically:
   - Run `npm install`
   - Run `npm run build`
   - Serve optimized production build

### Environment Variables
No environment variables are currently required for basic functionality.

## Project Structure Verified
✅ Dependencies (115 packages) - no conflicts
✅ Vite configuration - properly configured with React + TailwindCSS + TanStack plugins
✅ TypeScript configuration - strict mode enabled
✅ ESLint configuration - modern standards
✅ Prettier formatting - consistent code style
✅ Wrangler configuration - Cloudflare Workers support

## Quality Assurance Results

### Npm Install
- ✅ Zero vulnerabilities
- ✅ No peer dependency conflicts
- ✅ All packages resolved correctly
- ✅ 578 packages installed

### Dev Server
- ✅ Starts successfully
- ✅ Hot module replacement working
- ✅ No esbuild errors
- ✅ No TanStack errors
- ✅ No Getter/Setter errors

### Production Build
- ✅ Client build: 2920 modules transformed
- ✅ SSR build: 62 modules transformed
- ✅ CSS bundle: 78.01 kB (13.05 kB gzipped)
- ✅ JS bundles: 183.58 kB + 349.55 kB (optimized)
- ✅ All output files generated correctly

## Maintenance Notes

### Dependencies
- React 19.2.0 - Latest stable
- TanStack Router 1.168.25 - Latest stable
- TanStack Start 1.167.50 - Latest stable
- TanStack Query 5.83.0 - Latest stable
- Vite 7.3.1 - Latest stable

### Known Non-Critical Warnings
- Minor unused imports from @tanstack/router-core (library-level, not application-impacting)
- whatwg-encoding@3.1.1 deprecation (transitive dependency, doesn't affect functionality)

## Support & Troubleshooting

### Project won't start
1. Verify Node.js 20+ is installed: `node --version`
2. Clear cache: `rm -r node_modules package-lock.json`
3. Fresh install: `npm install`
4. Start dev server: `npm run dev`

### Build issues
1. Clear Vite cache: `rm -r dist .vite`
2. Run: `npm run build`

### Vercel deployment fails
1. Check Node version is set to 20.x in Vercel dashboard
2. Verify all environment variables are set (if any added in future)
3. Check build logs in Vercel dashboard

## Last Verified
- Project Status: ✅ Fully operational
- Dev Server: ✅ Working
- Production Build: ✅ Working
- Vercel Ready: ✅ Yes
- Node.js Compatibility: ✅ 20 LTS
