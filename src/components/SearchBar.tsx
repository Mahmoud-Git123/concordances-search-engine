import { useState } from 'react';

const SearchBar = ({onSearch}) => {
    const [searchWord, setSearchWord] = useState('');
    const [caseSensitive, setCaseSensitive] = useState(false);

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchWord, caseSensitive);
    }  

    return (
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
        className="border rounded-l px-4 py-2 text-black"
        type="text" value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)} 
        placeholder="Search..." 
        />
        <label className="flex items-center space-x-1">
        <input
            type="checkbox" 
            checked={caseSensitive} 
            onChange={(e) => setCaseSensitive(e.target.checked)} // updates caseSensitive state when the checkbox value is checked/not checked
        />
        <span>Case Sensitive</span> {/* Text label for the checkbox */}
        </label>
        <button className="px-4 py-2 bg-gray-700 text-white rounded-2xl hover:bg-blue-800 transition-colors duration-300 ">
        Search
        </button>
    </form>

    )
};

export default SearchBar;