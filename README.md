# AgriVerify

AgriVerify is a decentralized platform that uses blockchain technology to bring trust and transparency to organic farming. The system allows farmers to certify their organic produce and generate QR codes that consumers can scan for instant verification.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction
AgriVerify aims to enhance the trust and transparency in organic farming by enabling farmers to certify their produce on the blockchain. Consumers can scan a QR code to verify the authenticity of the product and learn more about its origin.

## Features
- **Farmer Registration**: Farmers can register themselves on the platform.
- **Crop Submission**: Registered farmers can submit their crops for certification.
- **Crop Certification**: The owner (admin) can certify the crops, changing their status from "Pending" to "Certified".
- **QR Code Generation**: Generates QR codes linking to the certification details of the crops.
- **ERC20 Token Integration**: Uses an ERC20 token called `AgriVerify Token (AGT)` for transactions.

## Technologies Used
- **Solidity**: For writing smart contracts.
- **JavaScript**: For frontend development.
- **React**: For building the user interface.
- **Hardhat**: For Ethereum development environment.
- **Ethers.js**: For interacting with the Ethereum blockchain.
- **MetaMask**: For Ethereum wallet integration.

## Installation

### Prerequisites
- Node.js and npm installed.
- MetaMask extension installed in your browser.

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Spkap/Task-ID-AgriVerify-GDG-x-Systems-.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd Task-ID-AgriVerify-GDG-x-Systems-
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Deploy the smart contract**:
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

5. **Run the frontend application**:
   ```bash
   npm start
   ```

Visit the application at `http://localhost:8080` or the deployment URL [AgriVerify](https://agriverify.vercel.app).

## Usage

### Connecting Wallet
1. Open the application.
2. Click on "Connect Wallet" to connect your MetaMask wallet.
3. Follow the MetaMask prompts to connect your account.

### Registering a Farmer
1. Navigate to the farmer registration section.
2. Enter the farmer's name and click on "Register".

### Submitting a Crop
1. Navigate to the crop submission section.
2. Enter the crop name and click on "Submit Crop".

### Certifying a Crop (Owner Only)
1. Navigate to the crop certification section.
2. Enter the crop ID and click on "Certify Crop".

### Generating QR Code
1. After certifying a crop, a QR code will be generated.
2. Scan the QR code to view the crop's certification details.

## Contributing

To contribute to the project, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Spkap/Task-ID-AgriVerify-GDG-x-Systems-/blob/main/LICENSE) file for details.

## Contact

For any questions or suggestions, please reach out to [Spkap](https://github.com/Spkap).
