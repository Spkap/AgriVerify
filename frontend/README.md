# AgriVerify Frontend

This is the frontend application for AgriVerify, a decentralized application (dApp) that brings trust and transparency to organic farming through blockchain technology.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Components](#components)

## Features

- Connect to Ethereum wallet (MetaMask)
- Farmer registration
- Crop submission
- QR code generation for certified crops
- Crop verification
- Owner-only crop certification

## Technologies Used

- React.js
- ethers.js
- React Router
- node-qrcode


## Project Structure

The main components of the frontend are:

- `App.js`: Main application component
- `components/`:
  - `FarmerOnBoarding.js`: Farmer registration form
  - `CertificationForm.js`: Crop submission form
  - `QRCodeDisplay.js`: QR code generation for crops
  - `VerifyPage.js`: Crop verification page
  - `CertifyCrop.js`: Owner-only crop certification form

## Usage

1. Connect your Ethereum wallet (e.g., MetaMask) to the application.
2. Register as a farmer using the Farmer Onboarding form.
3. Submit crops for certification using the Certification Form.
4. If you're the contract owner, you can certify crops using the Certify Crop form.
5. Generate QR codes for certified crops.
6. Use the Verify Page to scan QR codes and view crop certification details.

The entire application is deployed and can be accessed at [https://agriverify.vercel.app/](https://agriverify.vercel.app/)

## Components

### App.js

The main application component that handles routing and wallet connection.

### FarmerOnBoarding.js

Component for registering new farmers.

### CertificationForm.js

This component allows farmers to submit crops for certification.

### QRCodeDisplay.js

Generates QR codes for certified crops.

### VerifyPage.js

Displays crop verification details.

### CertifyCrop.js

Allows the contract owner to certify submitted crops.
