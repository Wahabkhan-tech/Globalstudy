import { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const AssignedStudentsTable = () => {
  const [students, setStudents] = useState([
    { id: '1', name: 'Student A', region: 'North America', stage: 'profile' },
    { id: '2', name: 'Student B', region: 'Europe', stage: 'institution' },
    { id: '3', name: 'Student C', region: 'Asia', stage: 'admission_process' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStage, setNewStage] = useState('');

  const admissionStages = [
    'profile',
    'institution',
    'admission_process',
    'visa_preparation',
    'visa_end',
    'mobilization',
    'joining_uni',
  ];

  const handleUpdateStatus = async () => {
    if (selectedStudent && newStage) {
      // Update the student's stage via API
      await fetch(`/api/students/${selectedStudent.id}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admission_stage: newStage }),
      });

      // Update the local state
      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id ? { ...student, stage: newStage } : student
        )
      );
      setIsModalOpen(false);
      setSelectedStudent(null);
      setNewStage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Assigned Students</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Region</th>
              <th className="px-4 py-2 text-left text-gray-600">Admission Stage</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.region}</td>
                <td className="px-4 py-2 capitalize">{student.stage.replace('_', ' ')}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setNewStage(student.stage);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                    <span>Update Status</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Update Admission Status for {selectedStudent?.name}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admission Stage
              </label>
              <select
                value={newStage}
                onChange={(e) => setNewStage(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {admissionStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage.replace('_', ' ')}
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
    </div>
  );
};

export default AssignedStudentsTable;