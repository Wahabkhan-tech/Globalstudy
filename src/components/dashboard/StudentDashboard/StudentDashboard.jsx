import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ProgressProvider } from '../StudentDashboard/StudentComponent/ProgressContext';
import ProfileTab from '../StudentDashboard/StudentComponent/Profile';
import UniversityList from '../StudentDashboard/StudentComponent/UniversityList';
import ScheduleAppointment from '../StudentDashboard/StudentComponent/ScheduleAppointment';
import Messages from '../StudentDashboard/StudentComponent/Messages';
import CurrencyConverter from '../StudentDashboard/StudentComponent/CurrencyConverter';
import StatusUpdate from '../StudentDashboard/StudentComponent/StatusUpdate';
import ProgressBar from '../StudentDashboard/StudentComponent/ProgressBar';



const StudentDashboard = () => {
  const { userRole } = useOutletContext();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', component: <ProfileTab /> },
    { id: 'universities', label: 'Universities', component: <UniversityList /> },
    { id: 'appointments', label: 'Appointments', component: <ScheduleAppointment /> },
    { id: 'messages', label: 'Messages', component: <Messages /> },
    { id: 'converter', label: 'Currency Converter', component: <CurrencyConverter /> },
    { id: 'status', label: 'Status', component: <StatusUpdate /> },
  ];

  return (
    <ProgressProvider role="student">
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
        {/* Show Progress Bar only for student role */}
        {userRole === 'student' && <ProgressBar setActiveTab={setActiveTab} />}

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </ProgressProvider>
  );
};

export default StudentDashboard;