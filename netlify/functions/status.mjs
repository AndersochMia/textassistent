// Frågar efter resultatet av en pågående granskning.
import { getStore } from "@netlify/blobs";

const ID_RE = /^[A-Za-z0-9-]{16,64}$/;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

export default async (req) => {
  const id = new URL(req.url).searchParams.get("id") || "";
  if (!ID_RE.test(id)) return json(400, { status: "error", error: "Ogiltigt id." });

  try {
    const store = getStore({ name: "analysis-results", consistency: "strong" });
    const entry = await store.get(id, { type: "json" });
    if (!entry) return json(200, { status: "pending" });

    // Resultatet raderas när det hämtats, så att inga texter ligger kvar.
    await store.delete(id);
    return json(200, entry);
  } catch (e) {
    return json(200, { status: "error", error: "Kunde inte läsa resultatet från servern." });
  }
};

export const config = { path: "/api/status" };
