# AgriVerify

AgriVerify is a decentralized application (dApp) that brings trust and transparency to organic farming through blockchain technology. It allows farmers to certify their crops and generates QR codes for easy verification by consumers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Features

- Farmer onboarding with wallet authentication
- Crop submission and certification
- QR code generation for certified crops
- Verification page for consumers
- ERC20 token integration (AgriVerify Token - AGT)

## Technologies Used

- Solidity (v0.8.20) for smart contract development
- Hardhat for Ethereum development environment
- React.js for frontend development
- ethers.js for Ethereum interaction
- OpenZeppelin for secure smart contract components
- QRCode.react for QR code generation

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

1. Connect your wallet (e.g., MetaMask) to the application.
2. Register as a farmer using the onboarding form.
3. Submit crops for certification.
4. As the contract owner, certify submitted crops.
5. Generate QR codes for certified crops.
6. Use the verification page to scan QR codes and view crop certification details.

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


