import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';

const NewTicket: React.FC = () => {
  const [formData, setFormData] = useState({
    ticket_no: '',
    name: '',
    date: '',
    department: '',
    subject: '',
    category: '',
    type: '',
    priority: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket submitted:', formData);
    alert('Ticket submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Ticket</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ticket No.</label>
              <input
                type="text"
                name="ticket_no"
                value={formData.ticket_no}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                placeholder="Auto-generated"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category:</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type:</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority:</label>
                <input
                  type="text"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description:</label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
                  placeholder="Describe your issue..."
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors"
                >
                  <Paperclip size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="captcha"
                className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="captcha" className="text-sm text-gray-700">
                I'm not a robot
              </label>
            </div>
            
            <div className="text-xs text-gray-500">
              reCAPTCHA<br />
              Privacy - Terms
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTicket;