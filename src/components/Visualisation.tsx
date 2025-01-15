import React from "react";
import { Statistics } from "@/types";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  //Register the components - this removes "category is not a scale" error
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
const Visualisation = ({ statistics }: { statistics: Statistics | null }) => {

    if (!statistics) {
        return <p>No statistics available, please try again.</p>;

    }
    const {genderNumbers, ageNumbers } = statistics;

    const data = {
        labels: ["Male", "Female", ...Object.keys(ageNumbers).map((age) => `Age ${age}`)],
        datasets: [
            {
                label: "Number of Speakers",
                data: [
                    genderNumbers.male,
                    genderNumbers.female,
                    ...Object.values(ageNumbers), //... is used to include all the values from the ageNumbers object

                ],
                backgroundColor: ["lightskyblue", "mediumorchid",  "orange", "yellow", "pink", "brown"],
            },
        ],
    }
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Speaker Statistics",
            }
        }
    }
    return (
        <div>
          <h2 className="text-3xl font-bold italic mb-4">Statistics Visualisation</h2>
          <Bar data={data} options={options} />
        </div>
      );
};

export default Visualisation;
