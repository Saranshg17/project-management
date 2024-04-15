import React, { useState } from 'react';

const Dashboard = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/getall');
      const data = await response.json();
      console.log(data)
      setTasks(data); // Assuming data is an array of tasks fetched from the backend
    } catch (error) {
      alert(`This section failed to load with error:${error}`)
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/getproject'); // Assuming the backend endpoint is '/api/projects'
      const data = await response.json();
      setProjects(data); // Set the fetched projects in state
    } catch (error) {
      alert(`This section failed to load with error:${error}`)
      console.error('Error fetching projects:', error);
    }
  };

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'tasks') {
      fetchTasks(); // Fetch tasks when the 'Tasks' tab is activated
    }
    if(tab === 'projects') {
      fetchProjects();
    }
  };

  const ProjectCard = ({ projectName, projectId, projectDescription }) => (
    <div className="project-card">
      <h3>{projectName}</h3>
      <p>{projectId}</p>
      <p>{projectDescription}</p>
    </div>
  );


  return (
    <div>
      <h2>Dashboard</h2>
      <div className="tabs-container">
        <div
          className={activeTab === 'projects' ? 'tab-box active' : 'tab-box'}
          onClick={() => handleTabChange('projects')}
        >
          <h3>Projects</h3>
        </div>
        <div
          className={activeTab === 'tasks' ? 'tab-box active' : 'tab-box'}
          onClick={() => handleTabChange('tasks')}
        >
          <h3>Tasks</h3>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        {activeTab === 'projects' && (
          <div>
            {/* Projects section */}
            <h3>Projects Section (Only visible to Admin)</h3>
            {projects.map(project => (
              <ProjectCard
                key={project._id} // Assuming each project has a unique identifier like _id
                projectName={project.name}
                projectId={project.id}
                projectDescription={project.description}
              />
             ))}
          </div>
        )}
        {activeTab === 'tasks' && (
          <div>
            {/* Tasks section */}
            <h3>Tasks Section (Visible to Admin and Standard User)</h3>
            {/* Render list of tasks */}
            {tasks.map((task) => (
              <div key={task.id} className="task">
                <div className="task-header">
                  <h3>{task.Name}</h3>
                  <p>{task._id}</p>
                </div>
                <div className="task-body">
                  <p>{task.Description}</p>
                  <p>Project: {task.projectName}</p>
                  <p>Key: {task.key}</p>
                </div>
                <div className="task-footer">
                  <select>
                    <option value="started">Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <button>History</button>
                  <div className="action-buttons">
                    <button className="update-assignee">Update Assignee</button>
                    <button className="add-custom">Add Custom</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
