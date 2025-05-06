import { useState } from 'react';

// Mock data for counselors (replace with API data in a real app)
const mockCounselors = [
  {
    id: 1,
    name: 'John Doe',
    assignedStudents: 25,
    avgCompletionRate: 80,
    performanceRating: 'Excellent',
  },
  {
    id: 2,
    name: 'Jane Smith',
    assignedStudents: 18,
    avgCompletionRate: 65,
    performanceRating: 'Good',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    assignedStudents: 30,
    avgCompletionRate: 70,
    performanceRating: 'Average',
  },
];

const CounselorAnalyticsTable = () => {
  const [counselors] = useState(mockCounselors);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Assigned Students</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Avg. Completion Rate</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Performance Rating</th>
          </tr>
        </thead>
        <tbody>
          {counselors.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                No counselor data available.
              </td>
            </tr>
          ) : (
            counselors.map((counselor) => (
              <tr key={counselor.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{counselor.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{counselor.name}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{counselor.assignedStudents}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{counselor.avgCompletionRate}%</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      counselor.performanceRating === 'Excellent'
                        ? 'bg-blue-100 text-blue-800'
                        : counselor.performanceRating === 'Good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {counselor.performanceRating}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CounselorAnalyticsTable;