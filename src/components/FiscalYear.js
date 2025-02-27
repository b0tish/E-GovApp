import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Ensure you're using 'react-router-dom'
import Modal from "./Modal";

const FiscalYear = ({ dashboardData, selectedYear, setSelectedYear, data }) => {
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [isUpdate, setisUpdate] = useState(false); // Modal state

  const location = useLocation(); // Get the current location
  const isDashboard = location.pathname.startsWith("/dashboard/"); // Check if the path starts with '/dashboard/'

  const handleStartNewYear = () => {
    setIsOpen(true); // Open the modal
    setisUpdate(false);

  };

  const closeModal = () => {
    setIsOpen(false); // Close the modal
    setisUpdate(false);
  };

  const handleUpdateData = () => {
    setisUpdate(true);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="fiscalYear flex justify-between px-2 lg:!px-10">
        <div className="text-center flex flex-col items-center justify-center mb-4">
          <label className="font-semibold" htmlFor="selectYear">
            Select Fiscal Year:
          </label>
          <select
            className="selectYear mt-2 p-2 rounded-lg border-2 border-black hover:ring-2 hover:ring-black hover:!bg-red-100 transition duration-300 ease-in-out"
            value={selectedYear || ""}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            id="selectYear"
          >
            {dashboardData.length > 0 ? (
              dashboardData.map((data) => (
                <option key={data.date} value={data.date}>
                  {data.date}/{data.date + 1}
                </option>
              ))
            ) : (
              <option value="">No fiscal years available</option>
            )}
          </select>
        </div>

        {isDashboard && ( // Check if the path is a dashboard path
          <>
            {data.date && (
              <div className="text-center flex flex-col items-center justify-center mb-4 text-base">
                <label className="font-semibold" htmlFor="newYear">
                  Update Data:
                </label>
                <button
                  onClick={handleUpdateData}
                  value="Start"
                  className="mt-2 py-2 px-4 rounded-lg bg-white border-2 border-black hover:ring-2 hover:ring-black hover:!bg-red-100 transition duration-300 ease-in-out"
                  id="newYear"
                >
                  Update
                </button>
              </div>
            )}

            <div className="text-center flex flex-col items-center justify-center mb-4 text-base">
              <label className="font-semibold" htmlFor="newYear">
                Start New Fiscal Year:
              </label>
              <button
                onClick={handleStartNewYear}
                value="Start"
                className="mt-2 py-2 px-4 rounded-lg bg-white border-2 border-black hover:ring-2 hover:ring-black hover:!bg-red-100 transition duration-300 ease-in-out"
                id="newYear"
              >
                Start
              </button>
            </div>

            <Modal
              isUpdate={isUpdate}
              isOpen={isOpen}
              closeModal={closeModal}
              data={data}
            />
          </>
        )}
      </div>
      <div>
        {data.updatedAt &&(<h2>Last updated on: {new Date(data.updatedAt).toLocaleDateString()} {" "}
      {new Date(data.updatedAt).toLocaleTimeString()}</h2>)}
      </div>
    </div>
  );
};

export default FiscalYear;
