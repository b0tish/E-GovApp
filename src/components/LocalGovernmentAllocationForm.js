import { useState } from "react";

const LocalGovernmentAllocationForm = () => {
    const provinces = ["bagmati", "karnali", "gandaki"];
    const districtsProvince = {
            "bagmati": ["Lalitpur", "Kathmandu", "Bhaktapur"],
            "karnali": ["Pokhara", "District 12"],
            "gandaki": ["District 34", "District 69"],
        }

    const [districts, setdistricts] = useState(districtsProvince[provinces[0]]);

    return ( 
        <div className="h-screen flex justify-center items-center">
            <div className="w-[500px] p-8 rounded-xl border-2 border-gray-200">
            <div className="text-3xl font-bold">Budget Allocation</div>
            <form method="POST">
                <div className="pt-6">
                    <label className="font-bold block mb-2" htmlFor="province">Province</label>
                    <select className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white" id="province" onChange={(e) => setdistricts(districtsProvince[e.target.value])}>
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
                    <label className="font-bold block mb-2" htmlFor="budget">Budget</label>
                    <input className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white" type="number" id="budget" placeholder="In Rupees. (Ex: 1000000)" />
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