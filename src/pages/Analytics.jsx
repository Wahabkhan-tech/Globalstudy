// import { useState } from 'react';
import StudentAnalyticsTable from './StudentAnalyticsTable';
import CounselorAnalyticsTable from './CounselorAnalyticsTable';

const Analytics = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Monitor student and counselor performance metrics to gain insights and optimize operations.
      </p>

      <div className="space-y-8">
        {/* Student Analytics Table */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Student Analytics</h3>
          <StudentAnalyticsTable />
        </div>

        {/* Counselor Analytics Table */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Counselor Analytics</h3>
          <CounselorAnalyticsTable />
        </div>
      </div>
    </div>
  );
};

export default Analytics;