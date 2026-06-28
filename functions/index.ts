export async function onRequestGet(): Promise<Response> {
  return new Response(
    JSON.stringify({
      name: "AImighty Market",
      version: "1.0.0",
      endpoints: [
        "/api/v1/appstore/hash",
        "/api/v1/appstore/info",
        "/api/v1/applications/info",
        "/api/v1/applications/{app}/chart",
      ],
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
