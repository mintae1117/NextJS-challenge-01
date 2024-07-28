import Link from "next/link";

export const API_URL = "https://books-api.nomadcoders.workers.dev";

interface IBestSellersProps {
  display_name: string;
  list_name_encoded: string;
};

type BestSellersResponse = {
  results: IBestSellersProps[];
}

async function getBestSellers(): Promise<BestSellersResponse> {
  const response = await fetch(`${API_URL}/lists`);
  return response.json();
}

export default async function Page() {
  const bestSellers = await getBestSellers();
  return (
    <div>
      <h1>The New York Times Best Seller Explorer</h1>
      {bestSellers.results.map((e) => 
        <Link key={e.display_name} href={`/list/${e.list_name_encoded}`}>
          <h2>{e.display_name}→</h2>
        </Link>
      )}
    </div>
  );
}