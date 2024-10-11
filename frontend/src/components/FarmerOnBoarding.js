import React, { useState } from 'react';

const FarmerOnBoarding = ({ agriVerifyContract, onRegisterFarmer }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onRegisterFarmer) {
      console.log('Submitting farmer registration:', name);
      await onRegisterFarmer(name);
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
        <button type="submit">Register Farmer</button>
      </form>
    </div>
  );
};

export default FarmerOnBoarding;
