import React, { useEffect, useState } from "react";
import EstimatedBudget from "../components/EstimatedBudget";
import ExpectedRevenue from "../components/ExpectedRevenue";
import CurrentExpenditure from "../components/CurrentExpenditure";
import CurrentRevenue from "../components/CurrentRevenue";
import FiscalYear from "../components/FiscalYear";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [data, setData] = useState(null);
  const [dashboardData, setDashboardData] = useState([]);
  const { level, name } = useParams();
  const navigate= useNavigate();

  useEffect(() => {
    // Fetch dashboard data based on level
    const fetchDataByName = async () => {
      try {
        let response;
        if (level !== "National") {
          response = await fetch(
            `http://localhost:5000/dashboardrequestbyname/${name}`,
            {
              credentials: "include",
            }
          );
        } else {
          response = await fetch(
            `http://localhost:5000/dashboardrequestbylevel/National`,
            {
              credentials: "include",
            }
          );
        }
        if (response.status === 403 || response.status===401) {
          navigate("/forbidden"); // Navigate to /forbidden if status is 403
          return; // Exit the function early
        }

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result = await response.json();
        setDashboardData(result); // Store fetched data in dashboardData
        setSelectedYear(Math.max(...result.map((item) => item.date)));
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchDataByName();
  }, [name,level,navigate]);

  useEffect(() => {
    // Set data based on the selected year
    if (selectedYear !== null) {
      const selectedData = dashboardData.find(
        (item) => item.date === selectedYear
      );
      setData(selectedData);
    }
  }, [selectedYear, dashboardData]);

  return (
    <div className="container mx-auto pb-10 px-4 lg:!px-16 font-poppins ">
      <div className="text-center flex flex-col items-center">
        <div className="emblem w-[15%] md:w-[8%] mb-2">
          <img src="/emblem.png" alt="emblem" className="w-[100%]"></img>
        </div>
        <h2 className="text-base md:text-2xl font-bold mb-4">
          Welcome to the {level !== "National" ? `${name}` : "National"}{" "}
          Financial Dashboard
        </h2>
      </div>

      <FiscalYear
        dashboardData={dashboardData}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        data={data || { level: level, name: name || null }} // Pass an empty object if data is null
      />

      

      {data ? (
        <>
          <EstimatedBudget data={data} />
          <CurrentExpenditure data={data} />
          <ExpectedRevenue data={data} />
          <CurrentRevenue data={data} />
        </>
      ) : (
        <p>
          {dashboardData.length === 0 ? "No data available." : "Loading..."}
        </p>
      )}
      { level!=="National" && (
        <div>
          <Link to={`projects`}>
            <button className="flex justify-center ml-1 mt-2 p-2 rounded-lg text-white border-2 border-red-500 bg-red-500 hover:ring-2 hover:border-red-600 hover:ring-red-600 hover:!bg-red-600 transition duration-300 ease-in-out">
              Projects
              <ArrowRightIcon className="h-6 w-6 text-white mr-2" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
