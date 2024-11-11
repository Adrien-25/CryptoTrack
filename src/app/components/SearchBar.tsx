"use client";

import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface RechercheProps {
  isVisible: boolean;
  toggleSearchBar: () => void;
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<RechercheProps> = ({ onSearch, toggleSearchBar, className }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    toggleSearchBar();
  };

  return (
    <div
      className={`
        absolute top-0 bottom-0 right-0  bg-slate-800 flex items-center px-4 h-[48px] md:w-[500px] max-w-full w-full z-10 transition-all duration-300 ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Rechercher une cryptomonnaie"
        className="w-full p-2 border-b border-gray-300 focus:outline-none bg-transparent text-white text-sm"
      />
      <button
        type="button"
        className=" absolute z-20 right-2 h-7 w-7 flex items-center justify-center"
        onClick={handleClear}
      >
        <RxCross1 className="fill-white text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
