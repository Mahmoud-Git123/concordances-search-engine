import React, { useState } from 'react';
import type { Concordance } from '@/types';

interface ConcordanceProps {
    concordances: Concordance[];
    searchTerm: string;
    caseSensitive: boolean;
}

const Concordance = ({ concordances, searchTerm, caseSensitive }: ConcordanceProps) => {
    const [visibleCount, setVisibleCount] = useState(10);


    //  highlight the text and underline it to show where exactly the concrdance is in the scenetence
    const highlightConcordance = (text: string) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, caseSensitive ? 'g' : 'gi');
        return text.replace(regex, '<strong><u>$1</u></strong>');
    };

    // const concordanceFound = (text: string) => {
    //     return text;
    // }
    const displayedResults = concordances.slice(0, visibleCount);

    return (
        <div className="concordance">
        <h1 className="text-3xl font-bold italic mb-4">Concordances</h1>

        {concordances.length > 0 ? (
          <>
            {/* displays the count of visible concordances */}
            <p className='italic'>Showing {displayedResults.length} out of {concordances.length} concordances found</p>
            {/* lists the concordances with a scrollable containerr*/}
            <ul className="overflow-y-auto max-h-96">
              {/*map over the concordances to display each one */}
              {displayedResults.map((result, index) => (
                <li key={index}>
                  <span dangerouslySetInnerHTML={{ __html: highlightConcordance(result.snippet) }} />
                  </li>
              ))}
            </ul>

          {concordances.length > 10 && (
            <div className="mt-4 flex space-x-2">
              {/* show more button */}
              {visibleCount < concordances.length && (
                <button className="px-4 py-2 bg-gray-700 text-white rounded-2xl hover:bg-blue-800 transition-colors duration-300 "
                  onClick={() => setVisibleCount(visibleCount + 30)}
                >
                  Show more
                </button>
              )}
              {/* show less button (only displayed if visible count is more than 10, i.e. show more button has been clicked*/}
              {visibleCount > 10 && (
                <button className="px-4 py-2 bg-gray-700 text-white rounded-2xl hover:bg-blue-800 transition-colors duration-300 "
                onClick={() => setVisibleCount(visibleCount - 30)}
                >
                  Show less
                </button>
              )}

            </div>
          )}
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};
  
  export default Concordance;
  