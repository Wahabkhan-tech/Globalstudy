import { useState, useEffect } from 'react';

const HelpdeskDataRecords = () => {
  const [submittedData, setSubmittedData] = useState([]);

  // Load submitted data from localStorage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('helpdeskStudentData')) || [];
    setSubmittedData(storedData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 font-sans flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full border border-gray-100">
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-indigo-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h2 className="text-2xl font-semibold ml-3 text-indigo-700 tracking-wide">
            Helpdesk: Student Data Records
          </h2>
        </div>

        {/* Table for Uploaded Data */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">Uploaded Student Data</h3>
          {submittedData.length === 0 ? (
            <p className="text-gray-600 text-center">No student data uploaded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="py-2 px-4 border-b text-left text-indigo-700">Name</th>
                    <th className="py-2 px-4 border-b text-left text-indigo-700">Email</th>
                    <th className="py-2 px-4 border-b text-left text-indigo-700">Program</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedData.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b text-gray-700">{entry.name}</td>
                      <td className="py-2 px-4 border-b text-gray-700">{entry.email}</td>
                      <td className="py-2 px-4 border-b text-gray-700">{entry.program}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-4 text-gray-600 text-center">
            Total Students Uploaded:{' '}
            <span className="font-semibold">{submittedData.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpdeskDataRecords;