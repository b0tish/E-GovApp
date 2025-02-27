import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";


function ContactSearch() {
  const { level } = useParams();
  console.log(level);

  const [filteredByLevel, setFilteredByLevel] = useState([]);
  const [filteredOfficials, setFilteredOfficials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfficials = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/getlevelnames/${level}`
        ); // Update the API endpoint as needed
        if (!response.ok) {
          throw new Error(`Error fetching officials: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        setFilteredByLevel(data.names);
        setFilteredOfficials(data.names); // Assuming the API returns an array of officials
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOfficials();
  }, [level]);

  // Effect to filter officials based on the search term
  useEffect(() => {
    if (searchTerm !== "") {
      const result = filteredByLevel.filter((name) =>
        name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setFilteredOfficials(result);
    } else {
      // Fetch officials again if the search term is cleared
      setFilteredOfficials(filteredByLevel);
    }
  }, [searchTerm,filteredByLevel]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-8 flex justify-center font-poppins">
      <div className="grid grid-cols-1 gap-3 w-[80%] sm:w-[75%] lg:w-[50%] bg-white pt-5 pb-20 px-5 rounded-xl sm:px-10 lg:px-20">
        <div className="flex items-center">
          <Link to="/contact">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500 mr-2" />
          </Link>
          <h3 className="text-center font-medium font-sans text-lg sm:text-xl md:text-2xl text-gray-500 mx-auto">
            Select {level}
          </h3>
        </div>

        <input
          type="text"
          placeholder={`Search ${level}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border bg-gray-50 border-gray-300 rounded-md p-2 mb-4 w-full text-gray-500 text-base transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {filteredOfficials.length > 0 ? (
          filteredOfficials.map((official, index) => (
            <Link
              key={index}
              to={`/contact/${level}/${official}`}
              className="group"
            >
              <div className="border border-gray-300 rounded-md p-3 flex items-center transition duration-300 ease-in-out group-hover:bg-red-50">
                <div className="w-[10%] sm:w-[7%] md:w-[5%] mr-4 flex justify-center">
                  <img alt="emblem" src="/emblem.png" className="w-[100%]" />
                </div>
                <p className="text-sm sm:text-base">{official}</p>
                <p className="ml-auto text-gray-500 opacity-50 text-sm">
                  {">"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="border border-gray-300 rounded-md p-4 bg-white text-gray-500">
            No Results found
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactSearch;
