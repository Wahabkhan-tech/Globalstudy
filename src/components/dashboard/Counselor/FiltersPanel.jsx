import { useState, useEffect, useRef } from 'react';

const FiltersPanel = ({ users, data, onFilterChange, entityType }) => {
  // Determine effective data and entity type
  const effectiveData = Array.isArray(users) ? users : Array.isArray(data) ? data : [];
  const inferredEntityType = entityType || (users ? 'users' : data && data[0]?.university ? 'courses' : data && data[0]?.country ? 'universities' : 'users');
  const isStudentSpecific = inferredEntityType === 'students' || (inferredEntityType === 'users' && effectiveData.every(u => u?.role === 'student'));
  const isCounselorSpecific = inferredEntityType === 'counselors' || (inferredEntityType === 'users' && effectiveData.every(u => u?.role === 'counselor'));

  // Initialize filter states
  const [region, setRegion] = useState('');
  const [filterType, setFilterType] = useState(() => {
    if (inferredEntityType === 'universities') return 'country';
    if (inferredEntityType === 'courses') return 'university';
    if (isStudentSpecific) return 'status';
    if (isCounselorSpecific) return 'status';
    return 'role';
  });
  const [filterValue, setFilterValue] = useState('');
  const originalDataRef = useRef([]);

  // Capture initial data on mount only
  useEffect(() => {
    if (effectiveData.length > 0 && originalDataRef.current.length === 0) {
      originalDataRef.current = [...effectiveData];
      console.log('Initial original data set:', originalDataRef.current);
    }
  }, [effectiveData]);

  // Filter options
  const regions = ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia'];
  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];
  const universities = ['Harvard University', 'University of Toronto', 'Oxford University', 'University of Sydney'];
  const statuses = ['Active', 'Inactive', 'Pending', 'Completed'];
  const roles = ['student', 'counselor', 'media_channel'];
  const admissionStages = ['Profile', 'Institution', 'Visa Preparation', 'Joining Uni'];
  const courses = Array.from(new Set(effectiveData.filter(u => u?.course).map(u => u.course)));
  const assignedTos = Array.from(new Set(effectiveData.filter(u => u?.assignedTo).map(u => u.assignedTo)));

  const filterOptions = {
    universities: {
      country: countries,
      status: statuses,
    },
    courses: {
      university: universities,
      status: statuses,
    },
    users: {
      role: roles,
      status: statuses,
      course: courses,
      admission_stage: admissionStages,
      assignedTo: assignedTos,
    },
    students: {
      status: statuses,
      course: courses,
      admission_stage: admissionStages,
      assignedTo: assignedTos,
    },
    counselors: {
      status: statuses,
      assignedTo: assignedTos,
    },
  };

  const handleFilter = () => {
    if (!Array.isArray(effectiveData) || effectiveData.length === 0) {
      console.warn('No data to filter:', effectiveData);
      onFilterChange([]);
      return;
    }

    let filteredData = [...originalDataRef.current];

    // Apply region filter
    if (region) {
      filteredData = filteredData.filter((item) => {
        if (!item || !item.region) return false;
        return item.region === region;
      });
    }

    // Apply entity-specific filter
    if (filterValue) {
      filteredData = filteredData.filter((item) => {
        if (!item) return false;
        if (inferredEntityType === 'universities') {
          if (filterType === 'country' && item.country) return item.country === filterValue;
          if (filterType === 'status' && item.status) return item.status === filterValue;
        } else if (inferredEntityType === 'courses') {
          if (filterType === 'university' && item.university) return item.university === filterValue;
          if (filterType === 'status' && item.status) return item.status === filterValue;
        } else if (inferredEntityType === 'users' || inferredEntityType === 'students' || inferredEntityType === 'counselors') {
          if (filterType === 'role' && item.role) return item.role === filterValue;
          if (filterType === 'status' && item.status) return item.status === filterValue;
          if (filterType === 'course' && item.course) return item.course === filterValue;
          if (filterType === 'admission_stage' && item.admission_stage) return item.admission_stage === filterValue;
          if (filterType === 'assignedTo' && item.assignedTo) return item.assignedTo === filterValue;
        }
        return true;
      });
    }

    console.log('Filtered data:', filteredData);
    // If no data matches, pass empty array to show "No data matches" message
    onFilterChange(filteredData.length === 0 ? [] : filteredData);
  };

  const handleReset = () => {
    setRegion('');
    setFilterType(
      inferredEntityType === 'universities' ? 'country' :
      inferredEntityType === 'courses' ? 'university' :
      isStudentSpecific ? 'status' :
      isCounselorSpecific ? 'status' :
      'role'
    );
    setFilterValue('');
    console.log('Resetting to original data:', originalDataRef.current);
    onFilterChange([...originalDataRef.current]);
  };

  if (!Array.isArray(effectiveData) || effectiveData.length === 0) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg mb-5 text-gray-600">
        No data available to filter.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 bg-white shadow-lg rounded-lg mb-5">
      <div className="mb-4 lg:mb-0">
        <h3 className="text-lg font-semibold text-gray-800">
          Filter{' '}
          {inferredEntityType === 'universities' ? 'Universities' :
           inferredEntityType === 'courses' ? 'Courses' :
           inferredEntityType === 'students' ? 'Students' :
           inferredEntityType === 'counselors' ? 'Counselors' :
           'Users'}
        </h3>
      </div>
      <div className="w-full lg:w-auto flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full p-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-50 hover:bg-gray-100"
          >
            <option value="">All Regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Filter Type</label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setFilterValue('');
            }}
            className="w-full p-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-50 hover:bg-gray-100"
          >
            {inferredEntityType === 'universities' ? (
              <>
                <option value="country">Country</option>
                <option value="status">Status</option>
              </>
            ) : inferredEntityType === 'courses' ? (
              <>
                <option value="university">University</option>
                <option value="status">Status</option>
              </>
            ) : inferredEntityType === 'students' ? (
              <>
                <option value="status">Status</option>
                <option value="course">Course</option>
                <option value="admission_stage">Admission Stage</option>
                <option value="assignedTo">Assigned To</option>
              </>
            ) : inferredEntityType === 'counselors' ? (
              <>
                <option value="status">Status</option>
                <option value="assignedTo">Assigned To</option>
              </>
            ) : (
              <>
                <option value="role">Role</option>
                <option value="status">Status</option>
                <option value="course">Course</option>
                <option value="admission_stage">Admission Stage</option>
                <option value="assignedTo">Assigned To</option>
              </>
            )}
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            {filterType === 'country' ? 'Country' :
             filterType === 'university' ? 'University' :
             filterType === 'role' ? 'Role' :
             filterType === 'status' ? 'Status' :
             filterType === 'course' ? 'Course' :
             filterType === 'admission_stage' ? 'Admission Stage' :
             'Assigned To'}
          </label>
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full p-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-50 hover:bg-gray-100"
          >
            <option value="">
              All{' '}
              {filterType === 'country' ? 'Countries' :
               filterType === 'university' ? 'Universities' :
               filterType === 'role' ? 'Roles' :
               filterType === 'status' ? 'Statuses' :
               filterType === 'course' ? 'Courses' :
               filterType === 'admission_stage' ? 'Admission Stages' :
               'Assignees'}
            </option>
            {filterOptions[inferredEntityType][filterType]?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
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