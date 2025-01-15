import React from "react";
import type { Statistics } from "@/types";

const Statistics = ({ statistics }: { statistics: Statistics | null }) => {
    if (!statistics) {
        return <p>No statistics available, please try again.</p>;

    }
    const { totalSpeakers, genderNumbers } = statistics;
    
    return (
        <div>
            <h2 className="text-3xl font-bold italic mb-4">Statistics</h2>
            <p><strong>Total Speakers:</strong> {totalSpeakers}</p>
            <div>
                <p><strong>Male Speakers:</strong> {genderNumbers.male}</p>
                <p><strong>Female Speakers:s</strong> {genderNumbers.female}</p>
            </div>
        <h3 className="italic font-bold">Ages of Speakers:</h3>
        <ul>
            {Object.entries(statistics.ageNumbers).map(([age, count]) => (
            <li key={age}>
                Age {age}: {count} speakers
            </li>
            ))}
        </ul>
            
        </div>
    )

}

export default Statistics;