const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dblog contract name", function () {
  it("Should return correct contract name", async function () {
    const DBlog = await ethers.getContractFactory("DBlog");
    const dblogContract = await DBlog.deploy();
    await dblogContract.deployed();

    expect(await dblogContract.getContractName()).to.equal("Decentralized Blog App");
    
  });
});
