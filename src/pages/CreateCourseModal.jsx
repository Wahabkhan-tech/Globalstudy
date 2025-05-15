import { useState, useRef, useEffect } from 'react';

const CreateCourseModal = ({ onClose, onCreate, mode = 'create', course = null }) => {
  const [formData, setFormData] = useState({
    id: course?.id || '',
    title: course?.title || '',
    university: course?.university || '',
    duration: course?.duration || '',
    status: course?.status || 'Active',
  });

  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  const statusOptions = ['Active', 'Inactive'];
  const universityOptions = ['Harvard University', 'University of Toronto', 'Oxford University', 'University of Sydney'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id) newErrors.id = 'ID is required';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.university) newErrors.university = 'University is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
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
      id: formData.id,
      title: formData.title,
      university: formData.university,
      duration: formData.duration,
      status: formData.status,
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
        className="bg-white rounded-lg p-6 w-full max-w-[90vw] sm:max-w-2xl overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {mode === 'create' ? 'Create New Course' : 'Edit Course'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., C001"
                disabled={mode === 'edit'}
              />
              {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., Computer Science 101"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select University</option>
                {universityOptions.map((university) => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
              {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 4 years"
              />
              {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
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