import { useState } from 'react';
import ProfileUpdate from './Studentcomponent/ProfileUpdate';
import Profile from '../../pages/Profile';
import StatusUpdate from './Studentcomponent/StatusUpdate';
import UniversityList from './Studentcomponent/UniversityList';
import ScheduleAppointment from './Studentcomponent/ScheduleAppointment';
import Messages from './Studentcomponent/Messages';
// import Calendar from './Studentcomponent/Calendar';
import CurrencyConverter from './Studentcomponent/CurrencyConverter';

const StudentDashboard = () => {
  const [ActiveTab] = useState('Profile');
  const formProgress = 60; // Example: 60% completion

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 font-sans">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-6 max-w-7xl mx-auto">
        {/* Progress Bar for Profile Completion Status */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile Completion Status</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {formProgress}% Complete
            {formProgress < 100 && (
              <span className="ml-2 text-indigo-600 font-medium">
                - Fill out remaining fields to complete your profile
              </span>
            )}
          </p>
        </div>


        <Profile/>
        {/* Profile Update Section */}
        <ProfileUpdate />

        {/* Status Update Section */}
        <StatusUpdate />

        {/* University Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <UniversityList title="Top 5 Universities Worldwide (Till Date)" />
          <UniversityList title="Top 5 Universities Worldwide (This Month)" />
        </div>


        {/* Schedule Appointment, Messages, Calendar, and Currency Converter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScheduleAppointment />
          <Messages />
          {/* <Calendar /> */}
          <CurrencyConverter />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;