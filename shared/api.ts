/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export type IdStatus = "active" | "revoked";

export interface IssueIdRequest {
  name: string;
  recipientAddress: string;
  role: string;
}

export interface IssueIdResponse {
  assetId: number;
  txId: string;
}

export interface VerifyIdResponse {
  valid: boolean;
  reason?: string;
}

export interface IdRecord {
  assetId: number;
  txId: string;
  owner: string;
  name: string;
  role: string;
  status: IdStatus;
  issuedAt: number;
}

export interface ListIdsResponse {
  items: IdRecord[];
}
