import { useState } from 'react';

const Universities = () => {
  const [universities] = useState([
    { id: 1, name: 'University A', studentCount: 15 },
    { id: 2, name: 'University B', studentCount: 10 },
  ]);

  return (
    <div className="bg-neutral-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Universities</h2>
      <p className="mb-4">Total Universities: {universities.length}</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Students Applied</th>
          </tr>
        </thead>
        <tbody>
          {universities.map(university => (
            <tr key={university.id} className="hover:bg-gray-50">
              <td className="border p-2">{university.id}</td>
              <td className="border p-2">{university.name}</td>
              <td className="border p-2">{university.studentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-600 mt-4">View universities and student applications here.</p>
    </div>
  );
};

export default Universities;