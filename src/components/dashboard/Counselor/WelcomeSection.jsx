const WelcomeSection = ({ counselorName }) => {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-3xl font-bold">Welcome back, {counselorName}!</h2>
        <p className="mt-2 text-sm">Here’s an overview of your dashboard.</p>
      </div>
    );
  };
  
  export default WelcomeSection;