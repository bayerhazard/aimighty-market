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
  "aimllmgemma4vllm-2.0.1.tgz": "H4sIFAAAAAAA/ykAK2FIUjBjSE02THk5NWIzVjBkUzVpWlM5Nk9WVjZNV2xqYW5keVRRbz1IZWxtAOw77XLbOJL5zafo4k5dnMSkKFl2Mqy6q1NsxVHFshVJzs7e1ZUKJlsSziDAAUEpmoyn9h3unnCf5AogKZGU/JFxJrNXZeRHLKC78dXd6C8SGjEWzTCKSHvBWNQ4nhOp3BWJ2LNv1TzP847abfO/53n1/73D196z5mGr5bVarWb79TOv2W4fNJ+B981WcEdLE0XkM+/Rc9U39/+kkZh+QplQwX1YtCwSx+ufLddzm1aISSBprEzXqeYTaEPr6C102m/hY2fsdP760emdj9vwCvrjAYxiDFJGFF0gnGAgQspnsKAEFmdnfRAchuOfLIBD70cP3jISXC+RMWsuIvRhrlSc+I3GjKp5euUGImpckRXKOfmFyLBBaERnc7VyKhxrRYRyRShHmfiWAxgRynwgYUT5vxcoLhMBYRYAJ3qiTt5tZT/rQmAlIpUBGnK/b01qFWu6ccxoQPTZWYvqsf7Z9160LflfEJZi8k0VwD3y32p67UL+vfbBgZb/o8OjJ/n/Hk2iYdFjkXLlQ9OyaERm6FsAEmORUCXkyoeMMxiLHBEjJ9QCUGTmw8JzWweuZwHEKWMDwWiw8qE3PRdqIDFBriwjYhcLlJKG6INtW9OUsWrnlvxZCcoFDcw6MlE6ZmmiUPYGei4hlQ9vPM+zLIlrWQVgNKLK/AUQxKkPzSPzd4SR2UbbO6Wmgy9oSIkR5pmB29EbYeRD02u1zVn8nGJSId2uUG61b6VsIV9ovP7FSfdsct7pd30IVoRf0yVtmD07bad19NbptN86VDk/E7XWqWu0zlmvM/JhA37lRCp2zGEB9Ds/TTK4s+65D3bLsKBtAZwOLif9bv9i+LfJ5bh31vuPzrh3oUE898fXh3aOe37Zn4y6H0catdz3tjM+ft89mYwvPnTP9eib5o8G4GTYeTfuDvPdzISYMdy1F5IkNFGEKwvATDLoHm+oHWhSn87O+pPuT+NhZ9IZno58cJwZcpRGazqB4FM6g4wpZMoVjfCYkSQ5N4o7O23LiqW4ylhAS7NK4+yiYqLmPjTmSJiaZz0b1tE/p4SyVOJ4LjGZCxb60GxlIzFKKsIRBoKHiQ8HWS/lVFHCTpCR1XrsKBvTSxOpqqIwukCOSfK713P49avZvZymZ1lpgjKJSSZXJI5PiCI+NAQjEpOGFEJNk8YaqBEvAmf9y1m/dPN5c34QzKdzLvAqaK7+ad6yp/b1bev9VxjFjChMGiHGTKwi5I91B+5+/5sH3uHBxv4/bD3zmq8P262n9/97tLL9T+I4aSya1jXloQ8n6+u3IlQk1LpibUBvvdjZQKZc4MsXcIfIkCTonhfdcHOjFSK5QparQxLHOykBUOFeiygWCbqFJbALkHAulHkoNhQLgztxSRy7VyuFSpIQXSoayJUkXNsK8Pw/v9h6wbZv1+na+/ZcJGr3iNbXtq/19b5NA8Ft3y4cBEmWbuYkaJ0ZCK605DzMX2hoH6ahCboxn9n7tqKK6cXVHS7tRNn7NknV/AwXyGzfplyh5ITZ+7Y2zvqo5iK0fXtJeSiW9s1/PX/A0czi1KH8vzFQPthKpmg/AEmvd+O0fbv9P2BqbZBRieEkM7Jy4+tuHHOm2z6sPtIHYK/9N9s4cLaVxBjkdrJGSzIrMlGSKJytMn7MbNchBhKJQj2MDAMlZDYcERXMz0oS8WDOL7R0Tqckn7qxCsm7BK02JUe1FPK6EcyliNAJcUpSVmWJr1jkevI7jvVWdfIQZLHkKG9TN7+CkjQapdMp/Qz22nyxMz30EPKSLB0Sx849a6SihGaOunRcBZfotm2/6pV/yhzu+uBmmRKNUVt4Vx22JKskHwt5UvTnHtI7KhOVjyqUEeVme6eSBDjYaUYCaGEtAihZj3O7ns83bdxEsEs7MF3uxm2Emxt/a1iRGdzc2FU6g5LzuIWx8SzLNxeIKCI83PC4A5X1OaA5Ezc3LWdJGfiHvY0/9qLU7zgGL3QiESIzV78Dy7hjVTT9ZpQ6PNf8q4Dox6PUYb/JnbQNREQ+5xMz5NV5yy5edWatuzM/1EkVZfSXLOBUxt7tBr7YmpunkZPgz0lpoHQfyBdu2V2EX+HnVCgs30uZ0pVWbxg6SlwjfwDNqrt5G3Wi9MOincMrElwjD0ujSlIl+IQoxSs41wsnIMEcnVBr5NLQNH5TAayPk1SJCoCSaaIciZFQ6AQixCq6WHImSOiEVJYGGuZOk8Y8nc0on01JUEVDTq4YOrHEKf1sVkrzV7CAMJENJ4qcGKUTSxHFZU56/sU2smL7zZvnuyjrbThKCOYEc0Frs2f9hDEnJjLB8sIzwa+Kxya+m3vn1YWYrdq+/cNeOUjwwt63o8IyiVRs79s8jSYlYpOMS2z/h71apOBFbU8SSSI45bMHrTd/w5xgTpRTPJvO9VIrhOrKs7OaqDnl15TPbB+0Gq9NvhWbuE0B5VGfYixTpxudsx4CMBFXf0so1qC7BaFM0KijB1I0sHeSLGua+4mWoe8iu1sF3Ut/N9pdE5XZ7l7yZeC7iNZY8l66Nfi7SL9/N3l/sWupd2uNNbKZoY79TorIL3VqyzOQqD7gaojT6shtPp2DfFEDvMaVDxdnnWF3NLkcdYeT95enp73z03ed4+7WQnQTJnFEWCZLu9l3NDnpDW/d/hbO8eVJZ3LS/dQ77haccdbr98YTb5uG3Wq3PS+yd3Lj+G+DHaeehxTrCCZMeTnqTt6ddUbve+fvusPJqNMfnHV3LN0uPev60a9YHmtja2BifyXGyW1pV6OUOQUglkKJQDAfxseDdX8l9l20cgy8aCZgXbY1C0Q3g3aDOK1OuIls34WWwdQx6yHwL1+A8hA/30oH7CqKfTdFE5j/aqIRRjW61aD+/WdVwH/1aa0RH31eBaU7T2whWBphX6S8yngZI9ekCiDSgIMsMl0bzIPpAymusHxK2uU/RVU9uCy4XTqALCjv5kRcPV7felwXgTrOliRsR8hvx67D1mSq6gzdsYgyYJXGzgj87ZR2gFfp1YP2t5OqQpapFCmHx91aQeWrrm2D9LvubY3+yIvbLOPRN7cm9Q2ubk3rtrvLBHfLB68JpXY0jbhad9ziOm3j5mkeuLlp6P8bWwH/LYWQBa1OqDSRqtWFPM6iV392qPqp/QHtjvxPYY48uhTkvvqvo+bhpv7j9dEzr/nae6r/+j6tUv9VpH5G2c3/k+Z9ipBqpqd22M96IJt1bXwXurQUc9t6xHaZ34rIGaoHWep1G70a6n/Qzv6M+6/LvztHFtEZFxK/1Rz3yX+ruan/Omxm9V+t9pP8f4/2FxgQpVDyBJSA7N5hOUcOVyllpngzJsE1mWHiWn+BExGkEXKF4SbxpxnGTeaNUARJI5gTqSbFIzKZpTTExoalJlPKMGlY7sloMlJCouXOqLJeumr2y5OB8Se0Lfm/MMVAfcLpFJNvUwh+j/wftl63avXfRwdN70n+v0dzHMcS1StfZ7qfe27Tc73ndYB1cbNVth6eL1rPH2Yx/IF1A9+2Wv0ff/9fE8GM6C8YwlRIyCH+BcgMuaIBLIW8njKxTLKKOhruTtffWXqwOXBTWvDcAgiIwpmQtPAGHej08j9OcIFMxChhLARLrE1Vi3VP3rZWbKgdyVsg7yuV+EMrPzZVLD5kRSyZ1VjUvPhQlLysTcH8BLOk+uYU03gmSYgnZab41RBbaBjPh2MRxQwVmiS7TAOVSnRhiPoUQ/0i1o/HhdGSmrQmTKWI4GrmhHRGFWG5WZc0TrfrYM8/vRu0NbmHFv7Ckqq54dBSigzCnENdOMdlljrfKs3285psFzphqPewSYlCnjDdh2n8Bj58ApMT3c+zZqCEYBAQxswMQ4zEAkPIlh6bVG4CexmsG6/2YZomGE4igROmr9mNVy9ceCeYloZMfj4ukR8cgbEJIBB8kSVuE9cCmKaM7biYOsv94+//A/2UKRqJkDBMQNPdG+NnBa+gp0/gBURUVWX7Y0q4oglFmfIZpDy8XdZJOjVrdS0z/cuXfREiYy9fmp8Pvq69j50xvILOXz+C/r0PvzUP4fTtC9eQuXV2vfIHVE/D3oHmg+sCf2xSpTnxlud9yHrggxa9z8otnVjtrNbb7PEpSuQBQpfPKMd8w+bacg4yqyuzz9uMfVyTgoHmgduEveH4p9q3PDDqN1uul68u4zTnWHOaC6eDS/g07PR9+K3VcvUJwRUynKn1ugYop0JGWqHtIv4iX6cDo7n2vfYOPVDi+oUPvzUPDvSfjSQH6GNI00hDbEC8owrImeAz2Gt5ZQjvVQXkE81U82/N1o/5QL7SzqCXL+YiRt7pOdq/I4peaQ3VWDS1KawaQaZgNNfvm94s3LZfVIFnp6Q1ORxnomeen1sz9/BqR8Y+l+CM1rBIj+eE6unyQtxf3ZMch1o+fH1FwzwdAZcJmRWMczq4LF2qvuP8Zje3uA+tth5UQhGW1Z4YVmi1nbYHp29NzwlNrn041L9hz8iic5IXVeQyBa/AcFNG4VjP23aaR/ABJUfL2AD5A1n6zgtgiVcJVb/7IzOAbNPHInwEDfMVGhZPOnLncqQpp7F+mjsymBdDJAqPig9PqMTwuPjkpOjoVz88MTmvHMx89JJ39KtfvhTYxSlXOk+z71VilBFNDNeXvxIw+dssnZtkA3ScxbF9OMg+OggxRh4iD0pmS2aOZAZkEeZemzv/9q9Nt9lyW45XFFlkpmWyShSaAl/9mBhlFjPs8UQRxnyY6sf2yVt8ak/tqT21R7X/CwAA//+CJcUGAEAAAA==",
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
