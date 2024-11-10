"use client";

import useSWR from "swr";
import { FaCaretUp, FaCaretDown } from "react-icons/fa"; // Assurez-vous d'installer react-icons
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CryptoTable() {
  const { data, error } = useSWR("/api/cryptos", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  // Arrondissement au centième et ajout de couleur et icone
  const formatPercentage = (value: string) => {
    if (typeof value !== "number") return { text: "N/A", colorClass: "", icon: null };
    const rounded = Math.round(value * 100) / 100;
    let formatted = rounded.toFixed(2);
    formatted = formatted.replace(/\.?0+$/, "");
    const colorClass = value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-gray-500";
    const icon = value > 0 ? <FaCaretUp /> : value < 0 ? <FaCaretDown /> : null;
    return { text: formatted, colorClass, icon };
  };

  //Formatage des grands nombre
  function formatLargeNumber(number: number) {
    return new Intl.NumberFormat("fr-FR", {
      notation: "compact",
      maximumFractionDigits: 1,
      style: "decimal",
      // currency: "EUR",
    }).format(number);
  }

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

  // grid-cols-[2.5rem_2.5rem_2.5fr_1fr_1fr_1fr_1fr]
  // xl:grid-cols-[2.5rem_2.5rem_2.5fr_1fr_1fr_1fr_1fr_12rem]
  return (
    <div className="p-2 lg:p-4 lg:pt-0 pt-0 overflow-y-scroll no-scrollbar cardlist">
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
          Cap. Bours.<span className="hidden lg:block">, €</span>
        </div>
        <div data-comment="volume" className="px-2 items-center justify-end hidden lg:flex">
          Vol. 24h<span className="hidden lg:block">, €</span>
        </div>
        <div data-comment="chart" className="px-4 items-center justify-end mr-8 hidden xl:flex">
          Dern. 7j
        </div>
      </div>
      <div className="cards-header-mobile"></div>
      <div data-comment="card-list" className="pt-2 lg:pt-4 flex gap-1 flex-col">
        {/* <div className="card-content grid grid-cols-[3.5rem_2.5rem_2.5fr_1fr_1fr_1fr_1fr_12rem] grid-rows-1 items-center m-[1px] py-4"></div> */}
        {data.map((crypto: CryptoData) => (
          <div
            key={crypto.id}
            className="card-content grid  items-center m-[1px] py-4 bg-slate-900 bg-opacity-50 rounded-md border border-gray-500 border-opacity-50 text-white text-xs	sm:text-sm 
            grid-rows-[1fr_1fr]
            lg:grid-rows-1
            grid-cols-[2rem_1fr__5rem_6rem]
            lg:grid-cols-[2.5rem_2.5rem_2.5fr_1fr_1fr_1fr_1fr] 
            xl:grid-cols-[2.5rem_2.5rem_2.5fr_1fr_1fr_1fr_1fr_12rem]"
          >
            <div data-comment="fav" className="px-2 lg:block h-4 w-4 py-0 lg:px-4 row-start-1 row-end-3 lg:row-auto ">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer w-4 h-4"
              >
                <path
                  d="M8.0067 1C7.60704 0.999864 7.19895 1.24098 6.95724 1.7209L5.47051 4.68914L2.08167 5.15556C0.991849 5.30259 0.638769 6.33941 1.42578 7.08475L3.87445 9.3961L3.30604 12.6401C3.11886 13.6903 4.01703 14.325 4.98954 13.8274C5.3653 13.6346 7.29736 12.6639 8.0067 12.3007L11.0238 13.8274C11.9975 14.325 12.8984 13.6909 12.7073 12.6401L12.117 9.3961L14.5658 7.08475C15.3565 6.34213 15.0216 5.30558 13.9317 5.15556L10.521 4.68914L9.05614 1.7209C8.81478 1.24078 8.40633 1.0002 8.0067 1Z"
                  fill="#FCDC92"
                ></path>
              </svg>
            </div>
            <div data-comment="position" className=" text-slate-400 text-center	hidden lg:block">
              {crypto.market_cap_rank}
            </div>
            <div
              data-comment="compound-name"
              className="lg:flex  justify-start flex-row w-full items-center grid lg:grid-rows-[1fr_1fr] row-start-1 row-end-3 lg:row-auto grid-cols-[2rem_1fr]  gap-x-2 lg:gap-x-0"
            >
              <div data-comment="currency-icon" className="row-start-1 row-end-3 lg:row-start-auto lg:row-end-auto">
                {/* <img alt="icon" className="h-8 w-8 max-w-fit lg:mx-4" src={crypto.image} /> */}
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
}
