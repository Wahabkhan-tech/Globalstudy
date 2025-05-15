import { useState } from 'react';
import CreateCourseModal from '../modals/CreateCourseModal';
import FiltersPanel from '../components/dashboard/Counselor/FiltersPanel'; // Updated to use new FiltersPanel in src/pages

const CoursesTable = ({ courses, onUpdateStatus, hideControls = false, onFilterChange }) => {
  const initialCourses = [
    {
      course_id: 'C001',
      university_id: 'U001',
      course_name: 'Computer Science 101',
      course_code: 'CS101',
      description: 'Introduction to computer science concepts',
      credits: 3,
      department: 'Computer Science',
      level: 'Undergraduate',
      duration_in_weeks: 12,
      mode: 'On-Campus',
      semester_offered: 'Fall',
      prerequesites: [],
      instructor_name: 'Dr. Alice Johnson',
      language: 'English',
      max_enrollment: 100,
      current_enrollment: 80,
      is_elective: false,
      assessment_method: 'Mixed',
      certification_awarded: true,
      status: 'Active',
    },
    {
      course_id: 'C002',
      university_id: 'U002',
      course_name: 'Physics 201',
      course_code: 'PHYS201',
      description: 'Advanced physics principles',
      credits: 4,
      department: 'Physics',
      level: 'Undergraduate',
      duration_in_weeks: 12,
      mode: 'Hybrid',
      semester_offered: 'Spring',
      prerequisites: ['PHYS101'],
      instructor_name: 'Dr. Bob Smith',
      language: 'English',
      max_enrollment: 50,
      current_enrollment: 45,
      is_elective: false,
      assessment_method: 'Exams',
      certification_awarded: false,
      status: 'Active',
    },
    {
      course_id: 'C003',
      university_id: 'U003',
      course_name: 'English Literature',
      course_code: 'ENG301',
      description: 'Study of classic and modern literature',
      credits: 3,
      department: 'English',
      level: 'Undergraduate',
      duration_in_weeks: 12,
      mode: 'Online',
      semester_offered: 'All',
      prerequisites: ['ENG101'],
      instructor_name: 'Dr. Clara Brown',
      language: 'English',
      max_enrollment: 200,
      current_enrollment: 150,
      is_elective: true,
      assessment_method: 'Projects',
      certification_awarded: true,
      status: 'Inactive',
    },
    {
      course_id: 'C004',
      university_id: 'U004',
      course_name: 'Business Administration',
      course_code: 'BUS101',
      description: 'Fundamentals of business management',
      credits: 3,
      department: 'Business',
      level: 'Undergraduate',
      duration_in_weeks: 12,
      mode: 'On-Campus',
      semester_offered: 'Summer',
      prerequisites: [],
      instructor_name: 'Dr. David Lee',
      language: 'English',
      max_enrollment: 120,
      current_enrollment: 100,
      is_elective: false,
      assessment_method: 'Mixed',
      certification_awarded: true,
      status: 'Active',
    },
  ];

  const initialUniversities = [
    { university_id: 'U001', name: 'Harvard University' },
    { university_id: 'U002', name: 'University of Toronto' },
    { university_id: 'U003', name: 'Oxford University' },
    { university_id: 'U004', name: 'University of Sydney' },
  ];

  const [courseList, setCourseList] = useState(courses || initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);

  const handleCreateCourse = (newCourse) => {
    const updatedCourses = [...courseList, newCourse];
    setCourseList(updatedCourses);
    setIsModalOpen(false);
    if (onFilterChange) onFilterChange(updatedCourses);
  };

  const handleUpdateCourse = (updatedCourse) => {
    const updatedCourses = courseList.map((course) =>
      course.course_id === updatedCourse.course_id ? updatedCourse : course
    );
    setCourseList(updatedCourses);
    setIsModalOpen(false);
    if (onUpdateStatus) onUpdateStatus(updatedCourse.course_id, updatedCourse.status);
    if (onFilterChange) onFilterChange(updatedCourses);
  };

  const handleSubmitCourse = (courseData) => {
    if (modalMode === 'create') {
      handleCreateCourse(courseData);
    } else {
      handleUpdateCourse(courseData);
    }
  };

  const handleOpenModal = (mode, course = null) => {
    setModalMode(mode);
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteCourses = () => {
    if (selectedCourseIds.length === 0) return;
    const updatedCourses = courseList.filter((course) => !selectedCourseIds.includes(course.course_id));
    setCourseList(updatedCourses);
    if (onFilterChange) onFilterChange(updatedCourses);
    setSelectedCourseIds([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedCourseIds((prev) =>
      prev.includes(id) ? prev.filter((courseId) => courseId !== id) : [...prev, id]
    );
  };

  const getUniversityName = (university_id) => {
    const university = initialUniversities.find((uni) => uni.university_id === university_id);
    return university ? university.name : 'Unknown';
  };

  const renderTable = (courses) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Courses</h3>
      <div className="w-full overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              {!hideControls && (
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCourseIds(courses.map((course) => course.course_id));
                      } else {
                        setSelectedCourseIds([]);
                      }
                    }}
                    checked={courses.length > 0 && selectedCourseIds.length === courses.length}
                  />
                </th>
              )}
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Code</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">University</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Department</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Level</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Mode</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Credits</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.course_id} className="hover:bg-gray-50 transition-colors">
                  {!hideControls && (
                    <td className="px-2 py-2 w-12">
                      <input
                        type="checkbox"
                        checked={selectedCourseIds.includes(course.course_id)}
                        onChange={() => handleCheckboxChange(course.course_id)}
                      />
                    </td>
                  )}
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[80px]">{course.course_id}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[120px]">{course.course_name}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[100px] hidden lg:table-cell">{course.course_code}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[150px] hidden lg:table-cell">
                    {getUniversityName(course.university_id)}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[120px] hidden xl:table-cell">{course.department}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[100px] hidden md:table-cell">{course.level}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[100px] hidden md:table-cell">{course.mode}</td>
                  <td className="px-2 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[80px] hidden xl:table-cell">{course.credits}</td>
                  <td className="px-2 py-2 text-sm">
                    <div className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-2">
                      <button
                        onClick={() => handleOpenModal('edit', course)}
                        className="text-blue-600 hover:text-blue-800 hover:underline text-xs"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={hideControls ? 9 : 10} className="px-2 py-2 text-center text-sm text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Management</h2>
      <p className="text-gray-600 mb-4 text-sm">Manage course records and statuses.</p>
      {!hideControls && (
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <button
            onClick={() => handleOpenModal('create')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm mb-2 sm:mb-0"
          >
            Create Course
          </button>
          <button
            onClick={handleDeleteCourses}
            disabled={selectedCourseIds.length === 0}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedCourseIds.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            Delete Selected Courses
          </button>
        </div>
      )}
      <FiltersPanel
        data={courseList}
        onFilterChange={setCourseList}
        entityType="courses"
      />
      {renderTable(courseList)}
      {isModalOpen && (
        <CreateCourseModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleSubmitCourse}
          mode={modalMode}
          course={selectedCourse}
        />
      )}
    </div>
  );
};


export default CoursesTable;