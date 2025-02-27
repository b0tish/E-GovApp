import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";


function Project() {

  const data = [
    {"title": "project1","description": "testestsets setse t se ts et", "allocatedBy": "Ministry of Health", "startDate": "2024-02-03", "endDate": "2028-04-05", "allocatedAmount": "50000000", "completionRate": "10", "lastUpdated": "2024-02-05"},
    {"title": "project2","description": "testestsets setse t se ts et", "allocatedBy": "Ministry of Health", "startDate": "2024-02-03", "endDate": "2028-04-05", "allocatedAmount": "50000000", "completionRate": "10", "lastUpdated": "2024-02-05"}
  ]

  const [projectData, setProjectData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Effect to filter officials based on the search term
  useEffect(() => {
    if (searchTerm !== "") {
      const result = projectData.filter((project) =>
        project["title"].toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      console.log(result);
      setProjectData(result);
      console.log(projectData);

    } else {
      // Fetch officials again if the search term is cleared
      setProjectData(data);
    }
  }, [searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-8 flex justify-center font-poppins overflow-x-scroll">
      <div className="grid grid-cols-1 gap-3 w-[80%] sm:w-[90%] lg:w-[80%] bg-white pt-5 pb-20 px-5 rounded-xl sm:px-10 lg:px-20">
        <div className="flex items-center">
          <Link to="/home">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500 mr-2" />
          </Link>
          <h3 className="text-center font-medium font-sans text-lg sm:text-xl md:text-2xl text-gray-500 mx-auto">
            Select projects
          </h3>
        </div>

        <input
          type="text"
          placeholder={`Search projects...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border bg-gray-50 border-gray-300 rounded-md p-2 mb-4 w-full text-gray-500 text-base transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <div className="table w-full">
          <div className="table-header-group ">
            <div className="table-row ">
              <div className="table-cell text-left">ID</div>
              <div className="table-cell text-left">Title</div>
              <div className="table-cell text-left">Description</div>
              <div className="table-cell text-left">Allocated By</div>
              <div className="table-cell text-left">Allocated Amount</div>
              <div className="table-cell text-left">Start Date</div>
              <div className="table-cell text-left">Estimated End Date</div>
              <div className="table-cell text-left">Completion Rate</div>
              <div className="table-cell text-left">Last Updated</div>
            </div>
          </div>
          <div className="table-row-group">
            {projectData.length > 0 ? (
              projectData.map((project, index) => (
                <div className="table-row" key={index}>
                  <div className="table-cell text-left py-3">{index+1}</div>
                  <div className="table-cell text-left py-3">{project["title"]}</div>
                  <div className="table-cell text-left py-3">{project["description"].slice(20)}</div>
                  <div className="table-cell text-left py-3">{project["allocatedBy"]}</div>
                  <div className="table-cell text-left py-3">Rs.{project["allocatedAmount"]}</div>
                  <div className="table-cell text-left py-3">{project["startDate"]}</div>
                  <div className="table-cell text-left py-3">{project["endDate"]}</div>
                  <div className="table-cell text-left py-3">{project["completionRate"]}%</div>
                  <div className="table-cell text-left py-3">{project["lastUpdated"]}</div>
                </div>
              ))
            ): (
              <div className="border border-gray-300 rounded-md p-4 bg-white text-gray-500">
                No Results found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
