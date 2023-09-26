declare module "bun" {
  interface Env {
    MONGO_URL: string;
    PORT: number;
  }
}