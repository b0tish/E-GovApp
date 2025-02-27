const Allocations = () => {

    const allocationData = [
        {"id": 0, "allocatedBy": "Ministry of Finance", "allocatedTo": "Ministry of Health & Population", "allocatedAmt": 200000, "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, placeat repellendus veritatis porro eveniet repudiandae ipsum velit iure amet. Qui.",  "allocatedDate": "2025/2/1"},
        {"id": 1, "allocatedBy": "Ministry of Finance", "allocatedTo": "Ministry of Education", "allocatedAmt": 300000, "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, placeat repellendus veritatis porro eveniet repudiandae ipsum velit iure amet. Qui.",  "allocatedDate": "2025/2/1"},
        {"id": 2, "allocatedBy": "Ministry of Finance", "allocatedTo": "Ministry of Health", "allocatedAmt": 400000, "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, placeat repellendus veritatis porro eveniet repudiandae ipsum velit iure amet. Qui.",  "allocatedDate": "2025/2/1"},
        {"id": 3, "allocatedBy": "Ministry of Finance", "allocatedTo": "Ministry of Health", "allocatedAmt": 500000, "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, placeat repellendus veritatis porro eveniet repudiandae ipsum velit iure amet. Qui.",  "allocatedDate": "2025/2/1"},
        {"id": 4, "allocatedBy": "Ministry of Finance", "allocatedTo": "Ministry of Health", "allocatedAmt": 600000, "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, placeat repellendus veritatis porro eveniet repudiandae ipsum velit iure amet. Qui.",  "allocatedDate": "2025/2/1"},
    ];


    return ( 
        <>
            <div className="w-4/5 mx-auto">
                <div className="table w-full" border={"2"}>
                    <div className="table-header-group">
                        <div className="table-row font-semibold">
                            <div className="table-cell text-left">Allocated&nbsp;By</div>
                            <div className="table-cell text-left">Allocated&nbsp;To</div>
                            <div className="table-cell text-left">Allocated&nbsp;Amount</div>
                            <div className="table-cell text-left">Description</div>
                            <div className="table-cell text-left">Allocated&nbsp;Date</div>
                        </div>
                    </div>
                    <div className="table-row-group">
                        {allocationData.map(data => (
                            <div className="table-row" key={data["id"]}>
                                <div className="table-cell text-left">{data["allocatedBy"]}</div>
                                <div className="table-cell text-left">{data["allocatedTo"]}</div>
                                <div className="table-cell text-left">Rs. {data["allocatedAmt"]}</div>
                                <div className="table-cell text-left">{data["description"]}</div>
                                <div className="table-cell text-left">{data["allocatedDate"]}</div>
                            </div>
                        ))}
                    </div>
                    <div className="table-row-group">
                        <div className="table-row font-semibold">
                            <div className="table-cell text-left"></div>
                            <div className="table-cell text-left">Total</div>
                            <div className="table-cell text-left">Rs. {allocationData.reduce((a, v) => a + v["allocatedAmt"], 0)}</div>
                            <div className="table-cell text-left"></div>
                            <div className="table-cell text-left"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Allocations;