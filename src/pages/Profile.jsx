import { useState, useEffect } from 'react';

const ProfileTab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [formData, setFormData] = useState({
    personalDetails: { fullName: '', dateOfBirth: '', gender: '', nationality: '', passportNumber: '' },
    contactInfo: { email: '', phone: '', permanentAddress: '', currentAddress: '' },
    academicBackground: { highestQualification: '', grade: '', yearOfPassing: '', institutions: '' },
    testScores: { ielts: '', gre: '', mediumCert: '' },
    preferences: { countries: '', courses: '', intake: '' },
    documents: { resume: '', sop: '', transcripts: '', passport: '', scores: '' },
    financialInfo: { fundingMethod: '', sponsorDetails: '', bankStatements: '' },
    review: {},
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

  // Check if all fields in a step are filled
  const checkStepCompletion = (stepSection, stepData) => {
    return Object.values(stepData).every((value) => value.trim() !== '');
  };

  // Auto-progress to next step when current step is filled
  useEffect(() => {
    const stepSection = steps[currentStep - 1].section;
    const stepData = formData[stepSection];
    if (stepSection !== 'review' && checkStepCompletion(stepSection, stepData)) {
      setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }));
      if (currentStep < steps.length) {
        setTimeout(() => setCurrentStep(currentStep + 1), 500); // Delay for UX
      }
    } else {
      setCompletedSteps((prev) => ({ ...prev, [currentStep]: false }));
    }
  }, [formData, currentStep]);

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
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">This information will help us process your application.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  value={formData.personalDetails.fullName}
                  onChange={(e) => handleChange('personalDetails', 'fullName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.personalDetails.dateOfBirth}
                  onChange={(e) => handleChange('personalDetails', 'dateOfBirth', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Gender *</label>
                <select
                  value={formData.personalDetails.gender}
                  onChange={(e) => handleChange('personalDetails', 'gender', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Nationality *</label>
                <input
                  type="text"
                  value={formData.personalDetails.nationality}
                  onChange={(e) => handleChange('personalDetails', 'nationality', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Passport Number</label>
              <input
                type="text"
                value={formData.personalDetails.passportNumber}
                onChange={(e) => handleChange('personalDetails', 'passportNumber', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">This information will help us process your application.</p>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email *</label>
              <input
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleChange('contactInfo', 'email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone Number *</label>
              <input
                type="tel"
                value={formData.contactInfo.phone}
                onChange={(e) => handleChange('contactInfo', 'phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Permanent Address *</label>
              <textarea
                value={formData.contactInfo.permanentAddress}
                onChange={(e) => handleChange('contactInfo', 'permanentAddress', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Current Address</label>
              <textarea
                value={formData.contactInfo.currentAddress}
                onChange={(e) => handleChange('contactInfo', 'currentAddress', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                rows="3"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">This information will help us process your application.</p>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Highest Qualification *</label>
              <input
                type="text"
                value={formData.academicBackground.highestQualification}
                onChange={(e) => handleChange('academicBackground', 'highestQualification', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Grade/Percentage *</label>
              <input
                type="text"
                value={formData.academicBackground.grade}
                onChange={(e) => handleChange('academicBackground', 'grade', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Year of Passing *</label>
              <input
                type="number"
                value={formData.academicBackground.yearOfPassing}
                onChange={(e) => handleChange('academicBackground', 'yearOfPassing', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                min="2000"
                max="2025"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Previous Institutions</label>
              <input
                type="text"
                value={formData.academicBackground.institutions}
                onChange={(e) => handleChange('academicBackground', 'institutions', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">This information will help us process your application.</p>
            <div>
              <label className="block text-sm font-semibold text-gray-700">IELTS/TOEFL/PTE Score</label>
              <input
                type="text"
                value={formData.testScores.ielts}
                onChange={(e) => handleChange('testScores', 'ielts', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">GRE/GMAT Score</label>
              <input
                type="text"
                value={formData.testScores.gre}
                onChange={(e) => handleChange('testScores', 'gre', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Medium of Instruction Certificate</label>
              <input
                type="text"
                value={formData.testScores.mediumCert}
                onChange={(e) => handleChange('testScores', 'mediumCert', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">This information will help us process your application.</p>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Preferred Countries *</label>
              <input
                type="text"
                value={formData.preferences.countries}
                onChange={(e) => handleChange('preferences', 'countries', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Preferred Courses *</label>
              <input
                type="text"
                value={formData.preferences.courses}
                onChange={(e) => handleChange('preferences', 'courses', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Intake Month & Year *</label>
              <input
                type="text"
                value={formData.preferences.intake}
                onChange={(e) => handleChange('preferences', 'intake', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                required
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">This information will help us process your application.</p>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Resume/CV</label>
              <input
                type="file"
                onChange={(e) => handleChange('documents', 'resume', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Statement of Purpose (SOP)</label>
              <input
                type="file"
                onChange={(e) => handleChange('documents', 'sop', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Academic Transcripts</label>
              <input
                type="file"
                onChange={(e) => handleChange('documents', 'transcripts', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Passport Copy</label>
              <input
                type="file"
                onChange={(e) => handleChange('documents', 'passport', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Test Scorecards</label>
              <input
                type="file"
                onChange={(e) => handleChange('documents', 'scores', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">This information will help us process your application.</p>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Funding Method *</label>
              <input
                type="text"
                value={formData.financialInfo.fundingMethod}
                onChange={(e) => handleChange('financialInfo', 'fundingMethod', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Sponsor Details</label>
              <input
                type="text"
                value={formData.financialInfo.sponsorDetails}
                onChange={(e) => handleChange('financialInfo', 'sponsorDetails', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Bank Statements</label>
              <input
                type="file"
                onChange={(e) => handleChange('financialInfo', 'bankStatements', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">This information will help us process your application.</p>
            <div className="bg-teal-50 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700">Personal Details</h4>
              <p>Full Name: {formData.personalDetails.fullName}</p>
              <p>Date of Birth: {formData.personalDetails.dateOfBirth}</p>
              <p>Gender: {formData.personalDetails.gender}</p>
              <p>Nationality: {formData.personalDetails.nationality}</p>
              <p>Passport Number: {formData.personalDetails.passportNumber}</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700">Contact Information</h4>
              <p>Email: {formData.contactInfo.email}</p>
              <p>Phone: {formData.contactInfo.phone}</p>
              <p>Permanent Address: {formData.contactInfo.permanentAddress}</p>
              <p>Current Address: {formData.contactInfo.currentAddress}</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700">Academic Background</h4>
              <p>Highest Qualification: {formData.academicBackground.highestQualification}</p>
              <p>Grade: {formData.academicBackground.grade}</p>
              <p>Year of Passing: {formData.academicBackground.yearOfPassing}</p>
              <p>Institutions: {formData.academicBackground.institutions}</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700">Test Scores</h4>
              <p>IELTS/TOEFL/PTE: {formData.testScores.ielts}</p>
              <p>GRE/GMAT: {formData.testScores.gre}</p>
              <p>Medium Cert: {formData.testScores.mediumCert}</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700">Preferences</h4>
              <p>Countries: {formData.preferences.countries}</p>
              <p>Courses: {formData.preferences.courses}</p>
              <p>Intake: {formData.preferences.intake}</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700">Documents</h4>
              <p>Resume: {formData.documents.resume}</p>
              <p>SOP: {formData.documents.sop}</p>
              <p>Transcripts: {formData.documents.transcripts}</p>
              <p>Passport: {formData.documents.passport}</p>
              <p>Scores: {formData.documents.scores}</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700">Financial Info</h4>
              <p>Funding Method: {formData.financialInfo.fundingMethod}</p>
              <p>Sponsor Details: {formData.financialInfo.sponsorDetails}</p>
              <p>Bank Statements: {formData.financialInfo.bankStatements}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-red-200 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Update Desk</h3>
        <span className="text-sm text-gray-600">{timestamp}</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-4">Add Student Application</h1>
          <p className="text-gray-600 text-center mb-6">This information will help us process your application.</p>
          <div className="overflow-x-auto">
            <div className="flex justify-center items-center space-x-2 mb-6 flex-nowrap">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index + 1 <= currentStep || completedSteps[index + 1]
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-1 bg-gray-300 flex-1" />
                  )}
                  <span
                    className={`text-xs ${
                      index + 1 <= currentStep || completedSteps[index + 1] ? 'text-teal-500' : 'text-gray-400'
                    } whitespace-nowrap`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Step {currentStep}: {steps[currentStep - 1].name}
          </h2>
          <form onSubmit={currentStep === steps.length ? handleSubmit : (e) => e.preventDefault()}>
            {renderStep()}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors duration-200"
              >
                Back
              </button>
              <button
                type={currentStep === steps.length ? 'submit' : 'button'}
                onClick={currentStep !== steps.length ? () => setCurrentStep(currentStep + 1) : undefined}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
              >
                {currentStep === steps.length ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs mt-6">Copyright © 2025 xAI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;