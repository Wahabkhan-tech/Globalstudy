import { useState } from 'react';

const ProfileUpdate = () => {
  const [activeTab, setActiveTab] = useState('Manage Profile');
  const tabs = [
    'Manage Profile',
    'Background',
    'Manage Academic Details',
    'Manage Education History',
    'Manage Additional Info',
  ];
  const timestamp = '29 Apr 2025';
  const actionSteps = [
    'Step #1: Set up Your Profile',
    'Step #2: Add Basic Details',
    'Step #3: Add Academic Details',
    'Step #4: Add Education History',
    'Step #5: Add Additional Information',
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-red-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Update Desk</h3>
        <span className="text-sm text-gray-600">{timestamp}</span>
      </div>
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="text-md font-semibold text-gray-800 mb-2">Action Advisor</h4>
        <ul className="list-disc pl-5 text-gray-600">
          {actionSteps.map((step, index) => (
            <li key={index} className="mb-1">
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileUpdate;