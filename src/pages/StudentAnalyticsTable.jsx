import { useState } from 'react';

// Mock data for students (replace with API data in a real app)
const mockStudents = [
  {
    id: 1,
    name: 'Alice Brown',
    enrolledCourses: 3,
    completionRate: 75,
    lastActive: '2025-04-28',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Bob Wilson',
    enrolledCourses: 2,
    completionRate: 50,
    lastActive: '2025-04-25',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Clara Davis',
    enrolledCourses: 4,
    completionRate: 90,
    lastActive: '2025-04-29',
    status: 'Active',
  },
];

const StudentAnalyticsTable = () => {
  const [students] = useState(mockStudents);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Enrolled Courses</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Completion Rate</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Last Active</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                No student data available.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{student.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{student.name}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{student.enrolledCourses}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{student.completionRate}%</td>
                <td className="px-4 py-3 text-sm text-gray-900">{student.lastActive}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      student.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {student.status}
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

export default StudentAnalyticsTable;