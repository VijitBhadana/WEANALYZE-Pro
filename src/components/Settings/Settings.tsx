import React from 'react';
import { Settings as SettingsIcon, Mail, Bell, Shield, Palette } from 'lucide-react';

const Settings: React.FC = () => {
  const settingsGroups = [
    {
      title: 'General',
      icon: SettingsIcon,
      items: [
        { name: 'Language', value: 'English' },
        { name: 'Timezone', value: 'UTC+0' },
        { name: 'Date Format', value: 'DD/MM/YYYY' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { name: 'Email Notifications', value: 'Enabled' },
        { name: 'Push Notifications', value: 'Enabled' },
        { name: 'SMS Notifications', value: 'Disabled' },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { name: 'Two-Factor Authentication', value: 'Disabled' },
        { name: 'Session Timeout', value: '30 minutes' },
        { name: 'Password Policy', value: 'Strong' },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { name: 'Theme', value: 'Light' },
        { name: 'Color Scheme', value: 'Teal' },
        { name: 'Font Size', value: 'Medium' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {settingsGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon className="h-6 w-6 text-teal-600" />
                  <h3 className="text-lg font-semibold text-gray-800">{group.title}</h3>
                </div>
                <div className="space-y-3">
                  {group.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="text-sm font-medium text-gray-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Settings;