import { getSummaries, getAppIDs, getLatest, getHash } from "../../../_lib";

export async function onRequestGet(): Promise<Response> {
  const now = new Date().toISOString();
  const appIds = getAppIDs().join(",");
  const summaries = getSummaries();
  const latest = getLatest();
  const hash = getHash();

  return new Response(
    JSON.stringify({
      version: "1.0.0",
      hash,
      last_updated: now,
      data: {
        apps: summaries,
        recommends: {},
        pages: {
          Apps: {
            category: "Apps",
            content: JSON.stringify([
              { type: "Default Topic", id: "Newest" },
            ]),
          },
        },
        topics: {},
        topic_lists: {
          Newest: {
            name: "Newest",
            type: "Category",
            content: appIds,
            title: { "en-US": "Newest", "zh-CN": "最新" },
          },
        },
        tops: [],
        latest,
        tags: {
          Apps: {
            _id: "apps_custom",
            name: "Apps",
            title: { "en-US": "Apps", "zh-CN": "应用" },
            icon: "",
            sort: 1,
            source: 0,
            updated_at: now,
            createdAt: "2025-01-01T00:00:00.000Z",
          },
        },
      },
      stats: {
        appstore_data: {
          apps: Object.keys(summaries).length,
          pages: 1,
          recommends: 0,
          tags: 1,
          topic_lists: 1,
          topics: 0,
        },
        last_updated: now,
      },
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
