import React, { useState } from 'react';

const FarmerOnBoarding = ({ onRegisterFarmer }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onRegisterFarmer) {
      await onRegisterFarmer(name);
      setName('');
    }
  };

  return (
    <div className="card">
      <h2>Farmer Onboarding</h2>
      <form onSubmit={handleSubmit} className="form-group space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Farmer Name"
          required
          className="input"
        />
        <button type="submit" className="button">
          Register Farmer
        </button>
      </form>
    </div>
  );
};

export default FarmerOnBoarding;
