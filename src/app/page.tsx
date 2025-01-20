'use client';
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Concordance from "@/components/Concordances";
import Statistics from "@/components/Statistics";
import Visualization from "@/components/Visualisation";
import UploadButton from "@/components/UploadButton";
import Search from "@/hooks/search";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [xmlData, setXmlData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { concordances, statistics, loading } = Search(searchTerm, caseSensitive, xmlData);

  const handleSearch = (term, caseSensitive) => {
    if (!xmlData) {
      setError("No file uploaded");
      return;
    }
    setSearchTerm(term);
    setCaseSensitive(caseSensitive);
    setError(null); // Clear any previous errors
  };

  const handleUpload = (data) => {
    setXmlData(data);
    setError(null); // Clear any previous errors
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Search Conversations</h1>
      <UploadButton onUpload={handleUpload} />
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500">{error}</p>}
      {searchTerm && loading && <p>Loading...</p>}
      {searchTerm && !loading && !error && (
        <div className="flex flex-col md:flex-row items-start w-full space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="flex-1 p-5 hover:border border-blue-500 rounded-lg border-opacity-80">
            <Concordance concordances={concordances} searchTerm={searchTerm} caseSensitive={caseSensitive} />
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