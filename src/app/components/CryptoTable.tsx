 "use client";

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CryptoTable() {
  const { data, error } = useSWR('/api/cryptos', fetcher);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Price</th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody>
        {data.map((crypto: any) => (
          <tr key={crypto.id}>
            <td>{crypto.market_cap_rank}</td>
            <td>{crypto.name}</td>
            <td>${crypto.current_price}</td>
            <td>${crypto.market_cap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
