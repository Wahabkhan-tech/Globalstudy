import { useState, useEffect, useRef } from 'react';

const FiltersPanel = ({ studentUsers, setStudentUsers, counselorUsers, setCounselorUsers, mcpUsers, setMcpUsers }) => {
  const [region, setRegion] = useState('');
  const [filterType, setFilterType] = useState('admission_stage');
  const [filterValue, setFilterValue] = useState('');
  const originalUsersRef = useRef({
    students: [],
    counselors: [],
    mcps: [],
  });

  useEffect(() => {
    originalUsersRef.current = {
      students: studentUsers,
      counselors: counselorUsers,
      mcps: mcpUsers,
    };
  }, [studentUsers, counselorUsers, mcpUsers]);

  const regions = ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia'];
  const stages = [
    'Profile',
    'Institution',
    'Admission Process',
    'Visa Preparation',
    'Visa End',
    'Mobilization',
    'Joining Uni',
  ];
  const statuses = ['Active', 'Pending', 'Completed', 'Inactive'];

  const handleFilter = () => {
    let filteredStudents = [...originalUsersRef.current.students];
    let filteredCounselors = [...originalUsersRef.current.counselors];
    let filteredMcps = [...originalUsersRef.current.mcps];

    // Apply region filter to all
    if (region) {
      filteredStudents = filteredStudents.filter(u => u.region === region);
      filteredCounselors = filteredCounselors.filter(u => u.region === region);
      filteredMcps = filteredMcps.filter(u => u.region === region);
    }

    // Apply admission_stage or status filter
    if (filterValue) {
      if (filterType === 'admission_stage') {
        filteredStudents = filteredStudents.filter(u => u.admission_stage === filterValue);
        // Counselors and MCPs unaffected by admission_stage
      } else {
        filteredCounselors = filteredCounselors.filter(u => u.status === filterValue);
        filteredMcps = filteredMcps.filter(u => u.status === filterValue);
        // Students unaffected by status
      }
    }

    setStudentUsers(filteredStudents);
    setCounselorUsers(filteredCounselors);
    setMcpUsers(filteredMcps);
  };

  const handleReset = () => {
    setRegion('');
    setFilterType('admission_stage');
    setFilterValue('');
    setStudentUsers([...originalUsersRef.current.students]);
    setCounselorUsers([...originalUsersRef.current.counselors]);
    setMcpUsers([...originalUsersRef.current.mcps]);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 bg-white shadow-lg rounded-lg mb-5">
      <div className="mb-4 lg:mb-0">
        <h3 className="text-lg font-semibold text-gray-800">Filter Users</h3>
      </div>
      <div className="w-full lg:w-auto flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Region</label>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="w-full p-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-50 hover:bg-gray-100"
          >
            <option value="">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Filter Type</label>
          <select
            value={filterType}
            onChange={e => {
              setFilterType(e.target.value);
              setFilterValue('');
            }}
            className="w-full p-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-50 hover:bg-gray-100"
          >
            <option value="admission_stage">Admission Stage (Students)</option>
            <option value="status">Status (Counselors/MCPs)</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            {filterType === 'admission_stage' ? 'Admission Stage' : 'Status'}
          </label>
          <select
            value={filterValue}
            onChange={e => setFilterValue(e.target.value)}
            className="w-full p-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-50 hover:bg-gray-100"
          >
            <option value="">All {filterType === 'admission_stage' ? 'Stages' : 'Statuses'}</option>
            {(filterType === 'admission_stage' ? stages : statuses).map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;