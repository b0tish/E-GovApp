import { useState } from "react";

const LocalGovernmentAllocationForm = () => {
    const provinces = ["bagmati", "karnali", "gandaki"];
    const districtsProvince = {
            "bagmati": {
                "govtBodies": ["Lalitpur", "Kathmandu", "Bhaktapur"],
                "remainingBudget": 500000,
            },
            "karnali": {
                "govtBodies": ["Pokhara", "District 12"],
                "remainingBudget": 400000,
            },
            "gandaki": {
                "govtBodies": ["District 34", "District 69"],
                "remainingBudget": 390000,
            },
        }

    const [districts, setdistricts] = useState(districtsProvince[provinces[0]]["govtBodies"]);
    const [budget, setBudget]= useState(districtsProvince[provinces[0]]["remainingBudget"]);

    return ( 
        <div className="w-screen min-h-screen mt-10 flex justify-center items-center">
            <div className="w-1/2 p-8 rounded-xl border-2 border-gray-200">
            <div className="text-3xl font-bold">Budget Allocation</div>
            <form method="POST">
                <div className="pt-6">
                    <label className="font-bold block mb-2" htmlFor="province">Province</label>
                    <select className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white" id="province" onChange={(e) => {
                        setdistricts(districtsProvince[e.target.value]["govtBodies"])
                        setBudget(districtsProvince[e.target.value]["remainingBudget"])
                    }}>
                        {provinces.map(province => (
                            <option value={province}>{province}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-6">
                    <label className="font-bold block mb-2" htmlFor="district">District</label>
                    <select className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white" id="district">
                        {districts.map(district => (
                            <option value={district}>{district}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-6">
                    <label className="font-bold block mb-2" htmlFor="ministry">Remaining Budget</label>
                    <div className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white" id="ministry">
                        { budget }
                    </div>
                </div>

                <div className="pt-6">
                    <label className="font-bold block mb-2" htmlFor="budget">Budget</label>
                    <input className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white" type="number" step={10000} id="budget" placeholder="In Rupees. (Ex: 1000000)" />
                </div>
                
                <div className="pt-6">
                    <label className="font-bold block mb-2" htmlFor="description">Description</label>
                    <textarea className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white" rows={10} id="description" ></textarea>
                </div>

                <div className="pt-6">
                    <input className="w-full p-3 text-white font-bold bg-black rounded-lg" type="submit" value="Save" />
                </div>
            </form>
        </div>
        </div>
     );
}
 
export default LocalGovernmentAllocationForm;