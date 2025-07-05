import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  real_name?: string;
  contact_number?: string;
  department?: string;
  access_level?: string;
  project_access_level?: string;
  avatar_url?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@helpdesk.com',
    password: 'admin123',
    real_name: 'Administrator',
    contact_number: '+1234567890',
    department: 'IT',
    access_level: 'admin',
    project_access_level: 'full',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'user1',
    email: 'user1@helpdesk.com',
    password: 'user123',
    real_name: 'John Doe',
    contact_number: '+1234567891',
    department: 'Operations',
    access_level: 'user',
    project_access_level: 'basic',
    created_at: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('helpdesk_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('helpdesk_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid username or password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('helpdesk_user', JSON.stringify(userWithoutPassword));
  };

  const signUp = async (username: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.username === username || u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      real_name: '',
      contact_number: '',
      department: '',
      access_level: 'user',
      project_access_level: 'basic',
      created_at: new Date().toISOString(),
    };

    // Add to mock users (in real app, this would be sent to server)
    mockUsers.push({ ...newUser, password });
    
    setUser(newUser);
    localStorage.setItem('helpdesk_user', JSON.stringify(newUser));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('helpdesk_user');
  };

  const resetPassword = async (email: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (!foundUser) {
      throw new Error('Email not found');
    }
    
    // In a real app, this would send a reset email
    console.log('Password reset email sent to:', email);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('helpdesk_user', JSON.stringify(updatedUser));

    // Update in mock users array
    const userIndex = mockUsers.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};