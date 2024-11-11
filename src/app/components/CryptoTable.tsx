"use client";

import useSWR from "swr";
import { FaCaretUp, FaCaretDown, FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import { useFavorites } from "../context/FavoritesContext";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CryptoTableProps {
  query: string;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ query }: CryptoTableProps) => {
  // export default function CryptoTable({query }) {
  const { favoriteIds, showFavoritesOnly, toggleFavorite } = useFavorites();

  // GET CRYPTO DATA
  const { data, error } = useSWR("/api/cryptos", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });
  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  // ROUNDING TO HUNDREDTHS AND ADDING COLOR + ICON
  const formatPercentage = (value: string) => {
    if (typeof value !== "number") return { text: "N/A", colorClass: "", icon: null };
    const rounded = Math.round(value * 100) / 100;
    let formatted = rounded.toFixed(2);
    formatted = formatted.replace(/\.?0+$/, "");
    const colorClass = value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-gray-500";
    const icon = value > 0 ? <FaCaretUp /> : value < 0 ? <FaCaretDown /> : null;
    return { text: formatted, colorClass, icon };
  };

  // FORMATE BIG NUMBER
  function formatLargeNumber(number: number) {
    return new Intl.NumberFormat("fr-FR", {
      notation: "compact",
      maximumFractionDigits: 1,
      style: "decimal",
      // currency: "EUR",
    }).format(number);
  }

  // API DATA DISPLAY
  interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    market_cap_rank: number;
    price_change_percentage_24h_in_currency: string;
    market_cap: number;
    market_cap_change_24h: number;
    image: string;
  }

  // FAV FONCTIONNALITY
  // FILTER CRYPTO FAVORITE
  const displayedCryptos = showFavoritesOnly
    ? data.filter((crypto: CryptoData) => favoriteIds.includes(crypto.id))
    : data;

  console.log("Query in CryptoTable:", query);
  const searchedFav = query
    ? displayedCryptos.filter((crypto: CryptoData) => crypto.name.toLowerCase().includes(query.toLowerCase()))
    : // ? displayedCryptos.filter((crypto: CryptoData) => query.includes(crypto.id))
      displayedCryptos;

  return (
    <div className="p-2 lg:p-4 lg:pt-0 pt-0 overflow-y-scroll overflow-x-hidden no-scrollbar cardlist">
      <div
        className="card-header grid opacity-70 h-8 bg-[#000002cc] sticky z-30 -mx-4 px-4 top-0 text-white text-xs	
        grid-cols-[2rem_1fr__5rem_6rem]
        lg:grid-cols-[2.5rem_2.5rem_2.5fr_1fr_1fr_1fr_1fr] 
        xl:grid-cols-[2.5rem_2.5rem_2.5fr_1fr_1fr_1fr_1fr_12rem]
        "
      >
        <div data-comment="fav">&nbsp;</div>
        <div data-comment="position" className="position items-center justify-center hidden lg:flex">
          №
        </div>
        <div data-comment="compound-name" className="px-4 flex items-center">
          Token
        </div>
        <div data-comment="current-price" className="px-2 flex items-center justify-end">
          Prix, €
        </div>
        <div data-comment="change" className="px-2 items-center justify-end hidden lg:flex">
          24h %
        </div>
        <div data-comment="marketcap" className="px-2 flex items-center justify-end">
          Cap Bours<span className="hidden lg:block">, €</span>
        </div>
        <div data-comment="volume" className="px-2 items-center justify-end hidden lg:flex">
          Vol 24h<span className="hidden lg:block">, €</span>
        </div>
        <div data-comment="chart" className="px-4 items-center justify-end mr-8 hidden xl:flex">
          Dern. 7j
        </div>
      </div>
      <div className="cards-header-mobile"></div>
      <div data-comment="card-list" className="pt-2 lg:pt-4 flex gap-1 flex-col min-h-[85vh]">
        {/* {data.map((crypto: CryptoData) => ( */}
        {searchedFav.map((crypto: CryptoData) => (
          <div
            key={crypto.id}
            className="card-content grid  items-center m-[1px] py-4 bg-slate-900 bg-opacity-50 rounded-md border border-gray-500 border-opacity-50 text-white text-xs	sm:text-sm 
            grid-rows-[1fr_1fr]
            lg:grid-rows-1
            grid-cols-[2rem_1fr__5rem_6rem]
            lg:grid-cols-[2.5rem_2.5rem_2.5fr_1fr_1fr_1fr_1fr] 
            xl:grid-cols-[2.5rem_2.5rem_2.5fr_1fr_1fr_1fr_1fr_12rem]"
          >
            <button
              data-comment="fav"
              className="px-2 lg:block h-4 w-4 py-0 lg:px-4 row-start-1 row-end-3 lg:row-auto"
              onClick={() => toggleFavorite(crypto.id)}
            >
              {favoriteIds.includes(crypto.id) ? (
                <FaStar fill="#FCDC92" className="cursor-pointer w-4 h-4" />
              ) : (
                <FaRegStar className="cursor-pointer w-4 h-4" />
              )}
            </button>
            <div data-comment="position" className=" text-slate-400 text-center	hidden lg:block">
              {crypto.market_cap_rank}
            </div>
            <div
              data-comment="compound-name"
              className="lg:flex  justify-start flex-row w-full items-center grid lg:grid-rows-[1fr_1fr] row-start-1 row-end-3 lg:row-auto grid-cols-[2rem_1fr]  gap-x-2 lg:gap-x-0"
            >
              <div data-comment="currency-icon" className="row-start-1 row-end-3 lg:row-start-auto lg:row-end-auto">
                <Image alt="icon" className="h-8 w-8 max-w-fit lg:mx-4" width={30} height={30} src={crypto.image} />
              </div>
              <div data-comment="ticker" className="uppercase	flex items-center pr-4">
                {crypto.symbol}
              </div>
              <div data-comment="title" className="flex items-center pr-2 text-slate-400 ">
                {crypto.name}
              </div>
            </div>
            <div data-comment="current-price" className="text-right whitespace-nowrap	">
              {crypto.current_price} €
            </div>
            <div
              data-comment="change"
              className={`text-right flex items-center justify-end row-start-2 row-end-2 lg:row-auto ${
                formatPercentage(crypto.price_change_percentage_24h_in_currency).colorClass
              }`}
            >
              {/* {formatPercentage(crypto.price_change_percentage_24h_in_currency)}% */}
              <span className="mr-1">{formatPercentage(crypto.price_change_percentage_24h_in_currency).icon}</span>
              {formatPercentage(crypto.price_change_percentage_24h_in_currency).text}%
            </div>
            <div data-comment="marketcap" className="text-right row-start-1 row-end-3 lg:row-auto px-2">
              {formatLargeNumber(crypto.market_cap)}
            </div>
            <div data-comment="volume" className="text-right px-2 hidden lg:block">
              {formatLargeNumber(crypto.market_cap_change_24h)}
            </div>
            <div data-comment="chart" className="hidden xl:block"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CryptoTable;
