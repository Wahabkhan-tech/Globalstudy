import StepperForm from '../../../common/StepperForm';

const ProfileTab = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Profile</h2>
      <StepperForm role="student" />
    </div>
  );
};

export default ProfileTab;