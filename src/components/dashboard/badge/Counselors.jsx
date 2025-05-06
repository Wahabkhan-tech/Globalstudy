import { useState } from 'react';

const Counselors = () => {
  const [counselors] = useState([
    { id: 1, name: 'Counselor A', studentCount: 10 },
    { id: 2, name: 'Counselor B', studentCount: 8 },
  ]);

  return (
    <div className="bg-neutral-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Counselors</h2>
      <p className="mb-4">Total Counselors: {counselors.length}</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Students</th>
          </tr>
        </thead>
        <tbody>
          {counselors.map(counselor => (
            <tr key={counselor.id} className="hover:bg-gray-50">
              <td className="border p-2">{counselor.id}</td>
              <td className="border p-2">{counselor.name}</td>
              <td className="border p-2">{counselor.studentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-600 mt-4">View student counts per counselor here.</p>
    </div>
  );
};

export default Counselors;