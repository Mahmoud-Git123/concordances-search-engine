import { useState, useEffect } from "react";
import { parseXML } from "@/lib/xmlParsing";
import { Concordance, Statistics } from "@/types";

//  creating the search custom hook which takes searchTerm and caseSensitive as arguments
const Search = (searchTerm: string, caseSensitive: boolean) => {
  const [concordances, setConcordances] = useState<Concordance[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //   useEffect is used to fetch and process data when searchTerm or caseSensitive changes
  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);
      setError(null);

      try {
        const xmlData = await fetch("/large_conversation.xml");
        const text = await xmlData.text(); // converts the fteched data from xml to text

        const { conversations } = await parseXML(text); //  parsing the text in order to get the conversations using xmlParsing

        // filters the conversations recieved from parsing the xml data based on the word searched and checking case sensitivity
        const filteredConcordances = conversations.filter((conversation: any) => {
            const text = conversation.text;
            let matchFound;
            if (caseSensitive) {
              matchFound = text.includes(searchTerm);
            } else {
              matchFound = text.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return matchFound;
          }).map((conversation: any) => ({
            snippet: conversation.text, 
            gender: conversation.gender,
            age: conversation.age,
            timestamp: conversation.timestamp,
            // speakerId: `Speaker ${index + 1}`, 
          }));

        const stats = calculateStatistics(conversations, searchTerm, caseSensitive);

        //  now that we have statistics and filitered text we can update states
        setConcordances(filteredConcordances);
        setStatistics(stats);
      } catch (error) {
        setError("Failed to load or parse XML data.");
      } finally {
        setLoading(false);
      }
    };

    // fetch for data, ONLY when a search word is given
    if (searchTerm) fetchData();
  }, [searchTerm, caseSensitive]);

  const calculateStatistics = (conversations: any[], searchTerm: string, caseSensitive: boolean): Statistics => {

    const stats: Statistics = { //creating and initalising the statistics object
      totalSpeakers: 0,
      genderNumbers: { male: 0, female: 0 },
      ageNumbers: {},
    };

    // iterating over each conversation fetched to update statistics
    conversations.forEach((conversation: any) => {
      const text = conversation.text;
      // checking if the search term is found in the text, considering case sensitivity
      let matchFound;
      if (caseSensitive) {
        matchFound = text.includes(searchTerm);
      } else {
        matchFound = text.toLowerCase().includes(searchTerm.toLowerCase());
      }

      // update statistics only if a match is found
      if (matchFound) {
        // Updating gender distribution
        stats.genderNumbers[conversation.gender] =
          (stats.genderNumbers[conversation.gender] || 0) + 1;

      
        stats.ageNumbers[conversation.age] =
          (stats.ageNumbers[conversation.age] || 0) + 1;
      }
    });


    stats.totalSpeakers = Object.values(stats.genderNumbers).reduce(
      (total, count) => total + count,
      0
    );

    return stats;
  };

  return { concordances, statistics, loading, error };
};

export default Search;