"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import CryptoTable from "@/app/components/CryptoTable";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = (query: string) => {
    setQuery(query);
    // console.log("Query in page.tsx:", query);
  };

  return (
    <div className="p-4 bg-slate-800  h-screen overflow-hidden box-border">
      <Header onSearch={handleSearch} />
      <CryptoTable query={query} />
    </div>
  );
}
