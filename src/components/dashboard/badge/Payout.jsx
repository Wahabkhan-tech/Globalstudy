import { useState } from 'react';

const Payout = () => {
  const [payouts] = useState([
    { id: 1, amount: '$500', status: 'Received' },
    { id: 2, amount: '$300', status: 'Pending' },
  ]);

  return (
    <div className="bg-neutral-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Payout</h2>
      <p className="mb-4">Total Payouts: {payouts.length}</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map(payout => (
            <tr key={payout.id} className="hover:bg-gray-50">
              <td className="border p-2">{payout.id}</td>
              <td className="border p-2">{payout.amount}</td>
              <td className="border p-2">{payout.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-600 mt-4">View payout status here.</p>
    </div>
  );
};

export default Payout;