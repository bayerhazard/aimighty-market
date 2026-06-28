import { getHash } from "../../../_lib";

export async function onRequestGet(): Promise<Response> {
  const hash = getHash();
  const now = new Date().toISOString();

  return new Response(
    JSON.stringify({
      hash,
      last_updated: now,
      version: "1.0.0",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    }
  );
}
