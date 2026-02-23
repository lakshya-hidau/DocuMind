/**
 * Central API configuration for DocuMind.
 *
 * - Local dev:  set VITE_API_URL in frontend/.env
 * - Production: set VITE_API_URL in frontend/.env.production
 *               OR pass it as a build arg: VITE_API_URL=https://api.yourdomain.com npm run build
 */
const rawApiUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8000";
export const API_BASE: string = rawApiUrl.replace(/\/$/, "");
