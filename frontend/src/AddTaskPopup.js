import React, { useState } from 'react';

const AddTaskPopup = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    Assignee_id: '',
    Project: '',
    custom: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
          <label>Assignee ID:</label>
          <input type="text" name="Assignee_id" value={formData.Assignee_id} onChange={handleChange} required />
          <label>Project:</label>
          <input type="text" name="Project" value={formData.Project} onChange={handleChange} required />
          <label>Custom:</label>
          <input type="text" name="custom" value={formData.custom} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;
