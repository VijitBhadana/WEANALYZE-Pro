import React from 'react';
import { User, Star } from 'lucide-react';

interface OperationMember {
  id: string;
  name: string;
  contact_no: string;
  department: string;
  total_tickets: number;
  tickets_solved: number;
  tickets_pending: number;
  tickets_in_progress: number;
  rating: number;
  avatar?: string;
}

const Performance: React.FC = () => {
  const [selectedMember, setSelectedMember] = React.useState<OperationMember | null>(null);

  const operationMembers: OperationMember[] = [
    {
      id: '1',
      name: 'Operation Name 1',
      contact_no: '0123456789',
      department: 'ABC',
      total_tickets: 5,
      tickets_solved: 2,
      tickets_pending: 1,
      tickets_in_progress: 2,
      rating: 5,
    },
    {
      id: '2',
      name: 'Operation Name 2',
      contact_no: '0123456790',
      department: 'DEF',
      total_tickets: 8,
      tickets_solved: 5,
      tickets_pending: 2,
      tickets_in_progress: 1,
      rating: 4,
    },
    {
      id: '3',
      name: 'Operation Name 3',
      contact_no: '0123456791',
      department: 'GHI',
      total_tickets: 12,
      tickets_solved: 8,
      tickets_pending: 3,
      tickets_in_progress: 1,
      rating: 5,
    },
  ];

  React.useEffect(() => {
    // Set the first member as selected by default
    if (operationMembers.length > 0) {
      setSelectedMember(operationMembers[0]);
    }
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Performance Card */}
          <div className="lg:col-span-2">
            {selectedMember && (
              <div className="space-y-6">
                {/* Member Info */}
                <div className="flex items-start space-x-6">
                  <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                    <User size={64} className="text-gray-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedMember.name}</h3>
                    
                    <div className="bg-gray-200 rounded-lg p-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-700">Contact No:</span>
                        <span className="text-gray-600">{selectedMember.contact_no}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-700">Department:</span>
                        <span className="text-gray-600">{selectedMember.department}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="bg-gray-100 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Total Ticket Handle</span>
                      <span className="font-bold text-gray-900">{selectedMember.total_tickets}</span>
                    </div>
                    <div></div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket Solved</span>
                      <span className="text-gray-900">{selectedMember.tickets_solved}</span>
                    </div>
                    <div></div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket Pending</span>
                      <span className="text-gray-900">{selectedMember.tickets_pending}</span>
                    </div>
                    <div></div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket In progress</span>
                      <span className="text-gray-900">{selectedMember.tickets_in_progress}</span>
                    </div>
                    <div></div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                    <span className="font-medium text-gray-700">Rating</span>
                    <div className="flex space-x-1">
                      {renderStars(selectedMember.rating)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Team Members List */}
          <div className="space-y-4">
            {operationMembers.map((member) => (
              <div
                key={member.id}
                className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedMember?.id === member.id
                    ? 'bg-teal-50 border-2 border-teal-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-600" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{member.name}</h4>
                  <button className="bg-teal-400 hover:bg-teal-500 text-white text-sm px-3 py-1 rounded-lg transition-colors mt-1">
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;