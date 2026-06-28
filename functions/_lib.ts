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
  "aimllmgemma4vllm-2.0.3.tgz": "H4sIFAAAAAAA/ykAK2FIUjBjSE02THk5NWIzVjBkUzVpWlM5Nk9WVjZNV2xqYW5keVRRbz1IZWxtAOx763LbuJJwfvMpunimvtgTk6Iu9mRY9W2tfI0qlq1Ycs6c3dpSwWRLwhoEGBCUomQ8dd5h9wnPk2wBJCWSki+Z5GRmt4z8iAV0NxpAd6Mb3SQ0YiyaYhSRzpyxqHE0I1K5SxKxF9+qeZ7nHXQ65n/P8+r/e/s/eS+a+62W12o3W/udF16z02l7L8D7Zhw80NJEEfnC++q56ov7X9JITN+jTKjgPsxbFonj1c+W67ltK8QkkDRWputMywl0oHVwCN3OIbzrjpzuX985vYtRB15BfzSAYYxByoiic4RjDERI+RTmlMD8/LwPgsPV6BcLYN/72YNDRoLbBTJmzUSEPsyUihO/0ZhSNUtv3EBEjRuyRDkjn4gMG4RGdDpTS6cisVZEKFeEcpSJbzmAEaHMBxJGlP9rgeIyERBmAXCiJ+rm3Vb2s64EViJSGaAh9/t4UstY041jRgOi986aV7f1jz73om3o/5ywFJNvagAe0f9W0+vk+t/yOu221v+D/YNn/f8eTaIR0SORcuVD07JoRKboWwASY5FQJeTSh0wyGIscESMn1AJQZOrD3HNbbdezAOKUsYFgNFj60JtcCDWQmCBXllGxyzlKSUP0wbatScpYtXND/6wE5ZwGho9MlY5YmiiUvYGeS0jlw2vP8yxL4kpXARiNqDJ/AQRx6kPzwPwdYWSW0fHOqOngcxpSYpR5auC29EYY+dD0Wh2zFx9STCqkOxXKrc69lC3kc43Xvzw+OR9fdPsnPgRLwm/pgjbMmp2O0zo4dLqdQ4cq5wNRK5u6Quue97pDH9bgN06kYsdsFkC/+8s4gzs/ufDBbhkRtC2As8H1uH/Sv7z62/h61Dvv/Vt31LvUIJ7780/7do57cd0fD0/eDTVque+wOzp6c3I8Hl2+PbnQo6+bPxuA46vu6ejkKl/NVIgpw21rIUlCE0W4sgDMJIOTozW1tib1/vy8Pz75ZXTVHXevzoY+OM4UOUpjNZ1A8AmdQiYUMuWKRnjESJJcGMOd7bZlxVLcZCKgtVmlcXZQMVEzHxozJEzNsp616OifE0JZKnE0k5jMBAt9aLaykRglFeEQA8HDxId21ks5VZSwY2RkuRo7yMY0ayJVVRRG58gxSX43P/tfzs12dpqeZaUJyiQmmV6ROD4mivjQEIxITBpSCDVJGiugRjwPnNUvZ3XTzWbNWTuYTWZc4E3QXP5p7rLn9uVt4/5XGMWMKEwaIcZMLCPkXxsOPHz/N9vtg/21/3+g7/+f9vfbz/f/92hl/5/EcdKYN61bykMfjlfHb0WoSKhtxcqB3rixs4HMuMDnz+BeIUOSoHtRdMPdnTaI5AZZbg5JHG+lBECFeyuiWCToFp7ANkDCuVDmolhTLBzuxCVx7N4sFSpJQnSpaCBXknDtK8DLf/9sa4Zt367TtffsmUjU9hFtr21f2+s9mwaC275dBAiSLNwsSNA2MxBcac15WrzQ0DFMQxN0Yz6192xFFdPMdXv9LOgyMZe+Vk0cZe/ZJFWzc5wjs32bcoWSE2bv2do/66OaidD27QXloVjYd//x8gm7M41Th/L/xED5YCuZov0EJM3yOm77dlvwhKm1T0YlhuPMz8r9r4dxzLb6cM+uPoHAKoqzTRhnW0mMQe4ta7Qk8yUTJYnC6TKTysyDvcJAIlGoh5FhoITMhiOigtl5SS+eLP+Frc7plLRUN1Yh+ZC61abkqBZC3jaCmRQROiFOSMqqUvEFTK4mf2Bb7zUqT0EWC47yPqPzKyhJo2E6mdCPYK+cGDuzRk8hL8nCIXHsPMIjFSU0s9Wl7SqkRLdNL1Zz/j4Lu+uDazYlGte2iLG6bEGWST4W8qToz+OkUyoTlY8qlBHlZnlnkgQ42OpMAmh9LZ5Rsh7nfmufL9oEi2CXVmC63HXwCHd3/sawIlO4u7OrdAalEHIDYx1flk8uEFFEeLiWcQcq/DmgJRPXJy2nSRn4h511VLZb6nccgxc6kQiRmaPfgmWCsiqavjlKHZ5r/lVA9BVS6rBf56HaGiIiH/OJGfLqvOVArzqzNt9ZNOqkijL6KXt2KmNvDwZ3N+bmaeQk+CEpDZTOA/ncLQeN8Ct8SIXC8rmUKd1o84aho8Qt8ifQrAad91EnSt8tOkS8IcEt8rA0qiRVgo+JUryCczt3AhLM0Am1RS4NTeLXDwA6yS2NHaZvsDL7CaMh5dNxdslW8APCzBsoakpJQBgmdfpiMmGCaAJOQj+VmbFbnao4fEgJV5vnGYgolpgkemuRJ0JW56ivkaRKVACUTBPlSIyEQicQIVbRxYJrBp2QytJAw8hl0pil0ynl0wkJqmjIyQ1DJ5Y4oR/NJtL8Mi8gzBuNE0VOjNKJpYjisja8/Gwbfbf95t3LbZT1MhwlBHOCmaC12bN+wpgTE5lgmfHMeFVVfP1Snb8zVBkxS7V9+4ed8nPHrr1nR4WDFanY3rN5Go1LxMaZpNv+Dzu1N4/d2pokkkRwLQNP4Te/h51gRpRTXP3O7UIbtSrn2V6N1YzyW8qntg/6KqpNvvHKcp8Rzd+virHsSljbzdUQgHk79jcUewW6XZnLBI1JfSJFA/sgybK1fJxoGfohstvN6KP0t6M9NFFZ7B4lXwZ+iGhNJB+lW4N/iPSb0/Gby22sPmw1Vshmhjr2qRSRX+rU3nMgUb3F5RVOqiP3RacO8nkN8BaXPlyed69OhuPr4cnV+M312Vnv4uy0e3SywYhuwqTACMt0abv4DsfHvat7l7+Bc3R93B0fn7zvHZ0UknHe6/dGY2+Tht3qdDwvsrdK4+hvgy27nj+O1hHMg+v18GR8et4dvuldnJ5cjYfd/uD8ZAvrdsk10Y5LxXtaOYwD84pZEpw8HnA1SllSAGIplAgE82F0NFj1V17xi1Z+zS+aeXov+8sFoptBu0GcVidcv9E/hJbB1DHrj/mfPwPlIX68lw7YVRT7YYomxfDFRCOManSr6YnH96qA/+LdWiF+9X4VlB7csblgaYR9kfKq4GWCXNMqgEgDDrI39tpgnhYYSHGD5V2aKRWfoapuXPZMX9qALL3g5kRcPV5felxXgTrOhiZsvvXfj12HrelUNaB7gIkyYJXG1lzC/ZS2gFfp1dMP95OqQpapFMmTrzu1gsoXHdsa6Xed2wr9Kw9uzcZXn9yK1Dc4uhWt+84uU9yNd4SaUupg2air9cAprhJQbp6wgru7hv6/sZG62DAI2cPbMZXmtW15KY+yF7g/+tH9T9QeyP8Ul/hXl4I8Vv910Nxf13/8dPDCa/7ktZvP+Z/v0Sr1X0XqZ5id/J8071M8pmbavcXr1APZrCuXtbBApde2DdO/zWlVRE5RPcm/rXu21Uf+J63sjzj/uv67M2QRnXIh8VvN8Zj+t5rr+q/9Zlb/1eo86//3aH+BAVEKJU9ACcjOHRYz5HCTUmaKN2MS3JIpJq71FzgWQRohVxius35aYNxk1ghFkDSCGZFqXFwi42lKQ2ysRWo8oQyThuUeD8dDJSRa7pQq60dXTT89X8t/QNvQ/0tTDNQnnE4w+TaF4I/o/4HX6ZTqP7wXXvOg7bWe9f97NMdxLFE98lWO+6XnNj3Xe1kHWBU3W2Xv4eW89fJpHsM/sWjg21ar/+Pv/23e/SL6CUOYCAk5xP8DMkWuaAALIW8nTCySrKKOhtsT9Y/VHaz33NQVvLQAAqJwKiQtwigHur38j2OcIxMxShgJwRJrXdhiPZK0rdUb6gjsHsgnlEr8U4s/1oUsPpRSbKuyFx+KqpeVQ5hvYpZUX29kGk8lCfG4LBq/GmJzA+PDqZABgkQnWfIAdmYkmUEgGKOaHEzox113Dd/yoRuGGD6YJ6xlB2HndNA8MBKUDzj5QAa+C6+2pw1hJ1xyEtEATgev4e17MN0QEEZvsuRNhrqZUTQlyYewczS4hmRBYjM5E3zqmKP5qCCWiFG8plHOM27JLsIOfowZDajadeEKtZCF2me4t0aptGeeD0ciihkqNIUMMg1UKrFCpy6FLgwX1KSOYSJFBDdTJ6RTqgjLHeikcbZZcXzx/nTQ0eSeWmINC6pmxhaUUngQ5rbAhQtcZOUJG0Xwfl797ubyUEo7Q56U3oNJbI7NiMlentUDJQTTZ8jMDFcYiTmGkLEem3R5AjsZrBsv92CSJhiOI4FjIy5uvNx14VQwbXcyS/Vugbx9AMb7gkDweZYcT/QZTFLGtgh/3Tr+4+//Bf2UKRqJ0Iieprsz0pLyCnp6B3YhoqpqRd8ZmUkoypRPIeXh/VaVpBPDq2uZ6X/8sS9CZOzHH83PJx/XzrvuCF5B96/vQP/eg9+a+3B2mGvovbNrzp9Qpw47bS0HtwX+yKRyc+Itz3ub9cDbTIfc0o7V9mq1zB6foEQeIJzwKeWYL9gcWy5Bhruy+Bxm4uOaFBE0224Tdq5Gv9S+moJhv9lyvZy7TNKcIy1pLpwNruH9Vbfvw2+tlqt3CG6Q4VSt+BqgnAgZ6XtjG/HdnE8HhjMd5e7se6DE7a4PvzXbbf1nI8kB+hjSNNIQaxDvoAJyLvgUdlpeGcJ7VQF5T7Mb8Ldm6+d8IOe0O+jlzFzGyLs9R0fSRNEbfQs05k0ddKhGkBkYLfV7pjd7Dtwr6u2zXdIXJhxlqmcu+nsrC4xNrFcU5Bqc0boq0vc5oXo6v1D3V48k76GWr18d0VWeLoHrhEwLwTkbXJcOVZ9xfrLrU9yDVkcPKqEIy+p7jCi0Ok7Hg7ND03NMk1sf9vVv2DG66BznRR+5TsErMNKUUTjS83ac5gG8RcnRMt5W7oeUvqgDWOBNQtXv/pwPIFv0kQi/gob53g8Lzwm5cz3UlNNYe0BdGcyKIRKFB8UnPlRieFR83FN09Kuf+JicXA5mPi/KO/rVb4wK7GKXK51n2ZdBMcqIJkbqy99jmPxylm5OsgE6yt7ZfWhnn3eEGCMPkQcl7zDz+jJXvXiGX3mV//L/m26z5bYcrygCyZz4ZJkoNKXU+jIxxixm2OOJIoz5MNGX7XNc/tye23N7bv8H2/8EAAD//6dyb8AAQgAA",
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
