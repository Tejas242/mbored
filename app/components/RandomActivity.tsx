"use client";

// components/RandomActivity.tsx
import { useState } from "react";
import FilterSelect from "./FilterSelect";

interface Activity {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  key: string;
  link: string;
}

// Main component for the Random Activity Generator
const RandomActivity: React.FC = () => {
  // State variables for activity data and filter options
  const [activity, setActivity] = useState<Activity | null>(null);
  const [filters, setFilters] = useState<{
    type: string | null;
    participants: number | null;
  }>({
    type: null,
    participants: null,
  });

  // Function to fetch a random activity based on filters
  const fetchRandomActivity = async () => {
    const { type, participants } = filters;
    let apiUrl = "http://www.boredapi.com/api/activity/";

    if (type) {
      apiUrl += `?type=${type}`;
    }

    if (participants !== null) {
      apiUrl += type
        ? `&participants=${participants}`
        : `?participants=${participants}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data: Activity = await response.json();
      setActivity(data);
    } catch (error) {
      console.error("Error fetching random activity:", error);
    }
  };

  // Function to handle changes in filter options
  const handleFilterChange = (
    filterType: string,
    value: string | number | null
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  // Filter options for type and participants
  const filterOptions = {
    type: [
      "education",
      "recreational",
      "social",
      "diy",
      "charity",
      "cooking",
      "relaxation",
      "music",
      "busywork",
    ],
    participants: [1, 2, 3, 4],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-body">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md text-center w-full max-w-md">
        {/* Heading */}
        <h2 className="text-4xl mb-6 font-bold text-gray-200">
          Random Activity Generator
        </h2>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap mb-4">
          {Object.keys(filterOptions).map((filterType) => (
            <FilterSelect
              key={filterType}
              label={
                (filterType.charAt(0).toUpperCase() +
                  filterType.slice(1)) as keyof typeof filterOptions
              }
              options={filterOptions[filterType as keyof typeof filterOptions]}
              value={filters[filterType as keyof typeof filters]}
              onChange={(event) =>
                handleFilterChange(filterType, event.target.value)
              }
            />
          ))}
        </div>

        {/* Button to fetch random activity */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
          onClick={fetchRandomActivity}
        >
          Get Random Activity
        </button>

        {/* Display random activity information */}
        {activity && (
          <div className="text-left bg-gray-700 p-4 rounded-md mb-4">
            <h3 className="text-2xl mb-2 font-semibold">{activity.activity}</h3>
            {Object.keys(activity)
              .filter((key) => key !== "key") // Exclude 'key' property
              .map((key) => (
                <p key={key} className="mb-2">
                  <span className="font-semibold text-gray-300">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>{" "}
                  {key === "link" ? (
                    <a href={String(activity[key as keyof Activity])} target="_blank" rel="noreferrer noopener">
                      {activity[key as keyof Activity]}
                    </a>
                  ) : (
                    activity[key as keyof Activity]
                  )}
                </p>
              ))}
          </div>
        )}

        {/* Footer with GitHub link */}
        <div className="mt-auto">
          <p className="text-gray-400 text-sm">
            Created by{" "}
            <a
              href="https://github.com/Tejas242"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Tejas242
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomActivity;
