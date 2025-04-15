import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";

function Project() {
  const { name } = useParams();

  const [data, setData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataByName = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/projects/${name}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const jsonData = await response.json();
        setData(jsonData);

        const filtered = jsonData.filter(
          (d) => d.allocatedBy.toLowerCase() === name.toLowerCase()
        );
        setProjectData(filtered);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataByName();
  }, [name]);

  useEffect(() => {
    const filtered = data.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    setProjectData(filtered);
  }, [searchTerm, data]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="py-8 flex justify-center font-poppins overflow-x-scroll">
      <div className="grid grid-cols-1 gap-3 w-[80%] sm:w-[90%] lg:w-[80%] bg-white pt-5 pb-20 px-5 rounded-xl sm:px-10 lg:px-20">
        <div className="flex items-center">
          <Link to="/home">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500 mr-2" />
          </Link>
          <Link to="add">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
              Add Project
            </button>
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
              <div className="table-cell text-left font-semibold">ID</div>
              <div className="table-cell text-left font-semibold">Title</div>
              <div className="table-cell text-left font-semibold">Description</div>
              <div className="table-cell text-left font-semibold">Allocated By</div>
              <div className="table-cell text-left font-semibold">Allocated Amount</div>
              <div className="table-cell text-left font-semibold">Start Date</div>
              <div className="table-cell text-left font-semibold">Estimated End Date</div>
              <div className="table-cell text-left font-semibold">Completion Rate</div>
              <div className="table-cell text-left font-semibold">Last Updated</div>
            </div>
          </div>
          <div className="table-row-group">
            {projectData && projectData.length > 0 ? (
              projectData.map((project, index) => (
                <div className="table-row" key={index}>
                  <div className="table-cell text-left py-3">{index + 1}</div>
                  <div className="table-cell text-left py-3">{project.title}</div>
                  <div className="table-cell text-left py-3">
                    {project.description?.slice(0, 50)}...
                  </div>
                  <div className="table-cell text-left py-3">{project.allocatedBy}</div>
                  <div className="table-cell text-left py-3">Rs. {project.allocatedAmount}</div>
                  <div className="table-cell text-left py-3">{project.startDate}</div>
                  <div className="table-cell text-left py-3">{project.endDate}</div>
                  <div className="table-cell text-left py-3">{project.completionRate}%</div>
                  <div className="table-cell text-left py-3">{project.lastUpdated}</div>
                </div>
              ))
            ) : (
              <div className="p-4 col-span-full text-gray-500">No results found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
