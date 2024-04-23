import React, { useState } from 'react';

const UpdateAssignee = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    AssigneeChange:'',
    Comment:'',
    taskId:''
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
        <h2>Update Assignee</h2>
        <form onSubmit={handleSubmit}>
          <label>Assignee id:</label>
          <input type="text" name="AssigneeChange" value={formData.name} onChange={handleChange} required />
          <label>Task id:</label>
          <input type="text" name="taskId" value={formData.name} onChange={handleChange} required />
          <label>Comment</label>
          <input type="text" name="Comment" value={formData.description} onChange={handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssignee;
