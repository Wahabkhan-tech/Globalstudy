import { useContext } from 'react';
import { ProgressContext } from '../StudentComponent/ProgressContext';

const ProgressBar = ({ setActiveTab }) => {
  const { completedSteps, isFormCompleted, resetFormCompletion } = useContext(ProgressContext);
  const totalSteps = 8;
  const completedCount = completedSteps.size;
  const progress = Math.round((completedCount / totalSteps) * 100);

  const handleEditProfile = () => {
    resetFormCompletion(); // Reset the completion flag to show the form again
    setActiveTab('profile'); // Switch to the Profile tab
  };

  if (isFormCompleted) {
    return (
      <div className="w-full max-w-md mx-auto bg-white/30 backdrop-blur-md p-4 rounded-lg shadow-lg mb-6 border border-white/20">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">Profile Completed Successfully!</h3>
            <p className="text-sm text-gray-600 mb-4">
              Great job! Your profile is now complete. You can edit it anytime.
            </p>
            <button
              onClick={handleEditProfile}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/30 backdrop-blur-md p-4 rounded-lg shadow-lg mb-6 border border-white/20">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Profile Completion</h3>
      <div className="flex items-center space-x-4">
        {/* Circular Progress Indicator */}
        <div className="relative w-16 h-16">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-gray-200"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="text-teal-600"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${progress}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-teal-600">{progress}%</span>
          </div>
        </div>
        {/* Progress Message */}
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {progress < 100
              ? `You're ${progress}% there! Complete your profile to unlock all features.`
              : 'Great job! Your profile is fully completed.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;