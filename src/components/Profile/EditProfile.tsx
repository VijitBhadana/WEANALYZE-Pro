import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface EditProfileProps {
  onBack: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onBack }) => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    current_password: '',
    new_password: '',
    confirm_password: '',
    email: user?.email || '',
    real_name: user?.real_name || '',
    access_level: user?.access_level || '',
    project_access_level: user?.project_access_level || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await updateProfile({
        username: formData.username,
        email: formData.email,
        real_name: formData.real_name,
        access_level: formData.access_level,
        project_access_level: formData.project_access_level,
      });
      
      alert('Profile updated successfully!');
      onBack();
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
        </div>

        <div className="bg-teal-400 text-white px-4 py-2 rounded-lg mb-6">
          <h3 className="font-semibold">Edit Account</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-48 bg-gray-600 text-white px-4 py-3 text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-teal-500 focus:outline-none"
                required
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-48 bg-gray-600 text-white px-4 py-3 text-sm font-medium">Current Password</label>
              <input
                type="password"
                name="current_password"
                value={formData.current_password}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-teal-500 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-48 bg-gray-600 text-white px-4 py-3 text-sm font-medium">New Password</label>
              <input
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-teal-500 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-48 bg-gray-600 text-white px-4 py-3 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-teal-500 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-48 bg-gray-600 text-white px-4 py-3 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-teal-500 focus:outline-none"
                required
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-48 bg-gray-600 text-white px-4 py-3 text-sm font-medium">Real Name</label>
              <input
                type="text"
                name="real_name"
                value={formData.real_name}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-teal-500 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-48 bg-gray-600 text-white px-4 py-3 text-sm font-medium">Access Level</label>
              <input
                type="text"
                name="access_level"
                value={formData.access_level}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-teal-500 focus:outline-none bg-gray-100"
                readOnly
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-48 bg-gray-600 text-white px-4 py-3 text-sm font-medium">Project Access Level</label>
              <input
                type="text"
                name="project_access_level"
                value={formData.project_access_level}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-teal-500 focus:outline-none bg-gray-100"
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-start pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;