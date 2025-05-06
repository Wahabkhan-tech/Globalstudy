import { useState } from 'react';

const HelpdeskManager = () => {
  const [managers] = useState([
    { id: 1, name: 'Manager A', status: 'Active' },
    { id: 2, name: 'Manager B', status: 'Active' },
  ]);

  return (
    <div className="bg-neutral-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Helpdesk Manager</h2>
      <p className="mb-4">Total Managers: {managers.length}</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {managers.map(manager => (
            <tr key={manager.id} className="hover:bg-gray-50">
              <td className="border p-2">{manager.id}</td>
              <td className="border p-2">{manager.name}</td>
              <td className="border p-2">{manager.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-600 mt-4">Manage helpdesk managers here.</p>
    </div>
  );
};

export default HelpdeskManager;