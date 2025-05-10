import { useState } from 'react';
import FiltersPanel from '../components/dashboard/Counselor/FiltersPanel';
import AssignedStudentsTable from '../components/dashboard/Counselor/AssignedStudentsTable';

const AssignedStudentsPage = () => {
  const [students, setStudents] = useState([
    { student_id: '1', name: 'John Doe', region: 'Asia', admission_stage: 'Profile', email: 'john@example.com' },
    { student_id: '2', name: 'Jane Smith', region: 'Europe', admission_stage: 'Visa Preparation', email: 'jane@example.com' },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="ml-64 p-6 flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Assigned Students</h1>
          <p className="text-gray-600">Total Students Assigned: {students.length}</p>
        </div>
        <FiltersPanel setStudents={setStudents} />
        <AssignedStudentsTable students={students} setStudents={setStudents} />
      </div>
    </div>
  );
};

export default AssignedStudentsPage;