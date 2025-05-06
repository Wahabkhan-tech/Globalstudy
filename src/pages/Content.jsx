import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mock data for counselors (replace with API data in a real app)
const mockCounselors = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    assignedStudents: 25,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    assignedStudents: 18,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.j@example.com',
    assignedStudents: 30,
    status: 'Inactive',
  },
];

const CounselorManagement = () => {
  const [counselors, setCounselors] = useState(mockCounselors);

  // Placeholder function for adding a new counselor
  const handleAddCounselor = () => {
    alert('Add New Counselor functionality to be implemented');
    // In a real app, this could open a modal or redirect to a form
  };

  // Placeholder function for editing a counselor
  const handleEditCounselor = (id) => {
    alert(`Edit Counselor with ID: ${id}`);
    // In a real app, this could open a modal with a form pre-filled with counselor data
  };

  // Placeholder function for deleting a counselor
  const handleDeleteCounselor = (id) => {
    if (window.confirm('Are you sure you want to delete this counselor?')) {
      setCounselors(counselors.filter((counselor) => counselor.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Counselor Management</h2>
          <p className="text-gray-600">Manage counselors and their assignments.</p>
        </div>
        <button
          onClick={handleAddCounselor}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add New Counselor
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Assigned Students</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {counselors.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No counselors found.
                </td>
              </tr>
            ) : (
              counselors.map((counselor) => (
                <tr key={counselor.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{counselor.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{counselor.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{counselor.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{counselor.assignedStudents}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        counselor.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {counselor.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCounselor(counselor.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit Counselor"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCounselor(counselor.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Counselor"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CounselorManagement;