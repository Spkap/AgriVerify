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
    <div>
      <h2>Submit Crop</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          placeholder="Enter Crop Name"
        />
        <button type="submit">Submit Crop</button>
      </form>
    </div>
  );
};

export default CertificationForm;
