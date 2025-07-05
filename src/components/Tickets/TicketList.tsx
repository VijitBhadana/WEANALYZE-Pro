import React, { useState } from 'react';
import { Search, Eye, Edit, X, Star } from 'lucide-react';
import CloseTicketModal from './CloseTicketModal';
import TicketDetailsModal from './TicketDetailsModal';

interface Ticket {
  id: string;
  ticket_no: string;
  subject: string;
  status: 'In Progress' | 'On hold' | 'Closed';
  support_by: string;
  date: string;
  rate: number;
  description?: string;
  category?: string;
  type?: string;
  priority?: string;
  attachment?: string;
}

const TicketList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [tickets] = useState<Ticket[]>([
    {
      id: '1',
      ticket_no: '1234',
      subject: 'Login issue',
      status: 'In Progress',
      support_by: 'Tech support',
      date: '13/08/21',
      rate: 5,
      description: 'User cannot login to the system',
      category: 'Authentication',
      type: 'Bug',
      priority: 'High',
      attachment: 'screenshot.png'
    },
    {
      id: '2',
      ticket_no: '1124',
      subject: 'New ticket issue',
      status: 'On hold',
      support_by: 'Operation Team',
      date: '14/08/21',
      rate: 4,
      description: 'Issue with creating new tickets',
      category: 'Feature',
      type: 'Enhancement',
      priority: 'Medium'
    },
    {
      id: '3',
      ticket_no: '1224',
      subject: 'New request',
      status: 'Closed',
      support_by: 'Tech support',
      date: '13/08/21',
      rate: 3,
      description: 'Request for new feature',
      category: 'Feature Request',
      type: 'Enhancement',
      priority: 'Low'
    },
    {
      id: '4',
      ticket_no: '1244',
      subject: 'Ticket submission',
      status: 'In Progress',
      support_by: 'Operation Team',
      date: '14/08/21',
      rate: 5,
      description: 'Issue with ticket submission process',
      category: 'Process',
      type: 'Bug',
      priority: 'High'
    },
    {
      id: '5',
      ticket_no: '1114',
      subject: 'Login issue',
      status: 'In Progress',
      support_by: 'Tech support',
      date: '3/08/21',
      rate: 4,
      description: 'Another login related issue',
      category: 'Authentication',
      type: 'Bug',
      priority: 'Medium'
    },
  ]);

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticket_no.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-green-500 text-white';
      case 'On hold': return 'bg-gray-800 text-white';
      case 'Closed': return 'bg-gray-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true);
  };

  const handleCloseTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowCloseModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">List of Ticket</h2>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Find ticket"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4 flex items-center space-x-4">
          <span className="text-sm text-gray-600">Show:</span>
          <select 
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-gray-600">Entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Ticket No.</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Subject</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Status</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Support by</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Date</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Rate</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.slice(0, entriesPerPage).map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">
                    <button
                      onClick={() => handleViewTicket(ticket)}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {ticket.ticket_no}
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-3">{ticket.subject}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3">{ticket.support_by}</td>
                  <td className="border border-gray-300 px-4 py-3">{ticket.date}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="flex space-x-1">
                      {renderStars(ticket.rate)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing 1 to {Math.min(entriesPerPage, filteredTickets.length)} of {filteredTickets.length} entries
          </span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              ≪
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm bg-teal-500 text-white">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              ≫
            </button>
          </div>
        </div>
      </div>

      {showDetailsModal && selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedTicket(null);
          }}
          onCloseTicket={() => {
            setShowDetailsModal(false);
            handleCloseTicket(selectedTicket);
          }}
        />
      )}

      {showCloseModal && selectedTicket && (
        <CloseTicketModal
          ticket={selectedTicket}
          onClose={() => {
            setShowCloseModal(false);
            setSelectedTicket(null);
          }}
          onConfirm={() => {
            setShowCloseModal(false);
            setSelectedTicket(null);
          }}
        />
      )}
    </div>
  );
};

export default TicketList;