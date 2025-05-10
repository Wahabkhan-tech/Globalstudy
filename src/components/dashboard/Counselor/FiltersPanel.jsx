import { useState } from 'react';

const FiltersPanel = ({ setStudents }) => {
  const [region, setRegion] = useState('');
  const [stage, setStage] = useState('');

  const mockStudents = [
    { student_id: '1', name: 'John Doe', region: 'Asia', admission_stage: 'Profile', email: 'john@example.com' },
    { student_id: '2', name: 'Jane Smith', region: 'Europe', admission_stage: 'Visa Preparation', email: 'jane@example.com' },
  ];

  const handleFilter = () => {
    let filtered = mockStudents;
    if (region) filtered = filtered.filter((s) => s.region === region);
    if (stage) filtered = filtered.filter((s) => s.admission_stage === stage);
    setStudents(filtered);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex space-x-4">
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="p-2 border rounded-lg focus:ring-2 focus:ring-teal-600"
      >
        <option value="">All Regions</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
      </select>
      <select
        value={stage}
        onChange={(e) => setStage(e.target.value)}
        className="p-2 border rounded-lg focus:ring-2 focus:ring-teal-600"
      >
        <option value="">All Stages</option>
        <option value="Profile">Profile</option>
        <option value="Institution">Institution</option>
        <option value="Admission Process">Admission Process</option>
        <option value="Visa Preparation">Visa Preparation</option>
        <option value="Joining Uni">Joining Uni</option>
      </select>
      <button
        onClick={handleFilter}
        className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FiltersPanel;