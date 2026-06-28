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
  "aimllmgemma4vllm-2.0.0.tgz": "H4sIAAAAAAAC/+1Za3ObSBb+rl9B1U5VYkaAYHnsSlKOH3Hi+C3H5MnuVkkhRFtKJzRCO8l6Zvfbftj9TfNL9jkNCAkkYTuTqc1UarMq0Y3u0+e+zjndFLzIedT6/RaD2Wp6c3f1Aev67PpP7z4d4Isz3YDPmdPnw2R/4gyH/ZH7J7Z1E9zmD0zFjDP1p+gP4jnKcp4tOcuq+z7n6TL3M54tkoxlvk+m6Yon85w92iGbePGFM5+mPKIpY152H8/nGct9VkZslZHf0ogGomD3PC9Ttnzm8pBlKZnP85gnM5r4Weqy9FGTT/5oSen0vB+cYrqP/Q1PWJaFLOH5g+VxFVNG8zTlYcx9P8h8X+J5ngZ+ICPCN6VPMt6UPvn4Q5jnSboKE5GkPhfpgjxFvk+8PCVMPy+DLPFTl+WRX5LU9/k6p0U6lzmIF6X8YH7vx3S+DsO1NFmFJGWZ+D5rlG/SXlN6k/ob3JKH2Zqkfvx9vH5y90mZ+HzNcjp/4k9zltAoCulakDmNLmVBnq6XLEzDNSWrJZmlbLkUQqg19UVUf/7QpE7/zOIsmPsxmVGzlIYpWYe2tY4I09j3hIJhS18ERKj2exGl1l9TWSRFafl0FV8aF0B/+U2U+UFK8iDL+dNfDdDfFjd+4H9v0+XRX2c0DlMaLuhvs3QtQsrZOlxG/3NOf/37vw3QX8k8SH+PlzTPZzmJ2JJ5rWJ0JfI49Slz2YIm/ptM06U4lmlO5s98KQH6gH25yMVS+mkL+uz7MiB5/EMv65w+8WyVU78r+Pt0I1rQNf1j8MzSMob8LkDMkpzqXvA85+kvK7LkKy+iPKBvrI6j50iaSR7rCi/3l6IUhwFdA5ry+R+Upam/ZIEf5rSFM7AtGPM0y2hGgpR6aU5ZP1KxhPss/+K/r37hGcmSH5fMkgVz/tNf/xc2jQRl/kvOz4T6s+o3b8H7pOp7D6HrHj/Hf7L/+6f7v+3H8Z+G9/3f/O/+7/7v/u/+7/7/Qvy/yP6Poz/98/92f+7/e/dHQ/N7TP8e0f9Hvv8/kP8/mv97998d/T+l/6vY2/v3P9j/3f/d/93/3f/d/3/f/5/H/Z9H3H8p0/63tP/fbP/3f8v+L+X/r+z/7v/u/+7/7v/u/15x/+dR958vYz/O8kjrPX7+A8xYkLEsWFCJ78srci4YrXb5eD4w5StLK6fOjK5nFmBf6FxUXGQ0zkm2XtFiWQsN3e3K1LPyNSD9FTL/U/KG/oG6/8KjLrgJxZ1uJ25nPTnmw53t3jf1PP/2jH9L6B/h+o/If3f//qP3Pz58/zP23x3=//7v//7/+H7P09P8T7P//fDDD///Xf//A2JYHyr4BAAA",
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
