const StatusUpdate = () => {
    const statusItems = [
      { step: 'Profile Submitted', status: 'Approved', date: '01 Jan 2025', remarks: 'Profile details verified and approved' },
      { step: 'Document Submission', status: 'Pending', date: '05 Jan 2025', remarks: 'Awaiting student to upload documents' },
      { step: 'Final Approval', status: 'Not Started', date: '05 Jan 2025', remarks: 'Pending all approvals' },
    ];
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-red-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Update</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-200 text-gray-800">
                <th className="px-4 py-2 text-left">Step</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {statusItems.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.step}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        item.status === 'Approved'
                          ? 'bg-green-500'
                          : item.status === 'Pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default StatusUpdate;