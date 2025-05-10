import { useState } from 'react';

const ScheduleAppointment = () => {
  const [isAppointmentRequested, setIsAppointmentRequested] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-red-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule Appointment</h3>
      <button
        onClick={() => setIsAppointmentRequested(!isAppointmentRequested)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        {isAppointmentRequested ? 'Toggle to Request Appointment' : 'Request Appointment with a Counselor'}
      </button>
      {isAppointmentRequested && (
        <p className="mt-2 text-sm text-gray-600">Appointment requested. A counselor will contact you soon.</p>
      )}
    </div>
  );
};

export default ScheduleAppointment;