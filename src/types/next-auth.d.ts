// Remove the import since we're just augmenting the existing type
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}