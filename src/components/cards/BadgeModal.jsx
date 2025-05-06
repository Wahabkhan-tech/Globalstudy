import { XMarkIcon } from '@heroicons/react/24/outline';

const BadgeModal = ({ isOpen, onClose, title, value, status }) => {
  if (!isOpen) return null;

  // Define table headers based on badge data
  const headers = ['Title', 'Value'];
  if (status) {
    headers.push('Status');
  }

  // Define table row data
  const rowData = [title, value];
  if (status) {
    rowData.push(status);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="bg-blue-500 text-white px-4 py-2 text-left text-sm font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                {rowData.map((data, index) => (
                  <td
                    key={index}
                    className="px-4 py-2 text-gray-700 text-sm border-t border-gray-200"
                  >
                    {data}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BadgeModal;