import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';

interface Ticket {
  id: string;
  ticket_no: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assigned_to?: string;
  created_at: string;
}

interface CloseTicketModalProps {
  ticket: Ticket;
  onClose: () => void;
  onConfirm: () => void;
}

const CloseTicketModal: React.FC<CloseTicketModalProps> = ({ ticket, onClose, onConfirm }) => {
  const [ticketNo, setTicketNo] = useState(ticket.ticket_no);
  const [teamName, setTeamName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">My Ticket - Close Ticket</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X size={24} />
            </button>
          </div>

          <div className="bg-teal-400 rounded-xl p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Ticket No."
                    value={ticketNo}
                    onChange={(e) => setTicketNo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="row-span-2">
                  <textarea
                    placeholder="Remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="w-full h-full px-4 py-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Team Member"
                      value={teamMember}
                      onChange={(e) => setTeamMember(e.target.value)}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <RefreshCw size={16} />
                  <span>{loading ? 'Closing...' : 'Close Ticket'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseTicketModal;