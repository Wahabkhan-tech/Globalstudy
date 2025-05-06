const Courses = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Courses</h2>
        <p className="text-gray-600 mb-4">Manage or view available courses.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Mathematics 101</h3>
            <p className="text-gray-500">Introduction to Algebra.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Physics 201</h3>
            <p className="text-gray-500">Mechanics and Dynamics.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Courses;