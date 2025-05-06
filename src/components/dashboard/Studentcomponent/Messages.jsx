const Messages = () => {
    const messages = [
      { sender: 'John Doe', text: 'Short message goes here...', time: '15 minutes ago' },
      { sender: 'John Doe', text: 'Short message goes here...', time: '15 minutes ago' },
      { sender: 'John Doe', text: 'Short message goes here...', time: '15 minutes ago' },
    ];
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border border-red-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Messages</h3>
        <button className="text-blue-500 underline mb-2">Show All</button>
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li key={index} className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">{msg.sender}</span>: {msg.text} <span className="text-gray-500">{msg.time}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Messages;