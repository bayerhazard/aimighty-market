import { getChartByAppName, getChart, getApplicationDetail } from "../../../../_lib";

export async function onRequestGet(context: { request: Request; params: { app: string } }): Promise<Response> {
  const url = new URL(context.request.url);
  const APP = context.params.app;

  const wantsChart =
    url.pathname.endsWith("/chart") || url.searchParams.has("fileName");
  if (wantsChart) {
    const fileName = url.searchParams.get("fileName");
    const b64 = (fileName && getChart(fileName)) || getChartByAppName(APP);
    if (!b64) {
      return new Response(JSON.stringify({ code: 1, msg: "chart not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(b64, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName ?? APP}.tgz"`,
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const detail = getApplicationDetail(APP);
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
