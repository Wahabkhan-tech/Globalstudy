import { useState } from 'react';

const Student = () => {
  const [students] = useState([
    { id: 1, name: 'Student A', status: 'Active' },
    { id: 2, name: 'Student B', status: 'Pending' },
  ]);

  return (
    <div className="bg-neutral-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Students</h2>
      <p className="mb-4">Total Students: {students.length}</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="border p-2">{student.id}</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-600 mt-4">Manage student details here.</p>
    </div>
  );
};

export default Student;