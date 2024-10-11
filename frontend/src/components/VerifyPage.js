import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import AgriVerifyArtifact from '../artifacts/contracts/AgriVerify.sol/AgriVerify.json';
import contractAddress from '../artifacts/contracts/contract-address.json';

const VerifyPage = () => {
  const { cropId } = useParams();
  const [cropDetails, setCropDetails] = useState(null);

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          contractAddress.AgriVerify,
          AgriVerifyArtifact.abi,
          provider,
        );

        const details = await contract.getCrop(cropId);
        setCropDetails({
          name: details.name,
          certificationStatus: details.certificationStatus,
          farmer: details.farmer,
        });
      } catch (error) {
        console.error('Error fetching crop details:', error);
        setCropDetails(null);
      }
    };

    fetchCropDetails();
  }, [cropId]);

  if (!cropDetails)
    return <div className="loading">Loading crop details...</div>;

  return (
    <div className="container">
      <h1>Crop Verification</h1>
      <div className="card">
        <h2>Crop ID: {cropId}</h2>
        <div className="crop-details">
          <p>
            <strong>Name:</strong> {cropDetails.name}
          </p>
          <p>
            <strong>Certification Status:</strong>{' '}
            {cropDetails.certificationStatus}
          </p>
          <p>
            <strong>Farmer Address:</strong> {cropDetails.farmer}
          </p>
        </div>
        <Link to="/" className="button back-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default VerifyPage;
