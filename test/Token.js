const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("AgriVerify contract", function () {
  async function deployAgriVerifyFixture() {
    const AgriVerify = await ethers.getContractFactory("AgriVerify");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const initialSupply = ethers.parseUnits("1000000", 18); // Example initial supply
    const agriVerify = await AgriVerify.deploy(initialSupply);

    await agriVerify.waitForDeployment();

    return { AgriVerify, agriVerify, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { agriVerify, owner } = await loadFixture(deployAgriVerifyFixture);
      expect(await agriVerify.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { agriVerify, owner } = await loadFixture(deployAgriVerifyFixture);
      const ownerBalance = await agriVerify.balanceOf(owner.address);
      expect(await agriVerify.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { agriVerify, owner, addr1, addr2 } = await loadFixture(deployAgriVerifyFixture);
      await expect(agriVerify.transfer(addr1.address, ethers.parseUnits("50", 18)))
        .to.changeTokenBalances(agriVerify, [owner, addr1], [ethers.parseUnits("-50", 18), ethers.parseUnits("50", 18)]);

      await expect(agriVerify.connect(addr1).transfer(addr2.address, ethers.parseUnits("50", 18)))
        .to.changeTokenBalances(agriVerify, [addr1, addr2], [ethers.parseUnits("-50", 18), ethers.parseUnits("50", 18)]);
    });

    it("should emit Transfer events", async function () {
      const { agriVerify, owner, addr1, addr2 } = await loadFixture(deployAgriVerifyFixture);
      await expect(agriVerify.transfer(addr1.address, ethers.parseUnits("50", 18)))
        .to.emit(agriVerify, "Transfer").withArgs(owner.address, addr1.address, ethers.parseUnits("50", 18));

      await expect(agriVerify.connect(addr1).transfer(addr2.address, ethers.parseUnits("50", 18)))
        .to.emit(agriVerify, "Transfer").withArgs(addr1.address, addr2.address, ethers.parseUnits("50", 18));
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { agriVerify, owner, addr1 } = await loadFixture(deployAgriVerifyFixture);
      const initialOwnerBalance = await agriVerify.balanceOf(owner.address);

      // Try to send 1 token from addr1 (0 tokens) to owner.
      // `require` will evaluate false and revert the transaction.
      await expect(
        agriVerify.connect(addr1).transfer(owner.address, ethers.parseUnits("1", 18))
      ).to.be.revertedWithCustomError(agriVerify, "ERC20InsufficientBalance")
        .withArgs(addr1.address, 0, ethers.parseUnits("1", 18));

      // Owner balance shouldn't have changed.
      expect(await agriVerify.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});