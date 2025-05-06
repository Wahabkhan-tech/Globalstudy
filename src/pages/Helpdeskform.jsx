import { useState, useEffect } from 'react';

const HelpdeskStepperForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  // Load submitted data from localStorage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('helpdeskStudentData')) || [];
    setSubmittedData(storedData);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setError('');
    if (step === 1 && formData.name.length < 2) {
      setError('Name must be at least 2 characters long.');
      return;
    }
    if (step === 2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (step === 3 && !formData.program) {
      setError('Please select a program.');
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    setError('');
    setIsLoading(true);

    const newEntry = { ...formData, id: Date.now() };
    const updatedData = [...submittedData, newEntry];
    localStorage.setItem('helpdeskStudentData', JSON.stringify(updatedData));
    setSubmittedData(updatedData);

    // Reset form
    setFormData({ name: '', email: '', program: '' });
    setStep(1);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 font-sans flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full border border-gray-100">
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-indigo-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h2 className="text-2xl font-semibold ml-3 text-indigo-700 tracking-wide">
            Helpdesk: Collect Student Data
          </h2>
        </div>

        {/* Stepper Indicator */}
        <div className="flex justify-between mb-6">
          {['Student Name', 'Email', 'Program'].map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > index + 1
                    ? 'bg-indigo-700 text-white'
                    : step === index + 1
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span className="text-sm mt-2 text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form Steps */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {step === 1 && (
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
                Student Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                required
              />
            </div>
          )}
          {step === 2 && (
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
                Student Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                required
              />
            </div>
          )}
          {step === 3 && (
            <div>
              <label htmlFor="program" className="block text-sm font-semibold text-gray-600">
                Program of Interest
              </label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                required
              >
                <option value="">Select a program</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Engineering">Engineering</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className={`py-2 px-4 rounded-lg font-semibold ${
                step === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-700 text-white hover:bg-indigo-800'
              } transition-colors duration-200`}
            >
              Previous
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="py-2 px-4 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors duration-200 font-semibold"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`py-2 px-4 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors duration-200 font-semibold ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </form>

        {/* Table for Uploaded Data */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">Uploaded Student Data</h3>
          {submittedData.length === 0 ? (
            <p className="text-gray-600 text-center">No student data uploaded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="py-2 px-4 border-b text-left text-indigo-700">Name</th>
                    <th className="py-2 px-4 border-b text-left text-indigo-700">Email</th>
                    <th className="py-2 px-4 border-b text-left text-indigo-700">Program</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedData.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b text-gray-700">{entry.name}</td>
                      <td className="py-2 px-4 border-b text-gray-700">{entry.email}</td>
                      <td className="py-2 px-4 border-b text-gray-700">{entry.program}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-4 text-gray-600 text-center">
            Total Students Uploaded:{' '}
            <span className="font-semibold">{submittedData.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpdeskStepperForm;