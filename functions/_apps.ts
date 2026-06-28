interface AppManifest {
  metadata: {
    name: string;
    version: string;
    icon: string;
    title: Record<string, string>;
    description: Record<string, string>;
    categories: string[];
    developer: string;
    website?: string;
    sourceCode?: string;
    license?: string;
    supportArch?: string[];
    fullDescription?: string;
    upgradeDescription?: string;
    requiredCpu?: string;
    requiredMemory?: string;
    requiredDisk?: string;
    requiredGpu?: string;
    limitedCpu?: string;
    limitedMemory?: string;
    apiTimeout?: number;
  };
  spec: {
    type: string;
    entrance: { name: string; title: Record<string, string>; port: number; host?: string; authLevel?: string; openMethod?: string }[];
    permission: unknown[];
    middleware: unknown[];
    options: { resources: { cpu: string; memory: string; disk: string } };
    envs?: { envName: string; required: boolean; default?: string; type?: string; editable?: boolean; applyOnChange?: boolean; description?: string; options?: { title: string; value: string }[] }[];
  };
}

export const apps: AppManifest[] = [
  {
    metadata: {
      name: "aimllmgemma4vllm",
      version: "2.0.0",
      icon: "https://raw.githubusercontent.com/bayerhazard/aimighty-llmgemma4vllm/main/icon.png",
      title: { en: "Gemma 4 26B A4B vLLM" },
      description: {
        en: "Gemma 4 26B A4B QAT-AWQ-INT4 + MTP Speculative Decoding via vLLM — optimized for coding & agentic workflows",
      },
      fullDescription:
        "Gemma 4 26B A4B – Multimodales LLM (Text + Image) mit QAT-AWQ-INT4 Quantisierung und MTP Speculative Decoding auf vLLM.\n\n**Model**\ncyankiwi/gemma-4-26B-A4B-it-qat-AWQ-INT4 (QAT + AWQ INT4, ~15 GB).\nMTP Speculative Decoding mit google/gemma-4-26B-A4B-it-assistant (3 spekulative Tokens).\n200K Token Kontext. Multimodal (Text + Image).\n\n**Inference Engine**\nvLLM v0.23.0 mit triton_attn Backend. CUDA 13.1 (RTX 5090 Blackwell SM12.0).\nfp8 KV-Cache. GPU VRAM: ~22.5 GB belegt.\n\n**Performance (RTX 5090 Blackwell)**\n- Short (50 tok): ~133 tok/s\n- Medium (500 tok): ~106 tok/s\n- Long (2000 tok): ~100+ tok/s\n- Vision: ~129 tok/s\n\n**API**\nOpenAI-kompatibel: /v1/chat/completions, /v1/models, /health.\nTool Calling via --enable-auto-tool-choice + --tool-call-parser gemma4.\nReasoning via --reasoning-parser gemma4 + --default-chat-template-kwargs enable_thinking.\n\n**Resource Usage**\nGPU: ~22.5 GB VRAM belegt (RTX 5090, 24 GB total)\nRAM: 24-40 GB\nDisk: 50 GB (Model-Download ~15 GB + Cache)\nCPU: 4-16 Kerne",
      upgradeDescription:
        "v2.0.0: Complete restructure. Renamed from aimllmgemma4vision to aimllmgemma4vllm. Switched from bg-digitalservices/Gemma-4-26B-A4B-it-NVFP4 to cyankiwi/gemma-4-26B-A4B-it-qat-AWQ-INT4 with MTP speculative decoding. New image vllm/vllm-openai:v0.23.0. Added triton_attn backend, fp8 KV cache, gemma4 tool calling. Removed NVFP4 patches (gemma4.py, fused_moe_layer.py).",
      categories: ["AI", "Developer Tools"],
      developer: "Aimighty",
      website: "https://github.com/bayerhazard/aimighty-llmgemma4vllm",
      sourceCode: "https://github.com/bayerhazard/aimighty-llmgemma4vllm",
      supportArch: ["amd64"],
      requiredCpu: "4",
      requiredMemory: "24Gi",
      requiredDisk: "50Gi",
      requiredGpu: "1",
      limitedCpu: "16",
      limitedMemory: "40Gi",
      apiTimeout: 3600,
    },
    spec: {
      type: "app",
      entrance: [
        { name: "aimllmgemma4vllm", title: { en: "Gemma 4 26B A4B vLLM" }, port: 8000, host: "aimllmgemma4vllm", authLevel: "internal", openMethod: "window" },
      ],
      permission: [],
      middleware: [],
      options: { resources: { cpu: "4", memory: "24Gi", disk: "50Gi" } },
    },
  },
];
