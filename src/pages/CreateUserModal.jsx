import { useState, useRef, useEffect } from 'react';

const CreateUserModal = ({ onClose, onSubmit, mode = 'create', user = null, pageRole = '' }) => {
  const [formData, setFormData] = useState({
    id: user?.id || '',
    name: user?.name || '',
    role: user?.role || 'student',
    course: user?.course || '',
    admission_stage: user?.admission_stage || '',
    status: user?.status || 'Active',
    assignedTo: user?.assignedTo || '',
    region: user?.region || '',
  });

  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  const roleOptions = ['student', 'counselor', 'media_channel'];
  const statusOptions = ['Active', 'Pending', 'Completed', 'Inactive'];
  const admissionStageOptions = ['Profile', 'Institution', 'Visa Preparation', 'Joining Uni'];
  const regionOptions = ['North America', 'Asia', 'Europe', 'Africa', 'Australia'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id) newErrors.id = 'ID is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (formData.role === 'student') {
      if (!formData.course) newErrors.course = 'Course is required';
      if (!formData.admission_stage) newErrors.admission_stage = 'Admission stage is required';
    }
    if (!formData.region) newErrors.region = 'Region is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submittedUser = {
      id: formData.id,
      name: formData.name,
      role: formData.role,
      ...(formData.role === 'student' && {
        course: formData.course,
        admission_stage: formData.admission_stage,
      }),
      status: formData.status,
      assignedTo: formData.assignedTo,
      region: formData.region,
    };

    onSubmit(submittedUser);
    onClose();
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
  }, );

  // Determine the heading based on mode and pageRole
  const getHeading = () => {
    const action = mode === 'create' ? 'Create New' : 'Edit';
    switch (pageRole) {
      case 'student':
        return `${action} Student`;
      case 'counselor':
        return `${action} Counselor`;
      case 'media_channel':
        return `${action} Media Channel`;
      default:
        return `${action} User`;
    }
  };

  // Determine the button text based on mode and pageRole
  const getButtonText = () => {
    const action = mode === 'create' ? 'Create' : 'Update';
    switch (pageRole) {
      case 'student':
        return `${action} Student`;
      case 'counselor':
        return `${action} Counselor`;
      case 'media_channel':
        return `${action} Media Channel`;
      default:
        return action;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-[90vw] sm:max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {getHeading()}
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
                placeholder="e.g., S001"
                disabled={mode === 'edit'}
              />
              {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
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
            {formData.role === 'student' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., Mathematics 101"
                  />
                  {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Stage</label>
                  <select
                    name="admission_stage"
                    value={formData.admission_stage}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select Admission Stage</option>
                    {admissionStageOptions.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                  {errors.admission_stage && <p className="text-red-500 text-xs mt-1">{errors.admission_stage}</p>}
                </div>
              </>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., Teacher XYZ"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select Region</option>
                {regionOptions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
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
              {getButtonText()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;