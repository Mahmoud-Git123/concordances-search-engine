import React from "react";
import type { Statistics } from "@/types";

const Statistics = ({ statistics }: { statistics: Statistics | null }) => {
    if (!statistics) {
        return <p>No statistics available, please try again.</p>;

    }
    const { totalSpeakers, genderNumbers, ageNumbers } = statistics;
    
    return (
        <div>
            <h2 className="text-3xl font-bold italic mb-4">Statistics</h2>
            <p>Total Speakers: {totalSpeakers}</p>
            <div>
                <p>Male Speakers: {genderNumbers.male}</p>
                <p>Female Speakers: {genderNumbers.female}</p>
            </div>
        <h3>Age Numbers</h3>
        <ul>
            {Object.entries(statistics.ageNumbers).map(([age, count]) => (
            <li key={age}>
                Age {age}: {count}
            </li>
            ))}
        </ul>
            
        </div>
    )

}

export default Statistics;