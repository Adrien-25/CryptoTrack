"use client";

import React, { useState } from "react";
import { useFavorites } from "@/app/context/FavoritesContext";
import { MdFormatListNumbered } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import SearchBar from "@/app/components/SearchBar";

interface HeaderProps {
  // query: string;
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const { toggleShowFavorites, showFavoritesOnly } = useFavorites();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleSearch = (query: string) => {
    onSearch(query);
    // console.log("Recherche:", query);
  };

  return (
    <header className="mb-4 relative">
      <div className="flex justify-between">
        <div className="header-logo">
          <div className="relative flex items-center justify-start">
            <div className="relative w-12 h-12 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-8 w-8">
                <circle cx="100" cy="100" r="90" fill="#f0f0f0" stroke="#333" strokeWidth="4" />
                <path d="M100 40 L140 100 L100 160 L60 100 Z" fill="#4CAF50" stroke="#333" strokeWidth="4" />
                <path
                  d="M85 70 L115 70 L115 130 L85 130 M85 100 L115 100"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-white pl-2 text-xl font-bold tracking-wide hidden lg:block">CRYPTOTRACK</div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-x-4	">
          {/* SEARCH BUTTON */}
          <div>
            <button
              type="button"
              className="h-8 w-8 leading-8 text-lg p-0 border-transparent flex items-center justify-center   duration-300 rounded-full"
              onClick={toggleSearchBar}
            >
              <FaSearch className="h-4 w-4 fill-white" />
            </button>
          </div>
          {/* SWITCH BUTTON */}
          <div>
            <button
              type="button"
              className="h-8 w-8 leading-8 text-lg p-0 border-transparent flex items-center justify-center   duration-300 rounded-full"
              id="switch"
              onClick={toggleShowFavorites}
            >
              {showFavoritesOnly ? (
                <MdFormatListNumbered className="h-4 w-4 fill-white" />
              ) : (
                <FaRegHeart className="h-4 w-4 fill-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      <SearchBar
        isVisible={isSearchVisible}
        toggleSearchBar={toggleSearchBar}
        onSearch={handleSearch}
        className={`${isSearchVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />
    </header>
  );
}
