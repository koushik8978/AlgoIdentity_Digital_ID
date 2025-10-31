import { RequestHandler } from "express";
import crypto from "crypto";

export type IdStatus = "active" | "revoked";
export interface IdRecord {
  assetId: number;
  txId: string;
  owner: string;
  name: string;
  role: string;
  status: IdStatus;
  issuedAt: number; // epoch ms
}

// Simple in-memory store (persists for process lifetime)
const ids = new Map<number, IdRecord>();
let nextAssetId = 100000; // deterministic starting point for demo

function genTxId() {
  return "MOCK-" + crypto.randomBytes(8).toString("hex");
}

function isAlgorandAddressLike(addr: string) {
  return typeof addr === "string" && addr.length >= 30 && /^[A-Z0-9]+$/i.test(addr);
}

export const postIssueId: RequestHandler = (req, res) => {
  const { name, recipientAddress, role } = req.body || {};
  if (!name || !recipientAddress || !role) return res.status(400).send("Missing required fields: name, recipientAddress, role");
  if (!isAlgorandAddressLike(recipientAddress)) return res.status(400).send("Invalid wallet address");

  const assetId = nextAssetId++;
  const record: IdRecord = {
    assetId,
    txId: genTxId(),
    owner: recipientAddress,
    name: String(name),
    role: String(role),
    status: "active",
    issuedAt: Date.now(),
  };
  ids.set(assetId, record);
  res.status(200).json({ assetId: record.assetId, txId: record.txId });
};

export const getVerifyId: RequestHandler = (req, res) => {
  const { assetId, address } = req.query as { assetId?: string; address?: string };
  if (!assetId || !address) return res.status(400).json({ valid: false, reason: "assetId and address are required" });
  const idNum = Number(assetId);
  if (!Number.isFinite(idNum)) return res.status(400).json({ valid: false, reason: "assetId must be a number" });

  const rec = ids.get(idNum);
  if (!rec) return res.status(200).json({ valid: false, reason: "ID not found" });
  if (rec.status !== "active") return res.status(200).json({ valid: false, reason: "ID revoked" });
  const valid = rec.owner.toLowerCase() === String(address).toLowerCase();
  return res.status(200).json({ valid, reason: valid ? undefined : "Ownership mismatch" });
};

export const postRevokeId: RequestHandler = (req, res) => {
  const { assetId } = req.body || {};
  const idNum = Number(assetId);
  if (!Number.isFinite(idNum)) return res.status(400).send("assetId must be a number");
  const rec = ids.get(idNum);
  if (!rec) return res.status(404).send("ID not found");
  if (rec.status === "revoked") return res.status(200).json({ ok: true, status: rec.status });
  rec.status = "revoked";
  ids.set(idNum, rec);
  return res.status(200).json({ ok: true, status: rec.status });
};

export const getIds: RequestHandler = (req, res) => {
  const owner = (req.query.owner as string | undefined)?.toLowerCase();
  const list = Array.from(ids.values()).filter((r) => (owner ? r.owner.toLowerCase() === owner : true));
  res.status(200).json({ items: list });
};
