const { ethers } = require("hardhat");

async function main() {
  const DBlog = await ethers.getContractFactory("DBlog");
  const dblogContract = await DBlog.deploy();
  await dblogContract.deployed();

  console.log("DBlog contract deployed to:", dblogContract.address);

  let contractName = await dblogContract.getContractName();
  console.log(contractName);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
