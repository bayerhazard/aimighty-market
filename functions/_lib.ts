import { apps } from "./_apps";

function md5(input: string): string {
  function rl(x: number, n: number) {
    return (x << n) | (x >>> (32 - n));
  }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    const v = add(add(add(a, q), add(x, t)), 0);
    return add(rl(v, s), b);
  }
  function add(x: number, y: number) {
    const l = (x & 0xffff) + (y & 0xffff);
    const h = (x >>> 16) + (y >>> 16) + (l >>> 16);
    return ((h & 0xffff) << 16) | (l & 0xffff);
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(c ^ (b | ~d), a, b, x, s, t); }
  function bytesToWords(bytes: number[]) {
    const words: number[] = [];
    for (let i = 0; i < bytes.length; i += 4)
      words.push(((bytes[i] & 0xff) | ((bytes[i + 1] & 0xff) << 8) | ((bytes[i + 2] & 0xff) << 16) | ((bytes[i + 3] & 0xff) << 24)) >>> 0);
    return words;
  }
  function wordsToBytes(words: number[]) {
    const bytes: number[] = [];
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      bytes.push(w & 0xff, (w >>> 8) & 0xff, (w >>> 16) & 0xff, (w >>> 24) & 0xff);
    }
    return bytes;
  }
  const strBytes: number[] = [];
  for (let i = 0; i < input.length; i++) strBytes.push(input.charCodeAt(i));
  const len = strBytes.length;
  strBytes.push(0x80);
  while ((strBytes.length % 64) !== 56) strBytes.push(0);
  const bitLen = len * 8;
  strBytes.push(bitLen & 0xff, (bitLen >>> 8) & 0xff, (bitLen >>> 16) & 0xff, (bitLen >>> 24) & 0xff, 0, 0, 0, 0);
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  for (let k = 0; k < strBytes.length; k += 64) {
    const chunk = strBytes.slice(k, k + 64);
    const M = bytesToWords(chunk);
    let aa = a, bb = b, cc = c, dd = d;
    a = ff(a, b, c, d, M[0], 7, 0xd76aa478); d = ff(d, a, b, c, M[1], 12, 0xe8c7b756); c = ff(c, d, a, b, M[2], 17, 0x242070db); b = ff(b, c, d, a, M[3], 22, 0xc1bdceee);
    a = ff(a, b, c, d, M[4], 7, 0xf57c0faf); d = ff(d, a, b, c, M[5], 12, 0x4787c62a); c = ff(c, d, a, b, M[6], 17, 0xa8304613); b = ff(b, c, d, a, M[7], 22, 0xfd469501);
    a = ff(a, b, c, d, M[8], 7, 0x698098d8); d = ff(d, a, b, c, M[9], 12, 0x8b44f7af); c = ff(c, d, a, b, M[10], 17, 0xffff5bb1); b = ff(b, c, d, a, M[11], 22, 0x895cd7be);
    a = ff(a, b, c, d, M[12], 7, 0x6b901122); d = ff(d, a, b, c, M[13], 12, 0xfd987193); c = ff(c, d, a, b, M[14], 17, 0xa679438e); b = ff(b, c, d, a, M[15], 22, 0x49b40821);
    a = gg(a, b, c, d, M[1], 5, 0xf61e2562); d = gg(d, a, b, c, M[6], 9, 0xc040b340); c = gg(c, d, a, b, M[11], 14, 0x265e5a51); b = gg(b, c, d, a, M[0], 20, 0xe9b6c7aa);
    a = gg(a, b, c, d, M[5], 5, 0xd62f105d); d = gg(d, a, b, c, M[10], 9, 0x02441453); c = gg(c, d, a, b, M[15], 14, 0xd8a1e681); b = gg(b, c, d, a, M[4], 20, 0xe7d3fbc8);
    a = gg(a, b, c, d, M[9], 5, 0x21e1cde6); d = gg(d, a, b, c, M[14], 9, 0xc33707d6); c = gg(c, d, a, b, M[3], 14, 0xf4d50d87); b = gg(b, c, d, a, M[8], 20, 0x455a14ed);
    a = gg(a, b, c, d, M[13], 5, 0xa9e3e905); d = gg(d, a, b, c, M[2], 9, 0xfcefa3f8); c = gg(c, d, a, b, M[7], 14, 0x676f02d9); b = gg(b, c, d, a, M[12], 20, 0x8d2a4c8a);
    a = hh(a, b, c, d, M[5], 4, 0xfffa3942); d = hh(d, a, b, c, M[8], 11, 0x8771f681); c = hh(c, d, a, b, M[11], 16, 0x6d9d6122); b = hh(b, c, d, a, M[14], 23, 0xfde5380c);
    a = hh(a, b, c, d, M[1], 4, 0xa4beea44); d = hh(d, a, b, c, M[4], 11, 0x4bdecfa9); c = hh(c, d, a, b, M[7], 16, 0xf6bb4b60); b = hh(b, c, d, a, M[10], 23, 0xbebfbc70);
    a = hh(a, b, c, d, M[13], 4, 0x289b7ec6); d = hh(d, a, b, c, M[0], 11, 0xeaa127fa); c = hh(c, d, a, b, M[3], 16, 0xd4ef3085); b = hh(b, c, d, a, M[6], 23, 0x04881d05);
    a = hh(a, b, c, d, M[9], 4, 0xd9d4d039); d = hh(d, a, b, c, M[12], 11, 0xe6db99e5); c = hh(c, d, a, b, M[15], 16, 0x1fa27cf8); b = hh(b, c, d, a, M[2], 23, 0xc4ac5665);
    a = ii(a, b, c, d, M[0], 6, 0xf4292244); d = ii(d, a, b, c, M[7], 10, 0x432aff97); c = ii(c, d, a, b, M[14], 15, 0xab9423a7); b = ii(b, c, d, a, M[5], 21, 0xfc93a039);
    a = ii(a, b, c, d, M[12], 6, 0x655b59c3); d = ii(d, a, b, c, M[3], 10, 0x8f0ccc92); c = ii(c, d, a, b, M[10], 15, 0xffeff47d); b = ii(b, c, d, a, M[1], 21, 0x85845dd1);
    a = ii(a, b, c, d, M[8], 6, 0x6fa87e4f); d = ii(d, a, b, c, M[15], 10, 0xfe2ce6e0); c = ii(c, d, a, b, M[6], 15, 0xa3014314); b = ii(b, c, d, a, M[13], 21, 0x4e0811a1);
    a = ii(a, b, c, d, M[4], 6, 0xf7537e82); d = ii(d, a, b, c, M[11], 10, 0xbd3af235); c = ii(c, d, a, b, M[2], 15, 0x2ad7d2bb); b = ii(b, c, d, a, M[9], 21, 0xeb86d391);
    a = add(a, aa); b = add(b, bb); c = add(c, cc); d = add(d, dd);
  }
  const result = wordsToBytes([a, b, c, d]);
  let hex = "";
  for (let i = 0; i < result.length; i++) hex += (result[i] < 16 ? "0" : "") + result[i].toString(16);
  return hex;
}

function appID(name: string): string { return md5(name).slice(0, 8); }

function ts(): string { return new Date().toISOString(); }

function toString(val: Record<string, string>): string {
  return val["en"] ?? val["en-US"] ?? Object.values(val)[0] ?? "";
}

function computeHash(): string {
  const ids = apps.map((a) => appID(a.metadata.name));
  const sorted = apps
    .map((a, i) => ({ id: ids[i], name: a.metadata.name, version: a.metadata.version }))
    .sort((a, b) => a.id.localeCompare(b.id));
  return md5(sorted.map((a) => `${a.id}:${a.name}:${a.version}`).join("\n"));
}

function buildSummary(manifest: (typeof apps)[0], id: string): Record<string, unknown> {
  const m = manifest.metadata;
  return {
    id,
    name: m.name,
    title: toString(m.title),
    version: m.version,
    category: (m.categories ?? [])[0] ?? "",
    categories: m.categories ?? [],
    description: toString(m.description),
    fullDescription: m.fullDescription ?? toString(m.description),
    icon: m.icon,
    screenshots: null,
    tags: null,
    metadata: null,
    source: 1,
    updated_at: ts(),
  };
}

function buildDetail(manifest: (typeof apps)[0], id: string): Record<string, unknown> {
  const m = manifest.metadata;
  const s = manifest.spec;
  const now = ts();

  return {
    id,
    name: m.name,
    cfgType: s.type,
    chartName: `${m.name}-${m.version}.tgz`,
    icon: m.icon,
    description: toString(m.description),
    appID: id,
    title: toString(m.title),
    version: m.version,
    categories: m.categories,
    versionName: m.version,
    fullDescription: m.fullDescription ?? toString(m.description),
    upgradeDescription: m.upgradeDescription ?? "",
    developer: m.developer,
    supportArch: m.supportArch ?? [],
    website: m.website ?? "",
    sourceCode: m.sourceCode ?? "",
    license: m.license ?? "",
    entrances: s.entrance,
    permission: s.permission,
    middleware: s.middleware,
    options: s.options,
    envs: s.envs ?? [],
    requiredMemory: s.options.resources.memory,
    requiredDisk: s.options.resources.disk,
    requiredCPU: s.options.resources.cpu,
    requiredGPU: m.requiredGpu ?? "",
    apiTimeout: m.apiTimeout ?? 0,
    promoteImage: "",
    screenshots: [],
    appLabels: [],
    tags: [],
    createTime: now,
    updateTime: now,
    updated_at: now,
    i18n: {
      "en-US": {
        metadata: {
          title: toString(m.title),
          description: toString(m.description),
        },
        entrances: null,
        spec: {
          fullDescription: m.fullDescription ?? toString(m.description),
          upgradeDescription: m.upgradeDescription ?? "",
        },
      },
    },
    submitter: "",
    doc: "",
    featuredImage: "",
    legal: "",
    modelSize: "",
    namespace: "",
    onlyAdmin: false,
    count: 0,
    variants: {},
    versionHistory: [],
    metadata: {},
    subCategory: "",
    locale: "",
    rating: 0,
    target: "",
    supportClient: "",
  };
}

const CHARTS: Record<string, string> = {
  "aimllmgemma4vllm-2.0.2.tgz": "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",
};

export function getChart(fileName: string): string | undefined {
  return CHARTS[fileName];
}

export function getChartByAppName(appName: string): string | undefined {
  const app = apps.find((a) => a.metadata.name === appName);
  if (!app) return undefined;
  const chartName = `${app.metadata.name}-${app.metadata.version}.tgz`;
  return CHARTS[chartName];
}

export function getChartNames(): string[] {
  return Object.keys(CHARTS);
}

export function getSummaries(): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  apps.forEach((a) => {
    const id = appID(a.metadata.name);
    result[id] = buildSummary(a, id);
  });
  return result;
}

export function getDetails(): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  apps.forEach((a) => {
    const id = appID(a.metadata.name);
    result[id] = buildDetail(a, id);
  });
  return result;
}

export function getAppIDs(): string[] {
  return apps.map((a) => appID(a.metadata.name));
}

export function getLatest(): string[] {
  return apps.map((a) => a.metadata.name);
}

export function getHash(): string {
  return computeHash();
}
