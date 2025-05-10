const Calendar = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border border-red-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Calendar</h3>
        <button className="text-blue-500 underline mb-2">Show All</button>
        <div className="text-center">
          <h4 className="text-md font-medium text-gray-600">April 2025</h4>
          <div className="grid grid-cols-7 gap-1 mt-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-xs text-gray-500">{day}</div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <div key={day} className="text-xs text-gray-700">{day}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Calendar;