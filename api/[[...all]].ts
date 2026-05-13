import path from "node:path";
import { fileURLToPath } from "node:url";

let server: { fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> } | undefined;

function getDistServerPath() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, "../dist/server/server.js");
}

async function getServer() {
  if (!server) {
    const distServerPath = getDistServerPath();
    const module = await import(distServerPath);
    server = module.default ?? module;
  }
  return server;
}

function buildRequest(req: RequestInit & { method?: string; headers?: Record<string, string | string[] | undefined>; url?: string }) {
  const url = new URL(req.url ?? "/", `https://${req.headers?.host ?? "localhost"}`);
  const headers = new Headers();

  if (req.headers) {
    for (const [name, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        headers.set(name, value);
      } else if (Array.isArray(value)) {
        headers.set(name, value.join(","));
      }
    }
  }

  return new Request(url.toString(), {
    method: req.method,
    headers,
    body: req.method && req.method.toUpperCase() !== "GET" && req.method.toUpperCase() !== "HEAD" ? req.body : undefined,
  });
}

async function respondWithNode(res: any, response: Response) {
  res.statusCode = response.status;

  response.headers.forEach((value, name) => {
    if (name.toLowerCase() === "transfer-encoding") return;
    res.setHeader(name, value);
  });

  const buffer = response.body ? Buffer.from(await response.arrayBuffer()) : null;

  if (buffer) {
    res.end(buffer);
  } else {
    res.end();
  }
}

export default async function handler(req: any, res: any) {
  try {
    const serverInstance = await getServer();
    const request = buildRequest({
      method: req.method,
      headers: req.headers,
      url: req.url,
      body: req,
    });
    const response = await serverInstance.fetch(request, undefined, undefined);
    await respondWithNode(res, response);
  } catch (error) {
    console.error("Vercel SSR error:", error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}
