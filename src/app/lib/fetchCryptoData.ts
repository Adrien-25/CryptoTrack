import axios from "axios";

export async function fetchCryptoData() {
  const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
    params: {
      vs_currency: "eur",
      order: "market_cap_desc",
      per_page: 100,
      page: 1,
      sparkline: false,
      price_change_percentage: "1h,24h,7d",
    },
  });
  return response.data;
}
