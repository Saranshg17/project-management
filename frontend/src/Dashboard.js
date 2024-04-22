import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddTaskPopup from './AddTaskPopup';

const Dashboard = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  
  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    } else if (activeTab === 'tasks') {
      fetchTasks();
    }
  }, [activeTab]);

  const handleAddTask = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/task', formData, {
        headers: {
          "authorization": window.localStorage.getItem("accessToken")
        }
      });
      console.log('Task added successfully:', response.data);
      fetchTasks(); 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  const getHistory = async (TaskId) => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/history', {
        params: { "TaskId": TaskId },
        headers: {
          "authorization": window.localStorage.getItem("accessToken")
        }
      });
      console.log(response);
      alert(`${response.data.TaskUpdate}\nLast updated at: ${response.data.updatedAt}`);
    } catch (error) {
      console.error('Error getting history:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/getall', {
        headers: {
          "authorization": window.localStorage.getItem("accessToken")
        }
      });
      setTasks(response.data); 
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
      setProjects(response.data); 
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleStatusChange = (event, TaskId) => {
    const newStatus = event.target.value;
    const updatedTasks = tasks.map(task => {
      if (task._id === TaskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
    updateTaskStatus(TaskId, newStatus);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.put('http://localhost:8000/api/v1/users/update', 
        { taskId, StatusChange: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }}
      );
      console.log('Task status updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // alert(window.localStorage.getItem("accessToken"))
      const accessToken = window.localStorage.getItem("accessToken");
      const response = await axios.post('http://localhost:8000/api/v1/users/logout',{} ,{
        headers: {
          "authorization": `Bearer ${accessToken}`
        }
      });
      console.log('User logged out successfully');
      window.localStorage.removeItem("accessToken");
      window.location.href = '/login';
    } catch (error) {
      alert(error)
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="dashboard">
      {/* <Sidebar setActiveTab={setActiveTab} logout={handleLogout} /> */}
      <div className="main-content">
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
          <button onClick={()=> handleLogout()}>Logout</button>
        </div>
        <div style={{ marginTop: '20px' }}>
          {activeTab === 'projects' && (
            <div>
              {projects.map(project => (
                <div key={project.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                  <h3>{project.Name}</h3>
                  <p>Id: {project._id}</p>
                  <p>Description: {project.Description}</p>
                  <button style={{ marginRight: '10px' }} onClick={() => setShowAddTaskPopup(true)}>Add Task</button>
                </div>
              ))}
              {showAddTaskPopup && (
                <AddTaskPopup
                  onClose={() => setShowAddTaskPopup(false)}
                  onSubmit={handleAddTask}
                />
              )}
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
                  {/* <p>Key: {task.key}</p> */}
                  <select value={task.Status} onChange={(event) => handleStatusChange(event, task._id)}>
                    <option value="Started">Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  <button style={{ marginRight: '10px' }} onClick={() => getHistory(task._id)}>History</button>
                  <button style={{ marginRight: '10px' }}>Update Assignee</button>
                  {/* <button>Add Custom</button> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

