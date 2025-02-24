import { useEffect, useState } from "react";
const ProvinceAllocationForm = () => {
  const [provinces, setProvinces] = useState([]);
  const ministries = [
    { name: "Ministry of Education", budget: 150000 },
    { name: "Ministry of Health and Population", budget: 400000 },
    { name: "Ministry of Defence", budget: 300000 },
  ];

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://localhost:5000/provinces");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.log("province error");
      }
    };

    fetchProvinces();
  }, []);

  const [budget, setBudget] = useState(ministries[0]["budget"]);

  // const [districts, setdistricts] = useState(districtsProvince[provinces[0]]);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <div className="w-1/2 p-8 rounded-xl border-2 border-gray-200">
        <div className="text-3xl font-bold">Budget Allocation</div>
        <form method="POST">
          <div className="pt-6">
            <label className="font-bold block mb-2" htmlFor="ministry">
              Ministry
            </label>
            <select
              className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white"
              id="ministry"
              onChange={(e) => {
                setBudget(
                  ministries.filter(
                    (ministry) => ministry["name"] === e.target.value,
                  )[0]["budget"],
                );
              }}
            >
              {ministries.map((ministry) => (
                <option value={ministry["name"]}>{ministry["name"]}</option>
              ))}
            </select>
          </div>

          <div className="pt-6">
            <label className="font-bold block mb-2" htmlFor="province">
              Province
            </label>
            <select
              className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white"
              id="province"
            >
              {provinces.map((province) => (
                <option value={province._id}>{province.name}</option>
              ))}
            </select>
          </div>

          <div className="pt-6">
            <label className="font-bold block mb-2" htmlFor="ministry">
              Remaining Budget
            </label>
            <div
              className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white"
              id="ministry"
            >
              {budget}
            </div>
          </div>

          <div className="pt-6">
            <label className="font-bold block mb-2" htmlFor="budget">
              Budget
            </label>
            <input
              className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white"
              type="number"
              step={10000}
              id="budget"
              placeholder="In Rupees. (Ex: 1000000)"
            />
          </div>

          <div className="pt-6">
            <label className="font-bold block mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white"
              rows={10}
              id="description"
            ></textarea>
          </div>

          <div className="pt-6">
            <input
              className="w-full p-3 text-white font-bold bg-black rounded-lg"
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProvinceAllocationForm;
