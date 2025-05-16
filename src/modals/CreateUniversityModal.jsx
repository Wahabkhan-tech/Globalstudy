import { useState, useRef, useEffect } from 'react';

const CreateUniversityModal = ({ onClose, onCreate, mode = 'create', university = null }) => {
  const [formData, setFormData] = useState({
    university_id: university?.university_id || '',
    name: university?.name || '',
    abbreviation: university?.abbreviation || '',
    location: university?.location || '',
    established_year: university?.established_year || '',
    ranking: university?.ranking || '',
    type: university?.type || 'Public',
    student_population: university?.student_population || '',
    campuses: university?.campuses || '',
    accreditation: university?.accreditation || '',
    website: university?.website || '',
    email_domain: university?.email_domain || '',
    country_code: university?.country_code || '',
    international_students_percentage: university?.international_students_percentage || '',
    language_of_instruction: university?.language_of_instruction || 'English',
    average_tuition_fee_usd: university?.average_tuition_fee_usd || '',
    has_online_programs: university?.has_online_programs || false,
    notable_alumni: university?.notable_alumni?.join(', ') || '',
    status: university?.status || 'Active',
    contract: university?.contract || 'Direct MOU',
  });

  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  const statusOptions = ['Active', 'Inactive'];
  const typeOptions = ['Public', 'Private', 'Ivy League'];
  const languageOptions = ['English', 'Spanish', 'French', 'German'];
  const contractOptions = ['Direct MOU', 'Indirect MOU', 'Referred'];

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
    if (!formData.university_id) newErrors.university_id = 'ID is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.abbreviation) newErrors.abbreviation = 'Abbreviation is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.established_year) newErrors.established_year = 'Established year is required';
    if (!formData.website) newErrors.website = 'Website is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUniversity = {
      ...formData,
      university_id: formData.university_id,
      established_year: parseInt(formData.established_year) || 0,
      ranking: parseFloat(formData.ranking) || 0,
      student_population: parseInt(formData.student_population) || 0,
      campuses: parseInt(formData.campuses) || 0,
      international_students_percentage: parseFloat(formData.international_students_percentage) || 0,
      average_tuition_fee_usd: parseFloat(formData.average_tuition_fee_usd) || 0,
      notable_alumni: formData.notable_alumni ? formData.notable_alumni.split(',').map((item) => item.trim()) : [],
      contract: formData.contract,
    };

    onCreate(newUniversity);
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
          {mode === 'create' ? 'Create New University' : 'Edit University'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">University ID</label>
              <input
                type="text"
                name="university_id"
                value={formData.university_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., U001"
                disabled={mode === 'edit'}
              />
              {errors.university_id && <p className="text-red-500 text-xs mt-1">{errors.university_id}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., Harvard University"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Abbreviation</label>
              <input
                type="text"
                name="abbreviation"
                value={formData.abbreviation}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., MIT"
              />
              {errors.abbreviation && <p className="text-red-500 text-xs mt-1">{errors.abbreviation}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., London, UK"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
              <input
                type="number"
                name="established_year"
                value={formData.established_year}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 1636"
              />
              {errors.established_year && <p className="text-red-500 text-xs mt-1">{errors.established_year}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ranking</label>
              <input
                type="number"
                step="0.1"
                name="ranking"
                value={formData.ranking}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 4.5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Population</label>
              <input
                type="number"
                name="student_population"
                value={formData.student_population}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 20000"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Campuses</label>
              <input
                type="number"
                name="campuses"
                value={formData.campuses}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Accreditation</label>
              <input
                type="text"
                name="accreditation"
                value={formData.accreditation}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., WASC"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., https://www.harvard.edu"
              />
              {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Domain</label>
              <input
                type="text"
                name="email_domain"
                value={formData.email_domain}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., @harvard.edu"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country Code</label>
              <input
                type="text"
                name="country_code"
                value={formData.country_code}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., US"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">International Students (%)</label>
              <input
                type="number"
                step="0.1"
                name="international_students_percentage"
                value={formData.international_students_percentage}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 25.5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Language of Instruction</label>
              <select
                name="language_of_instruction"
                value={formData.language_of_instruction}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Average Tuition Fee (USD)</label>
              <input
                type="number"
                step="0.01"
                name="average_tuition_fee_usd"
                value={formData.average_tuition_fee_usd}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 40000"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Has Online Programs</label>
              <input
                type="checkbox"
                name="has_online_programs"
                checked={formData.has_online_programs}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notable Alumni</label>
              <textarea
                name="notable_alumni"
                value={formData.notable_alumni}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., John Doe, Jane Smith"
                rows="3"
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Contract</label>
              <select
                name="contract"
                value={formData.contract}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {contractOptions.map((contract) => (
                  <option key={contract} value={contract}>
                    {contract}
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

export default CreateUniversityModal;