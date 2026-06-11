import * as mundial from "../../data/mundiales.js";
import { z } from "zod";

const schema = z.object({
  pais: z.string()
    .trim()
    .nonempty("El pais no puede estar vacio")
    .min(2, "El pais debe tener al menos 2 caracteres")
    .max(60, "El pais no puede tener mas de 60 caracteres")
});

const DEFAULT = "Pais invalido";

export const getByCampeon = (req, res) => {
  const parsed = schema.safeParse(req.params);

  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? DEFAULT;
    return res.status(400).json({ error });
  }

  const result = mundial.getByCampeon(parsed.data.pais);
  res.json(result.map((item) => item.slug));
};
