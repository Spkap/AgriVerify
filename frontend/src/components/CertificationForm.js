import React, { useState } from 'react';

const CertificationForm = ({ onSubmitCrop }) => {
  const [cropName, setCropName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitCrop(cropName);
    setCropName('');
  };

  return (
    <div className="card">
      <h2>Submit Crop</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          placeholder="Enter Crop Name"
          required
          className="input"
        />
        <button type="submit" className="button">
          Submit Crop
        </button>
      </form>
    </div>
  );
};

export default CertificationForm;
