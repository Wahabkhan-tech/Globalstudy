import { useState } from 'react';
import User from '../pages/Users'; // Adjust path as needed

const Counselor = () => {
  const [counselors, setCounselors] = useState([
    { id: 'C001', name: 'Dr. Lee', role: 'counselor', status: 'Active', assignedTo: 'Admin', region: 'Asia' },
    { id: 'C002', name: 'Emma Wilson', role: 'counselor', status: 'Pending', assignedTo: '', region: 'Europe' },
  ]);

  const handleAssign = (id) => {
    console.log(`Assigning counselor ${id}`);
    // Add additional assign logic if needed (e.g., API call)
  };

  const handleUpdateStatus = (id, status) => {
    console.log(`Updating counselor ${id} status to ${status}`);
    setCounselors(counselors.map(counselor =>
      counselor.id === id ? { ...counselor, status } : counselor
    ));
  };

  const handleView = (counselor) => {
    console.log(`Viewing counselor:`, counselor);
    // Add view logic (e.g., navigate to counselor profile)
  };

  return (
    <User
      role="counselor"
      users={counselors}
      onAssign={handleAssign}
      onUpdateStatus={handleUpdateStatus}
      onView={handleView}
      hideControls={true}
      tableType="counselor" // Explicitly request counselor table
    />
  );
};

export default Counselor;