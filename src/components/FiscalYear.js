import React from "react";
const FiscalYear = ({dashboardData,selectedYear,setSelectedYear}) =>{
    return (
      <div className="fiscalYear flex justify-between px-2 lg:!px-10">
        <div className="text-center flex flex-col items-center justify-center mb-4">
          <label className="font-semibold" htmlFor="selectYear">
            Select Fiscal Year:
          </label>
          <select
            className="selectYear mt-2 p-2 rounded-lg border-2 border-black hover:ring-2 hover:ring-black hover:!bg-red-100 trasnsition duration-300 all ease-in-out"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            id="selectYear"
          >
            {dashboardData.map((data) => (
              <option key={data.date} value={data.date}>
                {data.date}/{data.date + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center flex flex-col items-center justify-center mb-4 text-base">
          <label className="font-semibold" htmlFor="newYear">
            Start New Fiscal Year:
          </label>
          <button
            value="Start"
            className="mt-2 py-2 px-4 rounded-lg bg-white border-2 border-black  hover:ring-2 hover:ring-black hover:!bg-red-100 trasnsition duration-300 all ease-in-out"
            id="newYear"
          >
            Start
          </button>
        </div>
      </div>
    );
}

export default FiscalYear;