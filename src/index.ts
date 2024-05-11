import { Hono } from "hono";
import { cors } from "hono/cors";
import { getKey, setKey } from "./data";

const app = new Hono();
app.use(cors());

app.get("/get/:key", async (c) => {
  const key = c.req.param("key");
  const data = await getKey(key);
  if (!data) return Response.json({ error: "Key not found" }, { status: 404 });

  return Response.json(data, { status: 200 });
});

app.post("/set/:key", async (c) => {
  const key = c.req.param("key");
  const { value } = await c.req.json();
  if (!value)
    return Response.json({ error: "Value is required" }, { status: 400 });

  setKey(key, value);
  return new Response(null, { status: 204 });
});

export default {
  fetch: app.fetch,
  port: 6781,
};
