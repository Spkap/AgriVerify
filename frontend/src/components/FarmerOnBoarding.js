import React, { useState } from 'react';

const FarmerOnBoarding = ({ onRegisterFarmer, connectedAccount }) => {
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!connectedAccount) {
      alert('Please connect your wallet first.');
      return;
    }
    if (!name.trim()) {
      alert('Please enter a valid farmer name.');
      return;
    }
    setIsRegistering(true);
    try {
      console.log('Submitting farmer registration:', name);
      await onRegisterFarmer(name);
      setName('');
      alert('Farmer registered successfully!');
    } catch (error) {
      console.error('Error registering farmer:', error);
      alert(`Failed to register farmer: ${error.message}`);
    } finally {
      setIsRegistering(false);
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
        />
        <button type="submit" disabled={isRegistering || !connectedAccount}>
          {isRegistering ? 'Registering...' : 'Register Farmer'}
        </button>
      </form>
      {!connectedAccount && (
        <p className="warning">Please connect your wallet to register.</p>
      )}
    </div>
  );
};

export default FarmerOnBoarding;
