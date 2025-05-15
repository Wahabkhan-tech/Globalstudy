import { useState } from 'react';
import CreateUniversityModal from './CreateUniversityModal';
import FiltersPanel from '../components/dashboard/Counselor/FiltersPanel'; // Updated to use new FiltersPanel in src/pages

const Universities = ({ universities, onUpdateStatus, hideControls = false, onFilterChange }) => {
  const initialUniversities = [
    { id: 'U001', name: 'Harvard University', country: 'USA', status: 'Active', contact: 'admissions@harvard.edu' },
    { id: 'U002', name: 'University of Toronto', country: 'Canada', status: 'Active', contact: 'info@utoronto.ca' },
    { id: 'U003', name: 'Oxford University', country: 'UK', status: 'Inactive', contact: 'admissions@ox.ac.uk' },
    { id: 'U004', name: 'University of Sydney', country: 'Australia', status: 'Active', contact: 'study@sydney.edu.au' },
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
      university.id === updatedUniversity.id ? updatedUniversity : university
    );
    setUniversityList(updatedUniversities);
    setIsModalOpen(false);
    if (onUpdateStatus) onUpdateStatus(updatedUniversity.id, updatedUniversity.status);
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
    const updatedUniversities = universityList.filter((university) => !selectedUniversityIds.includes(university.id));
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
                        setSelectedUniversityIds(universities.map((university) => university.id));
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
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Country</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {universities.length > 0 ? (
              universities.map((university) => (
                <tr key={university.id} className="hover:bg-gray-50 transition-colors">
                  {!hideControls && (
                    <td className="px-2 py-2 w-12">
                      <input
                        type="checkbox"
                        checked={selectedUniversityIds.includes(university.id)}
                        onChange={() => handleCheckboxChange(university.id)}
                      />
                    </td>
                  )}
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[80px]">{university.id}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[120px]">{university.name}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[150px] hidden lg:table-cell">{university.country}</td>
                  <td className="px-2 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        university.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {university.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[100px] hidden md:table-cell">{university.contact}</td>
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
                <td colSpan={hideControls ? 6 : 7} className="px-2 py-2 text-center text-sm text-gray-500">
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