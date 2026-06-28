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
  "aimllmgemma4vllm-2.0.0.tgz": "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",
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
