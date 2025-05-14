const Helpdesk = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">HelpDesk Support</h2>
        <p className="text-gray-600 mb-4">View and manage support tickets.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Ticket ID</th>
                <th className="py-2 px-4 border-b">Subject</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">T001</td>
                <td className="py-2 px-4 border-b">Login Issue</td>
                <td className="py-2 px-4 border-b">Open</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
              <tr className="align-center">
                <td className="py-2 px-4 border-b">T001</td>
                <td className="py-2 px-4 border-b">Login Issue</td>
                <td className="py-2 px-4 border-b">Open</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">T001</td>
                <td className="py-2 px-4 border-b">Login Issue</td>
                <td className="py-2 px-4 border-b">Open</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Helpdesk;