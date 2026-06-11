import * as mundial from "../../data/mundiales.js";

export const random = (req, res) => {
  const result = mundial.getRandom();
  res.json(result);
};
