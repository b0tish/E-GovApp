function AddProject(){

    return (
        <div className="add-project">
            <h1>Add Project</h1>
            <form>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description"></textarea>
                </div>
                <div>
                    <label>Allocated By:</label>
                    <input type="text" name="allocatedBy" />
                </div>
                <button type="submit">Add Project</button>
            </form>
            <button onClick={() => window.history.back()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancel
            </button>
        </div>
    )
}