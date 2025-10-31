import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getIds, getVerifyId, postIssueId, postRevokeId } from "./routes/ids";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // ID issuance and verification API
  app.post("/api/issue-id", postIssueId);
  app.get("/api/verify-id", getVerifyId);
  app.post("/api/revoke-id", postRevokeId);
  app.get("/api/ids", getIds);

  return app;
}
