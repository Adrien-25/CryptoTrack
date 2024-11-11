// "use client"

// import { useState } from "react";
import Header from "@/app/components/Header";
import CryptoTable from "@/app/components/CryptoTable";
// import FavoritesTable from "./components/FavoritesTable";

export default function Home() {
  return (
    <div className="p-4 bg-slate-800  h-screen overflow-hidden box-border">
      <Header />
      <CryptoTable />
    </div>
  );
}
