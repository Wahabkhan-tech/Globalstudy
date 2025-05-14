import { useState } from 'react';
import User from '../pages/Users'; // Adjust path as needed

const Students = () => {
  const [students, setStudents] = useState([
    { id: 'S001', name: 'Jane Smith', course: 'Mathematics 101', status: 'Active', assignedTo: '', region: 'North America', admission_stage: 'Profile', role: 'student' },
    { id: 'S002', name: 'John Doe', course: 'Physics 201', status: 'Pending', assignedTo: 'Teacher XYZ', region: 'Asia', admission_stage: 'Institution', role: 'student' },
    { id: 'S003', name: 'Alice Johnson', course: 'Chemistry 101', status: 'Completed', assignedTo: 'Teacher XYZ', region: 'Europe', admission_stage: 'Visa Preparation', role: 'student' },
    { id: 'S004', name: 'Bob Brown', course: 'Computer Science 101', status: 'Inactive', assignedTo: '', region: 'Africa', admission_stage: 'Joining Uni', role: 'student' },
  ]);

  const handleAssign = (id) => {
    console.log(`Assigning student ${id}`);
    // Add additional assign logic if needed (e.g., API call)
  };

  const handleUpdateStatus = (id, status) => {
    console.log(`Updating student ${id} status to ${status}`);
    setStudents(students.map(student =>
      student.id === id ? { ...student, status } : student
    ));
  };

  const handleView = (student) => {
    console.log(`Viewing student:`, student);
    // Add view logic (e.g., navigate to student profile)
  };

  return (
    <User
      role="counselor"
      users={students}
      onAssign={handleAssign}
      onUpdateStatus={handleUpdateStatus}
      onView={handleView}
      hideControls={true}
    />
  );
};

export default Students;