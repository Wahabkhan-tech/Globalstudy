import { useState, useRef, useEffect } from 'react';

const CreateCourseModal = ({ onClose, onCreate, mode = 'create', course = null }) => {
  const [formData, setFormData] = useState({
    course_id: course?.course_id || '',
    university_id: course?.university_id || '',
    course_name: course?.course_name || '',
    course_code: course?.course_code || '',
    description: course?.description || '',
    credits: course?.credits || '',
    department: course?.department || '',
    level: course?.level || 'Undergraduate',
    duration_in_weeks: course?.duration_in_weeks || '',
    mode: course?.mode || 'On-Campus',
    semester_offered: course?.semester_offered || 'All',
    prerequisites: course?.prerequisites?.join(', ') || '',
    instructor_name: course?.instructor_name || '',
    language: course?.language || 'English',
    max_enrollment: course?.max_enrollment || '',
    current_enrollment: course?.current_enrollment || '',
    is_elective: course?.is_elective || false,
    assessment_method: course?.assessment_method || 'Mixed',
    certification_awarded: course?.certification_awarded || false,
    status: course?.status || 'Active',
  });

  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  const statusOptions = ['Active', 'Inactive'];
  const levelOptions = ['Undergraduate', 'Graduate', 'PhD'];
  const modeOptions = ['Online', 'On-Campus', 'Hybrid'];
  const semesterOptions = ['Fall', 'Spring', 'Summer', 'All'];
  const assessmentOptions = ['Exams', 'Projects', 'Mixed'];
  const languageOptions = ['English', 'Spanish', 'French', 'German'];
  const universityOptions = [
    { university_id: 'U001', name: 'Harvard University' },
    { university_id: 'U002', name: 'University of Toronto' },
    { university_id: 'U003', name: 'Oxford University' },
    { university_id: 'U004', name: 'University of Sydney' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.course_id) newErrors.course_id = 'Course ID is required';
    if (!formData.course_name) newErrors.course_name = 'Course name is required';
    if (!formData.university_id) newErrors.university_id = 'University is required';
    if (!formData.course_code) newErrors.course_code = 'Course code is required';
    if (!formData.department) newErrors.department = 'Department is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newCourse = {
      ...formData,
      credits: parseInt(formData.credits) || 0,
      duration_in_weeks: parseInt(formData.duration_in_weeks) || 0,
      max_enrollment: parseInt(formData.max_enrollment) || 0,
      current_enrollment: parseInt(formData.current_enrollment) || 0,
      prerequisites: formData.prerequisites
        ? formData.prerequisites.split(',').map((item) => item.trim())
        : [],
    };

    onCreate(newCourse);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-[90vw] sm:max-w-4xl overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {mode === 'create' ? 'Create New Course' : 'Edit Course'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
              <input
                type="text"
                name="course_id"
                value={formData.course_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., C001"
                disabled={mode === 'edit'}
              />
              {errors.course_id && <p className="text-red-500 text-xs mt-1">{errors.course_id}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
              <input
                type="text"
                name="course_name"
                value={formData.course_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., Computer Science 101"
              />
              {errors.course_name && <p className="text-red-500 text-xs mt-1">{errors.course_name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <select
                name="university_id"
                value={formData.university_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select University</option>
                {universityOptions.map((uni) => (
                  <option key={uni.university_id} value={uni.university_id}>
                    {uni.name}
                  </option>
                ))}
              </select>
              {errors.university_id && <p className="text-red-500 text-xs mt-1">{errors.university_id}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
              <input
                type="text"
                name="course_code"
                value={formData.course_code}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., CS101"
              />
              {errors.course_code && <p className="text-red-500 text-xs mt-1">{errors.course_code}</p>}
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., Introduction to computer science concepts"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., Engineering"
              />
              {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {levelOptions.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Weeks)</label>
              <input
                type="number"
                name="duration_in_weeks"
                value={formData.duration_in_weeks}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 12"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {modeOptions.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester Offered</label>
              <select
                name="semester_offered"
                value={formData.semester_offered}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {semesterOptions.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
              <textarea
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., CS100, MATH101"
                rows="2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
              <input
                type="text"
                name="instructor_name"
                value={formData.instructor_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., Dr. John Smith"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Enrollment</label>
              <input
                type="number"
                name="max_enrollment"
                value={formData.max_enrollment}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Enrollment</label>
              <input
                type="number"
                name="current_enrollment"
                value={formData.current_enrollment}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Is Elective</label>
              <input
                type="checkbox"
                name="is_elective"
                checked={formData.is_elective}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Method</label>
              <select
                name="assessment_method"
                value={formData.assessment_method}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {assessmentOptions.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Certification Awarded</label>
              <input
                type="checkbox"
                name="certification_awarded"
                checked={formData.certification_awarded}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
            >
              {mode === 'create' ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;