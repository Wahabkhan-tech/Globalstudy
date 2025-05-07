import { useState, useEffect } from 'react';

const ProfileTab = ({ onProgressUpdate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('completedSteps');
    return saved ? JSON.parse(saved) : {};
  });
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('formData');
    return saved
      ? JSON.parse(saved)
      : {
          personalDetails: { fullName: '', dateOfBirth: '', gender: '', nationality: '', passportNumber: '' },
          contactInfo: { email: '', phone: '', permanentAddress: '', currentAddress: '' },
          academicBackground: { highestQualification: '', grade: '', yearOfPassing: '', institutions: '' },
          testScores: { ielts: '', gre: '', mediumCert: '' },
          preferences: { countries: '', courses: '', intake: '' },
          documents: { resume: '', sop: '', transcripts: '', passport: '', scores: '' },
          financialInfo: { fundingMethod: '', sponsorDetails: '', bankStatements: '' },
          review: {},
        };
  });

  const steps = [
    { name: 'Personal Details', section: 'personalDetails' },
    { name: 'Contact Information', section: 'contactInfo' },
    { name: 'Academic Background', section: 'academicBackground' },
    { name: 'Test Scores', section: 'testScores' },
    { name: 'Preferred Country & Course', section: 'preferences' },
    { name: 'Documents Upload', section: 'documents' },
    { name: 'Financial & Sponsorship Info', section: 'financialInfo' },
    { name: 'Review & Submit', section: 'review' },
  ];

  const timestamp = '06 May 2025';

  const checkStepCompletion = (stepSection, stepData) => {
    return Object.values(stepData).every((value) => value.trim() !== '');
  };

  useEffect(() => {
    const stepSection = steps[currentStep - 1].section;
    const stepData = formData[stepSection];
    if (stepSection !== 'review' && checkStepCompletion(stepSection, stepData)) {
      setCompletedSteps((prev) => {
        const updatedSteps = { ...prev, [currentStep]: true };
        localStorage.setItem('completedSteps', JSON.stringify(updatedSteps));
        return updatedSteps;
      });
      if (currentStep < steps.length) {
        setTimeout(() => setCurrentStep(currentStep + 1), 500);
      }
    } else {
      setCompletedSteps((prev) => {
        const updatedSteps = { ...prev, [currentStep]: false };
        localStorage.setItem('completedSteps', JSON.stringify(updatedSteps));
        return updatedSteps;
      });
    }

    // Calculate progress and pass it to the parent
    const completedCount = Object.values(completedSteps).filter(Boolean).length;
    const progress = (completedCount / (steps.length - 1)) * 100; // Exclude the review step from total
    if (onProgressUpdate) {
      onProgressUpdate(progress);
    }
  }, [formData, currentStep, steps.length, completedSteps, onProgressUpdate]);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully!');
    console.log('Form Data:', formData);
    // Optionally clear localStorage on submit
    localStorage.removeItem('formData');
    localStorage.removeItem('completedSteps');
    setFormData({
      personalDetails: { fullName: '', dateOfBirth: '', gender: '', nationality: '', passportNumber: '' },
      contactInfo: { email: '', phone: '', permanentAddress: '', currentAddress: '' },
      academicBackground: { highestQualification: '', grade: '', yearOfPassing: '', institutions: '' },
      testScores: { ielts: '', gre: '', mediumCert: '' },
      preferences: { countries: '', courses: '', intake: '' },
      documents: { resume: '', sop: '', transcripts: '', passport: '', scores: '' },
      financialInfo: { fundingMethod: '', sponsorDetails: '', bankStatements: '' },
      review: {},
    });
    setCompletedSteps({});
    setCurrentStep(1);
    if (onProgressUpdate) {
      onProgressUpdate(0);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 p-4 bg-white rounded-lg shadow-md ">
            <p className="text-gray-600 text-sm">This information will help us process your application.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  value={formData.personalDetails.fullName}
                  onChange={(e) => handleChange('personalDetails', 'fullName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.personalDetails.dateOfBirth}
                  onChange={(e) => handleChange('personalDetails', 'dateOfBirth', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700">Gender *</label>
                <select
                  value={formData.personalDetails.gender}
                  onChange={(e) => handleChange('personalDetails', 'gender', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700">Nationality *</label>
                <input
                  type="text"
                  value={formData.personalDetails.nationality}
                  onChange={(e) => handleChange('personalDetails', 'nationality', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Passport Number</label>
              <input
                type="text"
                value={formData.personalDetails.passportNumber}
                onChange={(e) => handleChange('personalDetails', 'passportNumber', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">This information will help us process your application.</p>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Email *</label>
              <input
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleChange('contactInfo', 'email', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Phone Number *</label>
              <input
                type="tel"
                value={formData.contactInfo.phone}
                onChange={(e) => handleChange('contactInfo', 'phone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Permanent Address *</label>
              <textarea
                value={formData.contactInfo.permanentAddress}
                onChange={(e) => handleChange('contactInfo', 'permanentAddress', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                rows="2"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Current Address</label>
              <textarea
                value={formData.contactInfo.currentAddress}
                onChange={(e) => handleChange('contactInfo', 'currentAddress', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                rows="2"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">This information will help us process your application.</p>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Highest Qualification *</label>
              <input
                type="text"
                value={formData.academicBackground.highestQualification}
                onChange={(e) => handleChange('academicBackground', 'highestQualification', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Grade/Percentage *</label>
              <input
                type="text"
                value={formData.academicBackground.grade}
                onChange={(e) => handleChange('academicBackground', 'grade', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Year of Passing *</label>
              <input
                type="number"
                value={formData.academicBackground.yearOfPassing}
                onChange={(e) => handleChange('academicBackground', 'yearOfPassing', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                min="2000"
                max="2025"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Previous Institutions</label>
              <input
                type="text"
                value={formData.academicBackground.institutions}
                onChange={(e) => handleChange('academicBackground', 'institutions', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">This information will help us process your application.</p>
            <div>
              <label className="block text-xs font-semibold text-gray-700">IELTS/TOEFL/PTE Score</label>
              <input
                type="text"
                value={formData.testScores.ielts}
                onChange={(e) => handleChange('testScores', 'ielts', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">GRE/GMAT Score</label>
              <input
                type="text"
                value={formData.testScores.gre}
                onChange={(e) => handleChange('testScores', 'gre', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Medium of Instruction Certificate</label>
              <input
                type="text"
                value={formData.testScores.mediumCert}
                onChange={(e) => handleChange('testScores', 'mediumCert', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">This information will help us process your application.</p>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Preferred Countries *</label>
              <input
                type="text"
                value={formData.preferences.countries}
                onChange={(e) => handleChange('preferences', 'countries', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Preferred Courses *</label>
              <input
                type="text"
                value={formData.preferences.courses}
                onChange={(e) => handleChange('preferences', 'courses', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Intake Month & Year *</label>
              <input
                type="text"
                value={formData.preferences.intake}
                onChange={(e) => handleChange('preferences', 'intake', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                required
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">This information will help us process your application.</p>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Resume/CV</label>
              <input
                type="file"
                onChange={(e) => handleChange('documents', 'resume', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Statement of Purpose (SOP)</label>
              <input
                type="file"
                onChange={(e) => handleChange('documents', 'sop', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Academic Transcripts</label>
              <input
                type="file"
                onChange={(e) => handleChange('documents', 'transcripts', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Passport Copy</label>
              <input
                type="file"
                onChange={(e) => handleChange('documents', 'passport', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Test Scorecards</label>
              <input
                type="file"
                onChange={(e) => handleChange('documents', 'scores', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">This information will help us process your application.</p>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Funding Method *</label>
              <input
                type="text"
                value={formData.financialInfo.fundingMethod}
                onChange={(e) => handleChange('financialInfo', 'fundingMethod', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Sponsor Details</label>
              <input
                type="text"
                value={formData.financialInfo.sponsorDetails}
                onChange={(e) => handleChange('financialInfo', 'sponsorDetails', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Bank Statements</label>
              <input
                type="file"
                onChange={(e) => handleChange('financialInfo', 'bankStatements', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm"
              />
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4 p-4 bg-white rounded-lg shadow-md max-h-96 overflow-y-auto">
            <p className="text-gray-600 text-sm">This information will help us process your application.</p>
            <div className="bg-teal-50 p-3 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700 text-sm">Personal Details</h4>
              <p className="text-xs">Full Name: {formData.personalDetails.fullName}</p>
              <p className="text-xs">Date of Birth: {formData.personalDetails.dateOfBirth}</p>
              <p className="text-xs">Gender: {formData.personalDetails.gender}</p>
              <p className="text-xs">Nationality: {formData.personalDetails.nationality}</p>
              <p className="text-xs">Passport Number: {formData.personalDetails.passportNumber}</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700 text-sm">Contact Information</h4>
              <p className="text-xs">Email: {formData.contactInfo.email}</p>
              <p className="text-xs">Phone: {formData.contactInfo.phone}</p>
              <p className="text-xs">Permanent Address: {formData.contactInfo.permanentAddress}</p>
              <p className="text-xs">Current Address: {formData.contactInfo.currentAddress}</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700 text-sm">Academic Background</h4>
              <p className="text-xs">Highest Qualification: {formData.academicBackground.highestQualification}</p>
              <p className="text-xs">Grade: {formData.academicBackground.grade}</p>
              <p className="text-xs">Year of Passing: {formData.academicBackground.yearOfPassing}</p>
              <p className="text-xs">Institutions: {formData.academicBackground.institutions}</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700 text-sm">Test Scores</h4>
              <p className="text-xs">IELTS/TOEFL/PTE: {formData.testScores.ielts}</p>
              <p className="text-xs">GRE/GMAT: {formData.testScores.gre}</p>
              <p className="text-xs">Medium Cert: {formData.testScores.mediumCert}</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700 text-sm">Preferences</h4>
              <p className="text-xs">Countries: {formData.preferences.countries}</p>
              <p className="text-xs">Courses: {formData.preferences.courses}</p>
              <p className="text-xs">Intake: {formData.preferences.intake}</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700 text-sm">Documents</h4>
              <p className="text-xs">Resume: {formData.documents.resume}</p>
              <p className="text-xs">SOP: {formData.documents.sop}</p>
              <p className="text-xs">Transcripts: {formData.documents.transcripts}</p>
              <p className="text-xs">Passport: {formData.documents.passport}</p>
              <p className="text-xs">Scores: {formData.documents.scores}</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700 text-sm">Financial Info</h4>
              <p className="text-xs">Funding Method: {formData.financialInfo.fundingMethod}</p>
              <p className="text-xs">Sponsor Details: {formData.financialInfo.sponsorDetails}</p>
              <p className="text-xs">Bank Statements: {formData.financialInfo.bankStatements}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-red-200 max-w-2xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-800">Update Desk</h3>
        <span className="text-xs text-gray-600">{timestamp}</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-xl font-semibold text-gray-900 text-center mb-3">Add Student Application</h1>
          <p className="text-gray-600 text-center mb-4 text-sm">This information will help us process your application.</p>
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center space-x-6 mb-4 relative">
              <div
                className="h-1 absolute top-1/2 transform -translate-y-1/2"
                style={{
                  backgroundColor: '#cdd0d7',
                  left: '0',
                  right: '0',
                }}
              ></div>
              <div
                className="h-1 bg-teal-500 absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: '0',
                  width: `calc(${(Math.max(...Object.keys(completedSteps).map(Number), 0) / (steps.length - 1)) * 100}%)`,
                  transition: 'width 0.3s ease-in-out',
                }}
              ></div>
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                      index + 1 <= currentStep || completedSteps[index + 1]
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-lg font-bold text-gray-900 text-center mb-3">
            Step {currentStep}: {steps[currentStep - 1].name}
          </h2>
          <form onSubmit={currentStep === steps.length ? handleSubmit : (e) => e.preventDefault()}>
            {renderStep()}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors duration-200 text-sm"
              >
                Back
              </button>
              <button
                type={currentStep === steps.length ? 'submit' : 'button'}
                onClick={currentStep !== steps.length ? () => setCurrentStep(currentStep + 1) : undefined}
                className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-sm"
              >
                {currentStep === steps.length ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-[10px] mt-4">Copyright © 2025 Global st. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;