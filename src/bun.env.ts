declare module "bun" {
  interface Env {
    MONGO_URL: string;
    PORT: string;
    JWT_SECRET: string;
  }
}