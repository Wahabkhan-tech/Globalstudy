import { useState } from 'react';
import FiltersPanel from '../components/dashboard/Counselor/FiltersPanel'; // Adjust path as per your Vite project structure
import CreateUserModal from '../modals/CreateUserModal'; // Adjust path to your CreateUserModal.jsx

const User = ({ role, pageRole = '', users, onUpdateStatus, hideControls = false, onFilterChange }) => {
  const initialUsers = [
    { id: 'S001', name: 'Jane Smith', role: 'student', course: 'Mathematics 101', admission_stage: 'Profile', status: 'Active', assignedTo: '', region: 'North America' },
    { id: 'S002', name: 'John Doe', role: 'student', course: 'Physics 201', admission_stage: 'Institution', status: 'Pending', assignedTo: 'Teacher XYZ', region: 'Asia' },
    { id: 'S003', name: 'Alice Johnson', role: 'student', course: 'Chemistry 101', admission_stage: 'Visa Preparation', status: 'Completed', assignedTo: 'Teacher XYZ', region: 'Europe' },
    { id: 'S004', name: 'Bob Brown', role: 'student', course: 'Computer Science 101', admission_stage: 'Joining Uni', status: 'Inactive', assignedTo: '', region: 'Africa' },
    { id: 'C001', name: 'Dr. Lee', role: 'counselor', status: 'Active', assignedTo: 'Admin', region: 'Asia' },
    { id: 'C002', name: 'Emma Wilson', role: 'counselor', status: 'Pending', assignedTo: '', region: 'Europe' },
    { id: 'M001', name: 'Mark Jones', role: 'media_channel', status: 'Active', assignedTo: '', region: 'North America' },
    { id: 'M002', name: 'Lisa Taylor', role: 'media_channel', status: 'Inactive', assignedTo: 'Admin', region: 'Australia' },
  ];

  const [studentUsers, setStudentUsers] = useState(users && users[0]?.role === 'student' ? users : initialUsers.filter(u => u.role === 'student'));
  const [counselorUsers, setCounselorUsers] = useState(users && users[0]?.role === 'counselor' ? users : initialUsers.filter(u => u.role === 'counselor'));
  const [mcpUsers, setMcpUsers] = useState(users && users[0]?.role === 'media_channel' ? users : initialUsers.filter(u => u.role === 'media_channel'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [modalPageRole, setModalPageRole] = useState('');

  const handleCreateUser = (newUser) => {
    const updatedUsers = [...(users || initialUsers), newUser];
    const setUsers = {
      student: setStudentUsers,
      counselor: setCounselorUsers,
      media_channel: setMcpUsers,
    }[newUser.role];
    setUsers(prev => [...prev, newUser]);
    if (onFilterChange) onFilterChange(updatedUsers);
  };

  const handleUpdateUser = (updatedUser) => {
    const setUsers = {
      student: setStudentUsers,
      counselor: setCounselorUsers,
      media_channel: setMcpUsers,
    }[updatedUser.role];
    const updatedUsers = (users || initialUsers).map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(prev => prev.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
    if (onUpdateStatus) onUpdateStatus(updatedUser.id, updatedUser.status);
    if (onFilterChange) onFilterChange(updatedUsers);
  };

  const handleSubmitUser = (userData) => {
    if (modalMode === 'create') {
      handleCreateUser(userData);
    } else {
      handleUpdateUser(userData);
    }
  };

  const handleOpenModal = (mode, user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    setModalPageRole(mode === 'edit' && user ? user.role : pageRole);
    setIsModalOpen(true);
  };

  const handleDeleteUsers = () => {
    if (selectedUserIds.length === 0) return;
    const updatedUsers = (users || initialUsers).filter(user => !selectedUserIds.includes(user.id));
    setStudentUsers(prev => prev.filter(user => !selectedUserIds.includes(user.id)));
    setCounselorUsers(prev => prev.filter(user => !selectedUserIds.includes(user.id)));
    setMcpUsers(prev => prev.filter(user => !selectedUserIds.includes(user.id)));
    if (onFilterChange) onFilterChange(updatedUsers);
    setSelectedUserIds([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedUserIds(prev =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id, newStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, newStatus);
    }
  };

  const renderTable = (users, userRole, showStudentColumns = false) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {userRole === 'student' ? 'Students' : userRole === 'counselor' ? 'Counselors' : 'Media Channels (MCPs)'}
      </h3>
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
                        setSelectedUserIds(users.map(user => user.id));
                      } else {
                        setSelectedUserIds([]);
                      }
                    }}
                    checked={users.length > 0 && selectedUserIds.length === users.length}
                  />
                </th>
              )}
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              {showStudentColumns ? (
                <>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Course</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Admission Stage</th>
                </>
              ) : (
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Role</th>
              )}
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Assigned To</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  {!hideControls && (
                    <td className="px-2 py-2 w-12">
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />
                    </td>
                  )}
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[80px]">{user.id}</td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[120px]">{user.name}</td>
                  {showStudentColumns ? (
                    <>
                      <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[150px] hidden lg:table-cell">{user.course}</td>
                      <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[150px] hidden lg:table-cell">{user.admission_stage}</td>
                    </>
                  ) : (
                    <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[100px] hidden md:table-cell">{user.role}</td>
                  )}
                  <td className="px-2 py-2 text-sm">
                    {role === 'counselor' && userRole === 'student' ? (
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : user.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : user.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-[100px] hidden md:table-cell">{user.assignedTo || 'Not Assigned'}</td>
                  <td className="px-2 py-2 text-sm">
                    <div className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-2">
                      <button
                        onClick={() => handleOpenModal(role === 'counselor' && userRole === 'student' ? 'view' : 'edit', user)}
                        className="text-blue-600 hover:text-blue-800 hover:underline text-xs"
                      >
                        {role === 'counselor' && userRole === 'student' ? 'View' : 'Edit'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={showStudentColumns ? (hideControls ? 7 : 8) : (hideControls ? 6 : 7)} className="px-2 py-2 text-center text-sm text-gray-500">
                  No {userRole}s found.
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {role === 'counselor' ? 'Student Management' : 'User Management'}
      </h2>
      <p className="text-gray-600 mb-4 text-sm">
        {role === 'counselor'
          ? 'Manage student records, progress, and assignments.'
          : 'Manage all users, their roles, and statuses.'}
      </p>
      {!hideControls && (
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <button
            onClick={() => handleOpenModal('create')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm mb-2 sm:mb-0"
          >
            {pageRole === 'student' ? 'Create Student' : pageRole === 'counselor' ? 'Create Counselor' : pageRole === 'media_channel' ? 'Create Media Channel' : 'Create User'}
          </button>
          <button
            onClick={handleDeleteUsers}
            disabled={selectedUserIds.length === 0}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedUserIds.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            Delete Selected Users
          </button>
        </div>
      )}
      {users && (
        <FiltersPanel
          users={users}
          onFilterChange={onFilterChange}
        />
      )}
      {users ? (
        renderTable(users, users[0]?.role || 'student', users[0]?.role === 'student')
      ) : role === 'counselor' ? (
        renderTable(studentUsers, 'student', true)
      ) : (
        <>
          {renderTable(studentUsers, 'student', true)}
          {renderTable(counselorUsers, 'counselor')}
          {renderTable(mcpUsers, 'media_channel')}
        </>
      )}

      {isModalOpen && (
        <CreateUserModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitUser}
          mode={modalMode}
          user={selectedUser}
          pageRole={modalPageRole}
        />
      )}
    </div>
  );
};

export default User;