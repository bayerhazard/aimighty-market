import { getTaxonomy } from "../../_lib";

export async function onRequestGet(): Promise<Response> {
  return new Response(JSON.stringify(getTaxonomy()), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
