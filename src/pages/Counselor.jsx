import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import User from './Users';
import { getCurrentUser } from '../utils/auth';

const Counselor = () => {
  const user = getCurrentUser();
  const userRole = user?.role || 'counselor';

  if (userRole !== 'super_admin') {
    return <Navigate to="/" />;
  }

  const initialCounselors = [
    { id: 'C001', name: 'Dr. Lee', role: 'counselor', status: 'Active', assignedTo: 'Admin', region: 'Asia' },
    { id: 'C002', name: 'Emma Wilson', role: 'counselor', status: 'Pending', assignedTo: '', region: 'Europe' },
  ];

  console.log('Initial counselors:', initialCounselors);

  const [filteredCounselors, setFilteredCounselors] = useState([...initialCounselors]);

  const handleAssign = (id) => {
    console.log(`Assigning counselor ${id}`);
    const updatedCounselors = filteredCounselors.map(counselor =>
      counselor.id === id ? { ...counselor, assignedTo: 'Teacher XYZ' } : counselor
    );
    console.log('Updated counselors after assign:', updatedCounselors);
    setFilteredCounselors(updatedCounselors);
  };

  const handleUpdateStatus = (id, status) => {
    console.log(`Updating counselor ${id} status to ${status}`);
    const updatedCounselors = filteredCounselors.map(counselor =>
      counselor.id === id ? { ...counselor, status } : counselor
    );
    console.log('Updated counselors after status update:', updatedCounselors);
    setFilteredCounselors(updatedCounselors);
  };

  const handleView = (counselor) => {
    console.log(`Viewing counselor:`, counselor);
  };

  const handleFilterChange = (filtered) => {
    console.log('Filter change received:', filtered);
    try {
      if (!filtered || !Array.isArray(filtered)) {
        console.warn('Invalid filter data, reverting to initialCounselors:', filtered);
        setFilteredCounselors([...initialCounselors]);
        return;
      }

      const validFiltered = filtered.every(user => user && user.role === 'counselor')
        ? filtered
        : filtered.filter(user => user && user.role === 'counselor').length > 0
        ? filtered.filter(user => user && user.role === 'counselor')
        : initialCounselors;

      console.log('Valid filtered counselors:', validFiltered);
      setFilteredCounselors([...validFiltered]);
    } catch (error) {
      console.error('Error in handleFilterChange:', error);
      setFilteredCounselors([...initialCounselors]);
    }
  };

  return (
    <User
      role="super_admin"
      pageRole="counselor" // Set pageRole to counselor
      users={filteredCounselors}
      onAssign={handleAssign}
      onUpdateStatus={handleUpdateStatus}
      onView={handleView}
      hideControls={false}
      onFilterChange={handleFilterChange}
    />
  );
};

export default Counselor;