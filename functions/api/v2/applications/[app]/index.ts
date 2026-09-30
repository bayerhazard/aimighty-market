import { getApplicationDetail } from "../../../../_lib";

export async function onRequestGet(context: { request: Request; params: { app: string } }): Promise<Response> {
  const detail = getApplicationDetail(context.params.app);
  if (!detail) {
    return new Response(JSON.stringify({ code: 1, msg: "app not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ code: 0, msg: "success", data: detail }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
