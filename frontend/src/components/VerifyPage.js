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

  if (!cropDetails) return <div>Loading crop details...</div>;

  return (
    <div className="verify-page">
      <h1>Crop Verification</h1>
      <h2>Crop ID: {cropId}</h2>
      <p>Name: {cropDetails.name}</p>
      <p>Certification Status: {cropDetails.certificationStatus}</p>
      <p>Farmer Address: {cropDetails.farmer}</p>
      <Link to="/" className="back-button">
        Back to Home
      </Link>
    </div>
  );
};

export default VerifyPage;
