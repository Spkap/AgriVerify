// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AgriVerify is ERC20 {
    struct Crop {
        string name;
        string certificationStatus; // "Pending", "Certified"
        address farmer;
    }

    struct Farmer {
        string name;
        bool isRegistered;
        bool isCertified;
    }

    address public owner;
    uint256 public cropCount;
    mapping(uint256 => Crop) public crops;
    mapping(address => Farmer) public farmers;

    event FarmerRegistered(address indexed farmerAddress, string name);
    event CropSubmitted(
        uint256 indexed cropId,
        string cropName,
        address indexed farmer
    );
    event CropCertified(uint256 indexed cropId, address indexed certifier);

    constructor(uint256 initialSupply) ERC20("AgriVerify Token", "AGT") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function registerFarmer(string memory _name) public {
        require(
            !farmers[msg.sender].isRegistered,
            "Farmer is already registered"
        );
        farmers[msg.sender] = Farmer({
            name: _name,
            isRegistered: true,
            isCertified: false
        });
        emit FarmerRegistered(msg.sender, _name);
    }

    function submitCrop(string memory _name) public {
        require(farmers[msg.sender].isRegistered, "Farmer must be registered");
        cropCount++;
        crops[cropCount] = Crop({
            name: _name,
            certificationStatus: "Pending",
            farmer: msg.sender
        });
        emit CropSubmitted(cropCount, _name, msg.sender);
    }

    function certifyCrop(uint256 _cropId) public onlyOwner {
        require(_cropId > 0 && _cropId <= cropCount, "Invalid crop ID");
        require(
            keccak256(abi.encodePacked(crops[_cropId].certificationStatus)) ==
                keccak256(abi.encodePacked("Pending")),
            "Crop is already certified"
        );

        crops[_cropId].certificationStatus = "Certified";
        farmers[crops[_cropId].farmer].isCertified = true; // Certify the farmer as well
        emit CropCertified(_cropId, msg.sender);
    }

    function getFarmer(
        address _farmer
    )
        public
        view
        returns (string memory name, bool isRegistered, bool isCertified)
    {
        Farmer memory farmer = farmers[_farmer];
        return (farmer.name, farmer.isRegistered, farmer.isCertified);
    }

    function getCrop(
        uint256 _cropId
    )
        public
        view
        returns (
            string memory name,
            string memory certificationStatus,
            address farmer
        )
    {
        Crop memory crop = crops[_cropId];
        return (crop.name, crop.certificationStatus, crop.farmer);
    }
}
