const { ethers } = require("hardhat");

async function main() {
  const DBlog = await ethers.getContractFactory("DBlog");
  const dblogContract = await DBlog.deploy();
  await dblogContract.deployed();

  console.log("DBlog contract deployed to:", dblogContract.address);

  let contractName = await dblogContract.getContractName();
  console.log(contractName);

  let txn = await dblogContract.createBlog('Some blog title','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
  await txn.wait();
  console.log("A new blog created");

  let blogDetails = await dblogContract.getABlog(0);
  console.log(blogDetails);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
