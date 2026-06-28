import { getChart, getChartByAppName } from "../../../../_lib";

export async function onRequestGet({ request, params }: { request: Request; params: { app: string } }): Promise<Response> {
  const url = new URL(request.url);
  const fileName = url.searchParams.get("fileName");
  const appName = params.app;

  let data: string | undefined;

  if (fileName) {
    data = getChart(fileName);
  } else if (appName) {
    data = getChartByAppName(appName);
  }

  if (!data) {
    return new Response(
      JSON.stringify({ error: "Chart not found" }),
      { status: 404, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }

  const binary = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
  return new Response(binary, {
    headers: {
      "Content-Type": "application/gzip",
      "Content-Disposition": `attachment; filename="${appName}.tgz"`,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
