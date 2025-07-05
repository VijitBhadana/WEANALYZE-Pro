import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/Auth/AuthPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import TicketList from './components/Tickets/TicketList';
import TicketApproval from './components/Tickets/TicketApproval';
import NewTicket from './components/Tickets/NewTicket';
import Performance from './components/Performance/Performance';
import Database from './components/Database/Database';
import Settings from './components/Settings/Settings';
import UserLogHistory from './components/History/UserLogHistory';
import UserProfile from './components/Profile/UserProfile';
import EditProfile from './components/Profile/EditProfile';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showEditProfile, setShowEditProfile] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-300 via-cyan-300 to-blue-300 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderPage = () => {
    if (currentPage === 'profile') {
      return showEditProfile ? (
        <EditProfile onBack={() => setShowEditProfile(false)} />
      ) : (
        <UserProfile onEditProfile={() => setShowEditProfile(true)} />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'new-ticket':
        return <NewTicket />;
      case 'tickets':
        return <TicketList />;
      case 'ticket-approval':
        return <TicketApproval />;
      case 'performance':
        return <Performance />;
      case 'database':
        return <Database />;
      case 'user':
        return <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-2xl font-bold">User Management</h2><p>User management functionality coming soon...</p></div>;
      case 'settings':
        return <Settings />;
      case 'history':
        return <UserLogHistory />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;