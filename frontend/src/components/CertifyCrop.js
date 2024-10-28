import React, { useState } from 'react';

const CertifyCrop = ({ agriVerifyContract }) => {
  const [certifyCropId, setCertifyCropId] = useState('');

  const onCertifyCrop = async () => {
    if (agriVerifyContract && certifyCropId) {
      try {
        const tx = await agriVerifyContract.certifyCrop(certifyCropId);
        await tx.wait();
        alert(`Crop ${certifyCropId} certified successfully`);
        setCertifyCropId('');
      } catch (error) {
        console.error('Error certifying crop:', error);
        alert('Failed to certify crop. Please try again.');
      }
    }
  };

  return (
    <div className="card">
      <h2>Certify Crop (Owner Only)</h2>
      <div className="form-group">
        <input
          type="number"
          value={certifyCropId}
          onChange={(e) => setCertifyCropId(e.target.value)}
          placeholder="Enter Crop ID to Certify"
          min="1"
          required
        />
        <button onClick={onCertifyCrop}>Certify Crop</button>
      </div>
    </div>
  );
};

export default CertifyCrop;
