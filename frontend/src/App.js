import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FarmerOnBoarding from './components/FarmerOnBoarding';
import CertificationForm from './components/CertificationForm';
import QRCodeDisplay from './components/QRCodeDisplay';
import VerifyPage from './components/VerifyPage';
import AgriVerifyArtifact from './artifacts/contracts/AgriVerify.sol/AgriVerify.json';
import contractAddress from './artifacts/contracts/contract-address.json';

const App = () => {
  const [agriVerifyContract, setAgriVerifyContract] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState('');
  const [cropId, setCropId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [certifyCropId, setCertifyCropId] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setConnectedAccount(accounts[0]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress.AgriVerify,
          AgriVerifyArtifact.abi,
          signer,
        );
        setAgriVerifyContract(contract);
        checkOwner(contract, accounts[0]);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this app.');
    }
  };

  const checkOwner = async (contract, account) => {
    try {
      const owner = await contract.owner();
      setIsOwner(owner.toLowerCase() === account.toLowerCase());
    } catch (error) {
      console.error('Error checking owner:', error);
    }
  };

  const onRegisterFarmer = async (name) => {
    if (agriVerifyContract) {
      try {
        const tx = await agriVerifyContract.registerFarmer(name);
        await tx.wait();
      } catch (error) {
        console.error('Error registering farmer:', error);
      }
    }
  };

  const onSubmitCrop = async (cropName) => {
    if (agriVerifyContract) {
      try {
        const tx = await agriVerifyContract.submitCrop(cropName);
        await tx.wait();
        const newCropId = await agriVerifyContract.cropCount();
        setCropId(newCropId.toString());
        alert(`Crop submitted successfully! Crop ID: ${newCropId}`);
      } catch (error) {
        console.error('Error submitting crop:', error);
        alert('Failed to submit crop. Please try again.');
      }
    }
  };

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

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setConnectedAccount(accounts[0]);
          connectWallet();
        }
      });
    }
  }, []);

  return (
    <Router>
      <div className="container">
        <h1>AgriVerify</h1>
        <Routes>
          <Route
            path="/"
            element={
              connectedAccount ? (
                <>
                  <div className="card">
                    <FarmerOnBoarding onRegisterFarmer={onRegisterFarmer} />
                  </div>
                  <div className="card">
                    <CertificationForm onSubmitCrop={onSubmitCrop} />
                  </div>
                  {cropId && (
                    <div className="card">
                      <h2>Generated QR Code for Crop ID: {cropId}</h2>
                      <QRCodeDisplay cropId={cropId} />
                    </div>
                  )}
                  {isOwner && (
                    <div className="card">
                      <h2>Certify Crop (Owner Only)</h2>
                      <input
                        type="number"
                        value={certifyCropId}
                        onChange={(e) => setCertifyCropId(e.target.value)}
                        placeholder="Enter Crop ID to Certify"
                      />
                      <button onClick={onCertifyCrop}>Certify Crop</button>
                    </div>
                  )}
                </>
              ) : (
                <div className="card">
                  <button onClick={connectWallet}>Connect Wallet</button>
                </div>
              )
            }
          />
          <Route path="/verify/:cropId" element={<VerifyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
