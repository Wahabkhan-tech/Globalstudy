import { useState } from 'react';

const VisaStatus = () => {
  const [visaData] = useState([
    { id: 1, studentName: 'Student A', status: 'In Process' },
    { id: 2, studentName: 'Student B', status: 'Accepted' },
    { id: 3, studentName: 'Student C', status: 'Rejected' },
  ]);

  return (
    <div className="bg-neutral-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Visa Status</h2>
      <p className="mb-4">Total in Process: {visaData.filter(v => v.status === 'In Process').length}</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {visaData.map(visa => (
            <tr key={visa.id} className="hover:bg-gray-50">
              <td className="border p-2">{visa.id}</td>
              <td className="border p-2">{visa.studentName}</td>
              <td className="border p-2">{visa.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-600 mt-4">View visa status for students here.</p>
    </div>
  );
};

export default VisaStatus;