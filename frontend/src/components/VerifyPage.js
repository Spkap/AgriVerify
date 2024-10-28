import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import AgriVerifyArtifact from '../artifacts/contracts/AgriVerify.sol/AgriVerify.json';
import contractAddress from '../artifacts/contracts/contract-address.json';

const VerifyPage = () => {
  const { cropId } = useParams();
  const [cropDetails, setCropDetails] = useState(null);
  const [farmerName, setFarmerName] = useState(null);
  const [agriVerifyContract, setAgriVerifyContract] = useState(null);

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        let contract = agriVerifyContract;
        if (!contract) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          contract = new ethers.Contract(
            contractAddress.AgriVerify,
            AgriVerifyArtifact.abi,
            provider,
          );
          setAgriVerifyContract(contract);
        }

        const details = await contract.getCrop(cropId);
        setCropDetails({
          name: details.name,
          certificationStatus: details.certificationStatus,
          farmer: details.farmer,
        });

        const farmerInfo = await contract.getFarmer(details.farmer);
        setFarmerName(farmerInfo.name);
      } catch (error) {
        console.error('Error fetching crop details:', error);
        setCropDetails(null);
      }
    };

    fetchCropDetails();
  }, [cropId, agriVerifyContract]);

  if (!cropDetails)
    return <div className="loading">Loading crop details...</div>;

  return (
    <div className="container">
      <h2>Crop Verification</h2>
      <div className="card crop-details">
        <p>
          <strong>Crop ID:</strong> {cropId}
        </p>
        <p>
          <strong>Crop Name:</strong> {cropDetails.name}
        </p>
        <p>
          <strong>Farmer Name:</strong> {farmerName || 'Loading...'}
        </p>
        <p>
          <strong>Certification Status:</strong>{' '}
          <span
            className={`status-badge ${
              cropDetails.certificationStatus === 'Certified'
                ? 'status-certified'
                : 'status-pending'
            }`}
          >
            {cropDetails.certificationStatus}
          </span>
        </p>
        <p>
          <strong>Farmer Address:</strong>{' '}
          <span className="font-mono text-sm">{cropDetails.farmer}</span>
        </p>
        <Link to="/" className="button back-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default VerifyPage;
