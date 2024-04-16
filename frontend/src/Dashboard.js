import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Dashboard = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    } else if (activeTab === 'tasks') {
      fetchTasks();
    }
  }, [activeTab]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/getall', {
        headers: {
          "authorization": window.localStorage.getItem("accessToken")
        }
      });
      const data = response.data;
      setTasks(data); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/getproject', {
        headers: {
          "authorization": window.localStorage.getItem("accessToken")
        }
      });
      const data = response.data;
      setProjects(data); 
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {/* <ul class="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm" id="pillNav2" role="tablist" style="--bs-nav-link-color: var(--bs-white); --bs-nav-pills-link-active-color: var(--bs-primary); --bs-nav-pills-link-active-bg: var(--bs-white);">
        <li class="nav-item" role="presentation">
        <button class="nav-link active rounded-5" id="tasks-tab2" data-bs-toggle="tab" type="button" role="tab" aria-selected="true">Tasks</button>
        </li>
        <li class="nav-item" role="presentation">
        <button class="nav-link rounded-5" id="projects-tab2" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">Projects</button>
        </li>
      </ul> */}
      <div className="tabs-container">
        <div
          className={activeTab === 'projects' ? 'tab-box active' : 'tab-box'}
          onClick={() => setActiveTab('projects')}
        >
          <h3>Projects</h3>
        </div>
        <div
          className={activeTab === 'tasks' ? 'tab-box active' : 'tab-box'}
          onClick={() => setActiveTab('tasks')}
        >
          <h3>Tasks</h3>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        {activeTab === 'projects' && (
          <div>
            {projects.map(project => (
              <div key={project.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                <h3>{project.Name}</h3>
                <p>Id: {project._id}</p>
                <p>Description: {project.Description}</p>
              <button style={{ marginRight: '10px' }}>Add Task</button>
            </div>
             ))}
          </div>
        )}
        {activeTab === 'tasks' && (
          <div>
            {tasks.map(task => (
              <div key={task.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                <h3>{task.Name}</h3>
                <p>Id: {task._id}</p>
                <p>Description: {task.Description}</p>
                <p>Project: {task.Project}</p>
                <p>Key: {task.key}</p>
                <select style={{ marginRight: '10px' }}>
                  <option value="started">Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <button style={{ marginRight: '10px' }}>History</button>
                <button style={{ marginRight: '10px' }}>Update Assignee</button>
                <button>Add Custom</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
