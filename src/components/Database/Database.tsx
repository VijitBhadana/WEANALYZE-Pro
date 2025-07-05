import React, { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';

interface TeamMember {
  id: string;
  staff_id: string;
  name: string;
  department: string;
  speciality: string;
}

const Database: React.FC = () => {
  const [activeTab, setActiveTab] = useState('User');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      staff_id: 'ABC123',
      name: 'Abu',
      department: 'IT',
      speciality: 'Software'
    },
    {
      id: '2',
      staff_id: 'ABC124',
      name: 'Ahmad',
      department: 'Software',
      speciality: 'Networking'
    },
    {
      id: '3',
      staff_id: 'ABC125',
      name: 'Ali',
      department: 'Technical',
      speciality: 'Hardware'
    }
  ]);

  const tabs = ['User', 'Operation Team', 'Technical Support'];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.staff_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Database</h2>
        
        {/* Tabs */}
        <div className="flex mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-teal-400 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } ${tab === tabs[0] ? 'rounded-l-lg' : ''} ${
                tab === tabs[tabs.length - 1] ? 'rounded-r-lg' : ''
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Staff ID</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Name</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Department</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Speciality</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Setting</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.slice(0, entriesPerPage).map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">{member.staff_id}</td>
                  <td className="border border-gray-300 px-4 py-3">{member.name}</td>
                  <td className="border border-gray-300 px-4 py-3">{member.department}</td>
                  <td className="border border-gray-300 px-4 py-3">{member.speciality}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing 1 to {Math.min(entriesPerPage, filteredMembers.length)} of {filteredMembers.length} entries
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

export default Database;