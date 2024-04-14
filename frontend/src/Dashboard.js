// Dashboard.js
import React, { useState } from 'react';

const Dashboard = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('projects');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <button onClick={() => handleTabChange('projects')}>Projects</button>
        <button onClick={() => handleTabChange('tasks')}>Tasks</button>
      </div>
      <div>
        {userRole === 'admin' && activeTab === 'projects' && (
          <div>
            {/* Projects section */}
            <h3>Projects Section (Only visible to Admin)</h3>
            {/* Display projects here */}
          </div>
        )}
        {activeTab === 'tasks' && (
          <div>
            {/* Tasks section */}
            <h3>Tasks Section (Visible to Admin and Standard User)</h3>
            {/* Display tasks here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
