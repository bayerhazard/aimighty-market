import { getDetails } from "../../../_lib";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function onRequestGet(): Promise<Response> {
  const details = getDetails();
  return new Response(JSON.stringify(details), { headers });
}

export async function onRequestPost({ request }: { request: Request }): Promise<Response> {
  const body: { app_ids?: string[]; version?: string } = await request.json();
  const requested = body.app_ids ?? [];
  const details = getDetails();

  const result: Record<string, unknown> = {};
  const notFound: string[] = [];

  for (const id of requested) {
    if (details[id]) {
      result[id] = details[id];
    } else {
      notFound.push(id);
    }
  }

  return new Response(
    JSON.stringify({
      apps: result,
      version: body.version ?? "1.0.0",
      ...(notFound.length > 0 ? { not_found: notFound } : {}),
    }),
    { headers }
  );
}
