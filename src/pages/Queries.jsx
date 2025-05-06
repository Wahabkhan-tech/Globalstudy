const Queries = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">User Queries</h2>
        <p className="text-gray-600 mb-4">Handle user inquiries and questions.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Query ID</th>
                <th className="py-2 px-4 border-b">Subject</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Q001</td>
                <td className="py-2 px-4 border-b">Course Access</td>
                <td className="py-2 px-4 border-b">Pending</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-600 hover:underline">Respond</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Queries;