import React,{useState,useEffect} from "react";
import { useParams,Link} from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";

const officials = [
  { name: "Bagmati Province", role: "Province" },
  { name: "Mahalxmi Municipality", role: "Local" },
  { name: "Ministry Of Education", role: "Ministry" },
  { name: "Ministry of Health", role: "Ministry" },
  { name: "Lalitpur Metropolitian City", role: "Local" },
  { name: "Kathmandu Metropolitian City", role: "Local" },
  { name: "Lumbini Province", role: "Province" },
];

function Search() {
  const { role } = useParams(); // Get the role from the URL

  // Filter officials based on the role from the URL
  const [filteredOfficials,setFilteredOfficials]=useState([]);
  

   const [searchTerm, setSearchTerm] = useState("");
   useEffect(()=>{

     const filteredByRole = officials.filter(
       (official) => official.role.toLowerCase() === role.toLowerCase()
     );
    if(searchTerm!=="")
    {
        const result=filteredByRole.filter((official) =>
        official.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
        setFilteredOfficials(result);
    }
    else
        setFilteredOfficials(filteredByRole);
   },[searchTerm,role])


  return (
    <div className="p-4 flex justify-center">
      <div className="grid grid-cols-1 gap-3 w-[50%] bg-white pt-5 pb-20 px-20 rounded-xl">
        <div className="flex">
            <Link to="/">
                <ArrowLeftIcon className="h-6 w-6 text-gray-500 mr-2" />
            </Link>
          <h3 className="text-center font-semibold text-2xl text-gray-500 mx-auto">
            Select {role}
          </h3>
        </div>

        <input
          type="text"
          placeholder={`Search ${role}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        />

        {filteredOfficials.length > 0 ? (
          filteredOfficials.map((official, index) => (
            <Link key={index} to={`/${official.role}/${official.name}`}>
              <div className="border border-gray-300 rounded-md p-3 bg-white flex">
                <img src="/emblem.png" className="w-[5%] mr-4"></img>
                <p className="">{official.name}</p>
                <p className="ml-auto text-gray-500 opacity-50 text-sm">{">"}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="border border-gray-300 rounded-md p-4 bg-white text-gray-500">
            No officials found with the role: {role}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
