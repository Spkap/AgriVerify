import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const VerifyPage = ({ agriVerifyContract }) => {
  const { cropId } = useParams();
  const [cropDetails, setCropDetails] = useState(null);
  const [farmerName, setFarmerName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        if (!agriVerifyContract) {
          throw new Error("Contract not initialized");
        }

        const details = await agriVerifyContract.getCrop(cropId);
        console.log('Crop details:', details);
        setCropDetails({
          name: details.name,
          certificationStatus: details.certificationStatus,
          farmer: details.farmer,
        });

        // Fetch farmer details for the corresponding crop
        const farmerInfo = await agriVerifyContract.getFarmer(details.farmer);
        console.log('Farmer info:', farmerInfo);
        setFarmerName(farmerInfo.name);
      } catch (error) {
        console.error('Error fetching crop details:', error);
        setError(error.message);
        setCropDetails(null);
        setFarmerName(null);
      }
    };

    if (agriVerifyContract) {
      fetchCropDetails();
    }
  }, [cropId, agriVerifyContract]);

  if (error) return <div className="error">Error: {error}</div>;
  if (!cropDetails) return <div className="loading">Loading crop details...</div>;

  return (
    <div className="container">
      <h2>Crop Verification</h2>
      <div className="card">
        <p><strong>Crop ID:</strong> {cropId}</p>
        <p><strong>Crop Name:</strong> {cropDetails.name}</p>
        <p><strong>Farmer Name:</strong> {farmerName || 'Unknown'}</p>
        <p>
          <strong>Certification Status:</strong>{' '}
          {cropDetails.certificationStatus}
        </p>
        <p><strong>Farmer Address:</strong> {cropDetails.farmer}</p>
        <Link to="/" className="button back-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default VerifyPage;
