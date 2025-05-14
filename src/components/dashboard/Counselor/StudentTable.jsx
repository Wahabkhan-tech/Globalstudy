import { useState } from 'react';

const StudentTable = ({ students, setStudents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const statusOptions = ['Active', 'Pending', 'Completed', 'Inactive'];

  const handleAssign = (id) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, assignedTo: 'Teacher XYZ' } : student
    );
    setStudents(updatedStudents);
  };

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setNewStatus(student.status);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = () => {
    if (selectedStudent && newStatus) {
      const updatedStudents = students.map(student =>
        student.id === selectedStudent.id ? { ...student, status: newStatus } : student
      );
      setStudents(updatedStudents);
      setIsModalOpen(false);
      setSelectedStudent(null);
      setNewStatus('');
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.course}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : student.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : student.status === 'Completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.assignedTo || 'Not Assigned'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleAssign(student.id)}
                    className="text-blue-600 hover:text-blue-800 hover:underline mr-2"
                  >
                    {student.assignedTo ? 'Reassign' : 'Assign'}
                  </button>
                  <button
                    onClick={() => handleOpenModal(student)}
                    className="text-blue-600 hover:text-blue-800 hover:underline mr-2"
                  >
                    Edit Status
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-800 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Student Details</h3>
            <div className="mb-4">
              <p><strong>ID:</strong> {selectedStudent?.id}</p>
              <p><strong>Name:</strong> {selectedStudent?.name}</p>
              <p><strong>Course:</strong> {selectedStudent?.course}</p>
              <p><strong>Current Status:</strong> {selectedStudent?.status}</p>
              <p><strong>Assigned To:</strong> {selectedStudent?.assignedTo || 'Not Assigned'}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Update Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentTable;