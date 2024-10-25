# AgriVerify

AgriVerify is a decentralized application (dApp) that brings trust and transparency to organic farming through blockchain technology. It allows farmers to certify their crops and generates QR codes for easy verification by consumers.

**Deployed Application: [https://agriverify.vercel.app/](https://agriverify.vercel.app/)**

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo Video](#demo-video)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Note](#note)
- [Smart Contract](#smart-contract)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)
- [Future Improvements](#future-improvements)
- [Contact](#contact)

## Introduction

AgriVerify aims to enhance trust and transparency in organic farming by enabling farmers to certify their produce on the blockchain. Consumers can scan a QR code to verify the authenticity of the product and learn more about its origin.

## Features

- Farmer onboarding with wallet authentication
- Crop submission and certification
- QR code generation for certified crops
- Verification page for consumers
- ERC20 token integration (AgriVerify Token - AGT)

## Demo Video

Check out the demo video to see AgriVerify in action:

[AgriVerify Demo Video](https://drive.google.com/file/d/17Cr-LZUm7JCrtxDwX89pZ2UzlVGzDC7H/view?usp=sharing)

## Technologies Used

- Solidity (v0.8.20) for smart contract development
- Hardhat for Ethereum development environment
- React.js for frontend development
- ethers.js for Ethereum interaction
- OpenZeppelin for secure smart contract components
- node-qrcode for QR code generation
- MetaMask for Ethereum wallet integration

## Project Structure

AgriVerify/
├── contracts/
│ └── AgriVerify.sol
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ ├── App.js
│ └── index.js
├── scripts/
│ └── deploy.js
├── test/
├── .gitignore
├── hardhat.config.js
└── README.md

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/AgriVerify.git
   cd AgriVerify
   ```

2. Install dependencies:

   ```
   npm install
   cd frontend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your configuration:

   ```
   PRIVATE_KEY=your_private_key
   RPC_URL=your_rpc_url
   ```

4. Compile and deploy the smart contract:

   ```
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network your_network
   ```

5. Update the contract address in the frontend:
   After deployment, update the `contractAddress` in `frontend/src/App.js` with the deployed contract address.

6. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

## Usage

1. Visit the deployed application at [https://agriverify.vercel.app/](https://agriverify.vercel.app/)
2. Connect your wallet (e.g., MetaMask) to the application.
3. Register as a farmer using the onboarding form.
4. Submit crops for certification.
5. As the contract owner, certify submitted crops.
6. Generate QR codes for certified crops.
7. Use the verification page to scan QR codes and view crop certification details.

## Note:

Given this implementation:

- You can register as many unique farmers as there are Ethereum addresses.
- Each unique Ethereum address can only register once as a farmer.
- One registered farmer can register as many crops as he wants.

## Smart Contract

The `AgriVerify.sol` contract includes the following main functions:

- `registerFarmer(string memory _name)`: Register a new farmer.
- `submitCrop(string memory _name)`: Submit a crop for certification.
- `certifyCrop(uint256 _cropId)`: Certify a submitted crop (owner only).
- `getFarmer(address _farmer)`: Get farmer details.
- `getCrop(uint256 _cropId)`: Get crop details.

The contract also implements an ERC20 token (AGT) for potential future use in the ecosystem.

## Frontend

The React frontend provides an intuitive interface for interacting with the AgriVerify smart contract. Key components include:

- Farmer onboarding form
- Crop submission form
- QR code generation for certified crops
- Verification page for consumers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Future Improvements

- Auto-approval system
- Adding more details about farmer and crop, such as farm location, registration date, etc.
- Implementing farmer ratings or reputation system
- Implementing a token reward system:
  - We could reward farmers with tokens for successful certifications

## Contact

For any questions or suggestions, please reach out to [Spkap](https://github.com/Spkap).
