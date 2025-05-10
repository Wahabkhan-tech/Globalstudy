import { Link } from 'react-router-dom';

const ChatSummaryCard = () => {
  const messages = [
    { sender: 'Student B', text: 'Can you review my application?', time: '10:30 AM' },
    { sender: 'Student A', text: 'I uploaded the documents.', time: 'Yesterday' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Chat Summary</h3>
      <div className="space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-800 font-semibold">{msg.sender[0]}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{msg.sender}</p>
              <p className="text-sm text-gray-600 truncate">{msg.text}</p>
            </div>
            <p className="text-xs text-gray-500">{msg.time}</p>
          </div>
        ))}
      </div>
      <Link
        to="/messages"
        className="mt-4 block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Open Messages
      </Link>
    </div>
  );
};

export default ChatSummaryCard;