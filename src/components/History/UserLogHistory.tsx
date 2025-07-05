import React from 'react';
import { Clock, User, Activity } from 'lucide-react';

const UserLogHistory: React.FC = () => {
  const logs = [
    {
      id: '1',
      user: 'John Doe',
      action: 'Login',
      timestamp: '2024-01-15T10:30:00Z',
      details: 'User logged in successfully',
      type: 'success',
    },
    {
      id: '2',
      user: 'Jane Smith',
      action: 'Ticket Created',
      timestamp: '2024-01-15T10:25:00Z',
      details: 'Created ticket TK-001',
      type: 'info',
    },
    {
      id: '3',
      user: 'Bob Johnson',
      action: 'Profile Updated',
      timestamp: '2024-01-15T10:20:00Z',
      details: 'Updated profile information',
      type: 'warning',
    },
    {
      id: '4',
      user: 'Alice Brown',
      action: 'Logout',
      timestamp: '2024-01-15T10:15:00Z',
      details: 'User logged out',
      type: 'info',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Log History</h2>
        
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-100 rounded-full">
                    <Activity className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{log.action}</h3>
                    <p className="text-sm text-gray-600 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{log.user}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(log.type)}`}>
                    {log.type}
                  </span>
                  <p className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 ml-12">{log.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserLogHistory;