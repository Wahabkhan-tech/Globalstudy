import { useState } from 'react';
import CreateUniversityModal from '../modals/CreateUniversityModal';
import FiltersPanel from '../components/dashboard/Counselor/FiltersPanel'; // Updated to use new FiltersPanel in src/pages

const Universities = ({ universities, onUpdateStatus, hideControls = false, onFilterChange }) => {
  const initialUniversities = [
    {
      university_id: 'U001',
      name: 'Harvard University',
      abbreviation: 'Harvard',
      location: 'Cambridge, USA',
      established_year: 1636,
      ranking: 1.0,
      type: 'Ivy League',
      student_population: 21000,
      campuses: 3,
      accreditation: 'NECHE',
      website: 'https://www.harvard.edu',
      email_domain: '@harvard.edu',
      country_code: 'US',
      international_students_percentage: 25.0,
      language_of_instruction: 'English',
      average_tuition_fee_usd: 55000.0,
      has_online_programs: true,
      notable_alumni: ['Barack Obama', 'Bill Gates'],
      status: 'Active',
    },
    {
      university_id: 'U002',
      name: 'University of Toronto',
      abbreviation: 'UofT',
      location: 'Toronto, Canada',
      established_year: 1827,
      ranking: 21.0,
      type: 'Public',
      student_population: 93000,
      campuses: 3,
      accreditation: 'AACSB',
      website: 'https://www.utoronto.ca',
      email_domain: '@utoronto.ca',
      country_code: 'CA',
      international_students_percentage: 27.0,
      language_of_instruction: 'English',
      average_tuition_fee_usd: 45000.0,
      has_online_programs: true,
      notable_alumni: ['Lester Pearson', 'Margaret Atwood'],
      status: 'Active',
    },
    {
      university_id: 'U003',
      name: 'Oxford University',
      abbreviation: 'Oxford',
      location: 'Oxford, UK',
      established_year: 1096,
      ranking: 3.0,
      type: 'Public',
      student_population: 25000,
      campuses: 1,
      accreditation: 'QAA',
      website: 'https://www.ox.ac.uk',
      email_domain: '@ox.ac.uk',
      country_code: 'UK',
      international_students_percentage: 40.0,
      language_of_instruction: 'English',
      average_tuition_fee_usd: 38000.0,
      has_online_programs: false,
      notable_alumni: ['Stephen Hawking', 'J.R.R. Tolkien'],
      status: 'Inactive',
    },
    {
      university_id: 'U004',
      name: 'University of Sydney',
      abbreviation: 'USyd',
      location: 'Sydney, Australia',
      established_year: 1850,
      ranking: 19.0,
      type: 'Public',
      student_population: 73000,
      campuses: 2,
      accreditation: 'TEQSA',
      website: 'https://www.sydney.edu.au',
      email_domain: '@sydney.edu.au',
      country_code: 'AU',
      international_students_percentage: 35.0,
      language_of_instruction: 'English',
      average_tuition_fee_usd: 40000.0,
      has_online_programs: true,
      notable_alumni: ['Gough Whitlam', 'John Howard'],
      status: 'Active',
    },
  ];

  const [universityList, setUniversityList] = useState(universities || initialUniversities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedUniversityIds, setSelectedUniversityIds] = useState([]);

  const handleCreateUniversity = (newUniversity) => {
    const updatedUniversities = [...universityList, newUniversity];
    setUniversityList(updatedUniversities);
    setIsModalOpen(false);
    if (onFilterChange) onFilterChange(updatedUniversities);
  };

  const handleUpdateUniversity = (updatedUniversity) => {
    const updatedUniversities = universityList.map((university) =>
      university.university_id === updatedUniversity.university_id ? updatedUniversity : university
    );
    setUniversityList(updatedUniversities);
    setIsModalOpen(false);
    if (onUpdateStatus) onUpdateStatus(updatedUniversity.university_id, updatedUniversity.status);
    if (onFilterChange) onFilterChange(updatedUniversities);
  };

  const handleSubmitUniversity = (universityData) => {
    if (modalMode === 'create') {
      handleCreateUniversity(universityData);
    } else {
      handleUpdateUniversity(universityData);
    }
  };

  const handleOpenModal = (mode, university = null) => {
    setModalMode(mode);
    setSelectedUniversity(university);
    setIsModalOpen(true);
  };

  const handleDeleteUniversities = () => {
    if (selectedUniversityIds.length === 0) return;
    const updatedUniversities = universityList.filter(
      (university) => !selectedUniversityIds.includes(university.university_id)
    );
    setUniversityList(updatedUniversities);
    if (onFilterChange) onFilterChange(updatedUniversities);
    setSelectedUniversityIds([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedUniversityIds((prev) =>
      prev.includes(id) ? prev.filter((universityId) => universityId !== id) : [...prev, id]
    );
  };

  const renderTable = (universities) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Universities</h3>
      <div className="w-full overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              {!hideControls && (
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUniversityIds(universities.map((university) => university.university_id));
                      } else {
                        setSelectedUniversityIds([]);
                      }
                    }}
                    checked={universities.length > 0 && selectedUniversityIds.length === universities.length}
                  />
                </th>
              )}
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Abbreviation</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Location</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Established</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Ranking</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Type</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Website</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {universities.length > 0 ? (
              universities.map((university) => (
                <tr key={university.university_id} className="hover:bg-gray-50 transition-colors">
                  {!hideControls && (
                    <td className="px-2 py-2 w-12">
                      <input
                        type="checkbox"
                        checked={selectedUniversityIds.includes(university.university_id)}
                        onChange={() => handleCheckboxChange(university.university_id)}
                      />
                    </td>
                  )}
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[80px]">{university.university_id}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[120px]">{university.name}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[100px] hidden lg:table-cell">{university.abbreviation}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[150px] hidden lg:table-cell">{university.location}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[100px] hidden xl:table-cell">{university.established_year}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[80px] hidden xl:table-cell">{university.ranking}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[100px] hidden md:table-cell">{university.type}</td>
                  <td className="px-2 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        university.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {university.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[150px] hidden md:table-cell">
                    <a href={university.website} target="_blank" className="text-blue-600 hover:underline">
                      Link
                    </a>
                  </td>
                  <td className="px-2 py-2 text-sm">
                    <div className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-2">
                      <button
                        onClick={() => handleOpenModal('edit', university)}
                        className="text-blue-600 hover:text-blue-800 hover:underline text-xs"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={hideControls ? 9 : 10} className="px-2 py-2 text-center text-sm text-gray-500">
                  No universities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">University Management</h2>
      <p className="text-gray-600 mb-4 text-sm">Manage university records and statuses.</p>
      {!hideControls && (
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <button
            onClick={() => handleOpenModal('create')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm mb-2 sm:mb-0"
          >
            Create University
          </button>
          <button
            onClick={handleDeleteUniversities}
            disabled={selectedUniversityIds.length === 0}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedUniversityIds.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            Delete Selected Universities
          </button>
        </div>
      )}
      <FiltersPanel
        data={universityList}
        onFilterChange={setUniversityList}
        entityType="universities"
      />
      {renderTable(universityList)}
      {isModalOpen && (
        <CreateUniversityModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleSubmitUniversity}
          mode={modalMode}
          university={selectedUniversity}
        />
      )}
    </div>
  );
};

export default Universities;