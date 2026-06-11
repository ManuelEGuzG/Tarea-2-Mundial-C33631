import * as mundial from "../../data/mundiales.js";

export const getAll = (req, res) => {
  const isFull = req.query.include === "full";

  if (isFull) {
    const query = mundial.getAll();
    const slugs = query.map((item) => item.slug);
    const full = slugs.map((slug) => mundial.getBySlug(slug));
    return res.json(full);
  }

  const result = mundial.getAll().map((item) => item.slug);
  res.json(result);
};
