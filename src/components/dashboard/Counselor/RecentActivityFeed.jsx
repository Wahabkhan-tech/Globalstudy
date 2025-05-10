const RecentActivityFeed = () => {
    const activities = [
      { message: "Student A moved to 'Admission Process'", time: '2 hours ago' },
      { message: "New chat from Student B", time: '4 hours ago' },
      { message: "Student C completed profile", time: '1 day ago' },
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-800">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default RecentActivityFeed;