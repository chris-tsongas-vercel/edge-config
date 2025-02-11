import { NextResponse } from "next/server";
import { createClient } from "@vercel/edge-config";

export async function middleware() {
  // Fetch a single value from one config
  const primaryConfig = createClient(process.env.EDGE_CONFIG_PRIMARY);
  const primaryValue = await primaryConfig.get("primary");

  // Fetch all values from another config
  const secondaryConfig = createClient(process.env.EDGE_CONFIG_SECONDARY);
  const allSecondaryValues = await secondaryConfig.getAll();

  return NextResponse.json({ primaryValue, ...allSecondaryValues });
}
