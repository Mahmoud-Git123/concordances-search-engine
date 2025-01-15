'use client';
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Concordance from "@/components/Concordances";
import Statistics from "@/components/Statistics";
import Visualization from "@/components/Visualisation";
import search from "@/hooks/search";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const { concordances, statistics, speakers, loading, error } = search(searchTerm, caseSensitive);

  const handleSearch = (term, caseSensitive) => {
    setSearchTerm(term);
    setCaseSensitive(caseSensitive);
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Search Conversations</h1>
      <SearchBar onSearch={handleSearch} />
      {searchTerm && loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {searchTerm && !loading && !error && (
        <div className="flex flex-col md:flex-row items-start w-full space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="flex-1 p-5 hover:border border-blue-500 rounded-lg border-opacity-80">
            <Concordance concordances={concordances} speakers={speakers} searchTerm={searchTerm} caseSensitive={caseSensitive} />
            </div>
            <div className="flex-1 p-5 hover:border border-blue-500 rounded-lg border-opacity-80">
            <Statistics statistics={statistics} />
          </div>
            <div className="flex-1 p-5 hover:border border-blue-500 rounded-lg border-opacity-80">
          <Visualization statistics={statistics} />
          </div>
        </div>
      )}
    </div>
  );
}