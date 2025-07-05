import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Edit3, Star } from 'lucide-react';

interface UserProfileProps {
  onEditProfile: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onEditProfile }) => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFeedback('');
    setRating(0);
    setSubmitting(false);
    alert('Feedback submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={48} className="text-gray-600" />
                </div>
                <button 
                  onClick={onEditProfile}
                  className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <Edit3 size={20} className="text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-semibold text-gray-800">Username</span>
                  <p className="text-gray-600">{user?.username}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">Contact Number</span>
                  <p className="text-gray-600">{user?.contact_number || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">Email</span>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">Department</span>
                  <p className="text-gray-600">{user?.department || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Give Your Feedback</h3>
              
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Lorem Ipsum"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition-colors resize-none"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5, 6].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`transition-colors ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;