import React, { useState } from 'react';

const CertificationForm = ({ onSubmitCrop }) => {
  const [cropName, setCropName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmitCrop) {
      await onSubmitCrop(cropName);
      setCropName('');
    }
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
        />
        <button type="submit">Submit Crop</button>
      </form>
    </div>
  );
};

export default CertificationForm;
