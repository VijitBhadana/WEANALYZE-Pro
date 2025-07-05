import React, { useState } from 'react';
import { Search, Check, X, ChevronDown } from 'lucide-react';

interface TicketApproval {
  id: string;
  ticket_no: string;
  subject: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  assigned_to?: string;
}

const TicketApproval: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [tickets] = useState<TicketApproval[]>([
    {
      id: '1',
      ticket_no: '1234',
      subject: 'Login issue',
      category: 'Access issue',
      priority: 'High',
      date: '13/08/21',
    },
    {
      id: '2',
      ticket_no: '1124',
      subject: 'New ticket issue',
      category: 'Access issue',
      priority: 'Medium',
      date: '14/08/21',
    },
    {
      id: '3',
      ticket_no: '1224',
      subject: 'New request',
      category: 'Feedback',
      priority: 'Low',
      date: '13/08/21',
    },
    {
      id: '4',
      ticket_no: '1244',
      subject: 'Ticket submission',
      category: 'Ticketing',
      priority: 'High',
      date: '14/08/21',
    },
    {
      id: '5',
      ticket_no: '1114',
      subject: 'Login issue',
      category: 'Access issue',
      priority: 'High',
      date: '3/08/21',
    },
  ]);

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticket_no.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 font-semibold';
      case 'Medium': return 'text-yellow-600 font-semibold';
      case 'Low': return 'text-green-600 font-semibold';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ticket Approval</h2>
        
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
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Category</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Priority</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Date</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Action</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Assign to</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.slice(0, entriesPerPage).map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">{ticket.ticket_no}</td>
                  <td className="border border-gray-300 px-4 py-3">{ticket.subject}</td>
                  <td className="border border-gray-300 px-4 py-3">{ticket.category}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <span className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3">{ticket.date}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <Check size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="relative">
                      <select className="appearance-none bg-gray-200 border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:border-teal-500">
                        <option value="">Select...</option>
                        <option value="tech">Tech Support</option>
                        <option value="ops">Operations</option>
                        <option value="admin">Admin</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
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
    </div>
  );
};

export default TicketApproval;