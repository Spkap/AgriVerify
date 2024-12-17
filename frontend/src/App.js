import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FarmerOnBoarding from './components/FarmerOnBoarding';
import CertificationForm from './components/CertificationForm';
import QRCodeDisplay from './components/QRCodeDisplay';
import VerifyPage from './components/VerifyPage';
import AgriVerifyArtifact from './artifacts/contracts/AgriVerify.sol/AgriVerify.json';
import contractAddress from './artifacts/contracts/contract-address.json';
import CertifyCrop from './components/CertifyCrop';

const App = () => {
  const [agriVerifyContract, setAgriVerifyContract] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState('');
  const [cropId, setCropId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const onRegisterFarmer = async (farmerName) => {
    try {
      const tx = await agriVerifyContract.registerFarmer(farmerName);
      await tx.wait();
      alert('Farmer registered successfully');
    } catch (error) {
      console.error('Error registering farmer:', error);
      alert('Farmer has already registered');
    }
  };

  const onSubmitCrop = async (cropName) => {
    try {
      const tx = await agriVerifyContract.submitCrop(cropName);
      await tx.wait();
      const cropCount = await agriVerifyContract.cropCount();
      setCropId(cropCount.toString());
      alert('Crop submitted successfully');
    } catch (error) {
      console.error('Error submitting crop:', error);
      alert('Failed to submit crop');
    }
  };

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
      <div className="min-h-screen">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-green-800 mb-12">
            AgriVerify
          </h1>
          <Routes>
            <Route
              path="/"
              element={
                connectedAccount ? (
                  <div className="grid-layout">
                    <div className="space-y-8">
                      <FarmerOnBoarding onRegisterFarmer={onRegisterFarmer} />
                      <CertificationForm onSubmitCrop={onSubmitCrop} />
                    </div>
                    <div className="space-y-8">
                      {cropId && (
                        <div className="card">
                          <h2 className="text-xl font-semibold text-green-800 mb-4">
                            Generated QR Code for Crop ID: {cropId}
                          </h2>
                          <QRCodeDisplay cropId={cropId} />
                        </div>
                      )}
                      {isOwner && (
                        <CertifyCrop agriVerifyContract={agriVerifyContract} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="card max-w-md mx-auto">
                    <button onClick={connectWallet} className="button">
                      Connect Wallet
                    </button>
                  </div>
                )
              }
            />
            <Route
              path="/verify/:cropId"
              element={<VerifyPage agriVerifyContract={agriVerifyContract} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
