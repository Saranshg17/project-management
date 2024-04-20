import React, { useState } from 'react';

const AddCustomPopup = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    key: '',
    value: ''
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
        <h2>Add Custom</h2>
        <form onSubmit={handleSubmit}>
          <label>Key:</label>
          <input type="text" name="key" value={formData.key} onChange={handleChange} required />
          <label>Value:</label>
          <input type="text" name="value" value={formData.value} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;
