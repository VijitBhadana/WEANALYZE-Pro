import React from 'react';
import { X } from 'lucide-react';

interface Ticket {
  id: string;
  ticket_no: string;
  subject: string;
  status: string;
  support_by: string;
  date: string;
  rate: number;
  description?: string;
  category?: string;
  type?: string;
  priority?: string;
  attachment?: string;
}

interface TicketDetailsModalProps {
  ticket: Ticket;
  onClose: () => void;
  onCloseTicket: () => void;
}

const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({ ticket, onClose, onCloseTicket }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Ticket Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket No:</label>
                <p className="text-gray-900">{ticket.ticket_no}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                <p className="text-gray-900">{ticket.date}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                <p className="text-gray-900">{ticket.support_by}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dept:</label>
                <p className="text-gray-900">IT Department</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
              <p className="text-gray-900">{ticket.subject}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
              <p className="text-gray-900">{ticket.description || 'No description provided'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                <p className="text-gray-900">{ticket.category || 'General'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type:</label>
                <p className="text-gray-900">{ticket.type || 'Support'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority:</label>
                <p className="text-gray-900">{ticket.priority || 'Medium'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
                <p className="text-gray-900">{ticket.status}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attachment:</label>
              <p className="text-gray-900">{ticket.attachment || 'No attachment'}</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Update
            </button>
            <button
              onClick={onCloseTicket}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;