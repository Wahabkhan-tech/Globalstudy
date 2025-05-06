import { useState } from 'react';

const AppliedCandidates = () => {
  const [candidates] = useState([
    { id: 1, name: 'Candidate A', appliedDate: '2025-05-01' },
    { id: 2, name: 'Candidate B', appliedDate: '2025-05-02' },
  ]);

  return (
    <div className="bg-neutral-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Applied Candidates</h2>
      <p className="mb-4">Total Candidates: {candidates.length}</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Applied Date</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.id} className="hover:bg-gray-50">
              <td className="border p-2">{candidate.id}</td>
              <td className="border p-2">{candidate.name}</td>
              <td className="border p-2">{candidate.appliedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-600 mt-4">View applied candidates here.</p>
    </div>
  );
};

export default AppliedCandidates;