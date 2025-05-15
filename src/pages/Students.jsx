import { useState } from 'react';
import User from '../pages/Users'; // Adjust path as needed
import { getCurrentUser } from '../utils/auth'; // Import to get user role

const Students = () => {
  const initialStudents = [
    { id: 'S001', name: 'Jane Smith', role: 'student', course: 'Mathematics 101', admission_stage: 'Profile', status: 'Active', assignedTo: '', region: 'North America' },
    { id: 'S002', name: 'John Doe', role: 'student', course: 'Physics 201', admission_stage: 'Institution', status: 'Pending', assignedTo: 'Teacher XYZ', region: 'Asia' },
    { id: 'S003', name: 'Alice Johnson', role: 'student', course: 'Chemistry 101', admission_stage: 'Visa Preparation', status: 'Completed', assignedTo: 'Teacher XYZ', region: 'Europe' },
    { id: 'S004', name: 'Bob Brown', role: 'student', course: 'Computer Science 101', admission_stage: 'Joining Uni', status: 'Inactive', assignedTo: '', region: 'Africa' },
  ];

  const [filteredStudents, setFilteredStudents] = useState(initialStudents);

  const user = getCurrentUser();
  const userRole = user?.role || 'counselor'; // Default to counselor if undefined
  const isSuperAdmin = userRole === 'super_admin';

  const handleAssign = (id) => {
    console.log(`Assigning student ${id}`);
    const updatedStudents = filteredStudents.map(student =>
      student.id === id ? { ...student, assignedTo: 'Teacher XYZ' } : student
    );
    setFilteredStudents(updatedStudents);
  };

  const handleUpdateStatus = (id, status) => {
    console.log(`Updating student ${id} status to ${status}`);
    const updatedStudents = filteredStudents.map(student =>
      student.id === id ? { ...student, status } : student
    );
    setFilteredStudents(updatedStudents);
  };

  const handleView = (student) => {
    console.log(`Viewing student:`, student);
    // Add view logic (e.g., navigate to student profile)
  };

  const handleFilterChange = (filtered) => {
    setFilteredStudents(filtered);
  };

  return (
    <User
      role={isSuperAdmin ? 'super_admin' : 'counselor'}
      pageRole="student" // Set pageRole to student
      users={filteredStudents}
      onAssign={handleAssign}
      onUpdateStatus={handleUpdateStatus}
      onView={handleView}
      hideControls={!isSuperAdmin} // Show controls only for super_admin
      onFilterChange={handleFilterChange}
    />
  );
};

export default Students;