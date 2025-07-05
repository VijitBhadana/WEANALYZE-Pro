import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

type AuthMode = 'signin' | 'signup' | 'forgot';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('signin');

  const renderAuthComponent = () => {
    switch (mode) {
      case 'signin':
        return (
          <SignIn
            onToggleForm={() => setMode('signup')}
            onForgotPassword={() => setMode('forgot')}
          />
        );
      case 'signup':
        return (
          <SignUp
            onToggleForm={() => setMode('signin')}
            onForgotPassword={() => setMode('forgot')}
          />
        );
      case 'forgot':
        return (
          <ForgotPassword
            onBack={() => setMode('signin')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-cyan-300 to-blue-300 flex items-center justify-center p-4">
      {renderAuthComponent()}
    </div>
  );
};

export default AuthPage;