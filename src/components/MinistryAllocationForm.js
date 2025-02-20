
const MinistryAllocationForm = () => {
    const ministries = ["Ministry of Education", "Ministry of Health and Population", "Ministry of Defence"];

    const mofRemainingBudget = 1000000000;
    // const [districts, setdistricts] = useState(districtsProvince[provinces[0]]);

    return ( 
        <div className="w-screen min-h-screen mt-10 flex justify-center items-center">
            <div className="w-1/2 p-8 rounded-xl border-2 border-gray-200">
            <div className="text-3xl font-bold">Budget Allocation</div>
            <form method="POST">
                <div className="pt-6">
                    <label className="font-bold block mb-2" htmlFor="mof">Ministry of Finance</label>
                    <select className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white" id="mof" disabled>
                        <option value="{mof}">Ministry of Finance</option>
                    </select>
                </div>

                <div className="pt-6">
                    <label className="font-bold block mb-2" htmlFor="ministry">Ministry</label>
                    <select className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white" id="ministry">
                        {ministries.map(ministry => (
                            <option value={ministry}>{ministry}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-6">
                    <label className="font-bold block mb-2" htmlFor="ministry">Remaining Budget</label>
                    <div className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white" id="ministry">
                        { mofRemainingBudget }
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
 
export default MinistryAllocationForm;