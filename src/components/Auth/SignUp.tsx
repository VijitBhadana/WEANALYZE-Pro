import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface SignUpProps {
  onToggleForm: () => void;
  onForgotPassword: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onToggleForm, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await signUp(username, email, password);
      setSuccess('Account created successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 italic mb-2">Helpdesk System</h1>
        <p className="text-gray-600">Sign up here</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:border-teal-500 focus:outline-none transition-colors"
            required
            disabled={loading}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:border-teal-500 focus:outline-none transition-colors"
            required
            disabled={loading}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:border-teal-500 focus:outline-none transition-colors"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="flex items-center justify-between mt-6 text-sm">
        <button
          onClick={onForgotPassword}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          Forgot password
        </button>
        <button
          onClick={onToggleForm}
          className="text-gray-800 hover:text-gray-600 transition-colors font-medium"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;