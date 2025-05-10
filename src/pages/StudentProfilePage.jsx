import { useParams, useNavigate } from 'react-router-dom';

const StudentProfilePage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const mockStudents = {
    '1': {
      student_id: '1',
      name: 'John Doe',
      region: 'Asia',
      admission_stage: 'Profile',
      email: 'john@example.com',
      study_level: 'Bachelors',
      preferred_course: 'Computer Science',
      ielts_score: { total: 7.0 },
    },
    '2': {
      student_id: '2',
      name: 'Jane Smith',
      region: 'Europe',
      admission_stage: 'Visa Preparation',
      email: 'jane@example.com',
      study_level: 'Masters',
      preferred_course: 'Business Administration',
      ielts_score: { total: 6.5 },
    },
  };

  const student = mockStudents[studentId] || {};

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="ml-64 p-6 flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Student Profile: {student.name}</h1>
          <p className="text-gray-600">View allocated student details.</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <p className="text-gray-900">{student.name}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <p className="text-gray-900">{student.email}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Region</label>
              <p className="text-gray-900">{student.region}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Admission Stage</label>
              <p className="text-gray-900">{student.admission_stage}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Study Level</label>
              <p className="text-gray-900">{student.study_level}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Preferred Course</label>
              <p className="text-gray-900">{student.preferred_course}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">IELTS Score</label>
              <p className="text-gray-900">{student.ielts_score?.total}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/messages')}
              className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Message Student
            </button>
            <button
              onClick={() => navigate('/students')}
              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Students
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
