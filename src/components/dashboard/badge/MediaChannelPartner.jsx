import { useState } from 'react';

const MediaChannelPartner = () => {
  const [partners] = useState([
    { id: 1, name: 'Partner A', status: 'Active' },
    { id: 2, name: 'Partner B', status: 'Active' },
  ]);

  return (
    <div className="bg-neutral-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Media Channel Partner</h2>
      <p className="mb-4">Total Partners: {partners.length}</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {partners.map(partner => (
            <tr key={partner.id} className="hover:bg-gray-50">
              <td className="border p-2">{partner.id}</td>
              <td className="border p-2">{partner.name}</td>
              <td className="border p-2">{partner.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-600 mt-4">Manage media channel partners here.</p>
    </div>
  );
};

export default MediaChannelPartner;