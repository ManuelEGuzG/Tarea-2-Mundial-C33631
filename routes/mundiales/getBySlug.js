import * as mundial from "../../data/mundiales.js";
import schema from "./slug.schema.js";

const DEFAULT = "Slug invalido";

export const getBySlug = (req, res) => {
  const parsed = schema.safeParse(req.params);

  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? DEFAULT;
    return res.status(400).json({ error });
  }

  const result = mundial.getBySlug(parsed.data.slug);

  if (!result) {
    return res.status(404).json({ error: "Mundial no encontrado" });
  }

  res.json(result);
};
