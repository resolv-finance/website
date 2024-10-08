import { RouteType } from "../interfaces/routes";

/* ==========   EXTERNAL URLS   ========== */
export const RESOLV_WEBSITE_URL = "https://resolv.finance";

/* ==========   BACKEND API BASE URL   ========== */
export const BASE_API_URL = "http://3.232.108.237:8000/resolv/api/v1";

/* ==========   REFERRAL TRACKER URL   ========== */
export const REFERRAL_TRACKER_URL =
  "https://dkq9ddk2fc.execute-api.us-east-1.amazonaws.com/Prod";

/* ==========   INTERNAL CONSTANTS ========== */
export const routes: RouteType = {
  wallet: "/wallet",
  transactions: "/transactions",
  disputes: "/disputes",
  settings: "/settings",
};

export enum SUPPORTED_CHAINS {
  BASE_SEPOLIA = "84532",
}
