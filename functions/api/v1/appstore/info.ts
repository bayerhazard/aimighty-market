import { getSummaries, getAppIDs, getLatest, getHash } from "../../../_lib";

const CATEGORY_ICONS: Record<string, string> = {
  "LLM Chat": "https://app.cdn.olares.com/icons/market/sidebar/neurology.svg",
  "AI Agents": "https://app.cdn.olares.com/icons/market/sidebar/neurology.svg",
  Audio: "https://app.cdn.olares.com/icons/market/sidebar/neurology.svg",
};

export async function onRequestGet(): Promise<Response> {
  const now = new Date().toISOString();
  const summaries = getSummaries();
  const latest = getLatest();
  const hash = getHash();

  // Build category -> app ID mapping
  const categoryMap: Record<string, string[]> = {};
  for (const app of Object.values(summaries)) {
    for (const cat of (app as any).categories ?? []) {
      if (!categoryMap[cat]) categoryMap[cat] = [];
      categoryMap[cat].push((app as any).id);
    }
  }

  // Build tags for each category
  const tags: Record<string, any> = {};
  let sortIdx = 10;
  for (const cat of Object.keys(categoryMap).sort()) {
    tags[cat] = {
      _id: `cat_${cat.toLowerCase().replace(/\s+/g, "_")}`,
      name: cat,
      title: { "en-US": cat, "zh-CN": cat },
      icon: CATEGORY_ICONS[cat] ?? "",
      sort: sortIdx++,
      source: 0,
      updated_at: now,
      createdAt: "2025-01-01T00:00:00.000Z",
    };
  }

  // Build topic_lists for each category
  const topic_lists: Record<string, any> = {};
  for (const [cat, ids] of Object.entries(categoryMap)) {
    topic_lists[`Featured apps in ${cat}`] = {
      name: `Featured apps in ${cat}`,
      type: "Category",
      content: ids.join(","),
      title: { "en-US": `Featured apps in ${cat}`, "zh-CN": cat },
      source: 0,
      updated_at: now,
      createdAt: "2025-01-01T00:00:00.000Z",
    };
  }

  // Build pages
  const pages: Record<string, any> = {};
  for (const cat of Object.keys(categoryMap).sort()) {
    pages[cat] = {
      category: cat,
      content: JSON.stringify([
        { type: "Topic", id: `Featured apps in ${cat}` },
        { type: "Default Topic", id: "Newest" },
      ]),
      source: 0,
      updated_at: now,
      createdAt: "2025-01-01T00:00:00.000Z",
    };
  }

  return new Response(
    JSON.stringify({
      version: "1.0.0",
      hash,
      last_updated: now,
      data: {
        apps: summaries,
        recommends: {},
        pages,
        topics: {},
        topic_lists,
        tops: [],
        latest,
        tags,
      },
      stats: {
        appstore_data: {
          apps: Object.keys(summaries).length,
          pages: Object.keys(pages).length,
          recommends: 0,
          tags: Object.keys(tags).length,
          topic_lists: Object.keys(topic_lists).length,
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
