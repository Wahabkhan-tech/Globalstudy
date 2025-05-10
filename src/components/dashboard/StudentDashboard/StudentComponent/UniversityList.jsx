const UniversityList = ({ title }) => {
    const universities = [
      { name: 'University A', location: 'Location A', country: 'Country A' },
      { name: 'University B', location: 'Location B', country: 'Country B' },
      { name: 'University C', location: 'Location C', country: 'Country C' },
      { name: 'University D', location: 'Location D', country: 'Country D' },
      { name: 'University E', location: 'Location E', country: 'Country E' },
    ];
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border border-red-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-200 text-gray-800">
              <th className="px-4 py-2 text-left">University</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Map</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((uni, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{uni.name}</td>
                <td className="px-4 py-2">{uni.location}</td>
                <td className="px-4 py-2">{uni.country}</td>
                <td className="px-4 py-2 text-blue-500 underline">View Map</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UniversityList;