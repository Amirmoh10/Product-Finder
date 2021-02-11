// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_KEY = "3r9enub0832g86986lwywahsu282t8";
const API_BASE_URL = "https://api.barcodelookup.com/v2/products";

function queryObjectToString(query) {
  return Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

export default async (req, res) => {
  const queryString = queryObjectToString(req.body);
  const url = `${API_BASE_URL}?key=${API_KEY}&${queryString}`;

  try {
    const response = await fetch(url);
    const products = await response.json();
    res.status(200).json(products);
  } catch (e) {
    res.status(501).send("Error fetching products: ", e.message);
  }
};
