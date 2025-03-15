import type { NextConfig } from "next";

export const nextConfig: NextConfig = {
  async headers() {
      return [
          {
              source: "/(.*)",
              headers: [
                  {
                      key: "Content-Security-Policy",
                      value: `
                          default-src 'self';
                          script-src 'self' 'unsafe-inline' https://apis.google.com https://accounts.google.com;
                          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                          font-src 'self' https://fonts.gstatic.com https://fonts.sandbox.google.com https://docs.google.com;
                          img-src 'self' data: https://*.googleusercontent.com;
                          connect-src 'self' https://www.googleapis.com;
                          frame-src 'self' https://accounts.google.com;
                      `.replace(/\s+/g, " "),
                  },
              ],
          },
      ];
  },
};