import React, { useState } from 'react';

const FarmerOnBoarding = ({ agriVerifyContract }) => {
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agriVerifyContract) {
      try {
        setIsRegistering(true);
        console.log('Submitting farmer registration:', name);
        const tx = await agriVerifyContract.registerFarmer(name);
        await tx.wait();
        alert(`Farmer ${name} registered successfully!`);
        setName('');
      } catch (error) {
        console.error('Error registering farmer:', error);
        alert(`Failed to register farmer: ${error.message}`);
      } finally {
        setIsRegistering(false);
      }
    } else {
      alert('Contract not initialized. Please connect your wallet first.');
    }
  };

  return (
    <div className="card">
      <h2>Farmer Onboarding</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Farmer Name"
          required
        />
        <button type="submit" disabled={isRegistering}>
          {isRegistering ? 'Registering...' : 'Register Farmer'}
        </button>
      </form>
    </div>
  );
};

export default FarmerOnBoarding;
