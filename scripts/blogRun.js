const { ethers } = require("hardhat");

async function main() {
  const [owner,user1] = await ethers.getSigners();  
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

  console.log(blogDetails.blogOwner)
  console.log(blogDetails.blogOwner == owner.address)

  txn = await dblogContract.connect(user1).buyBlog(0,{ value: ethers.utils.parseEther("0.004") })
  await txn.wait()
  console.log(`User 1: ${user1.address} bought blog with blog id 0 from the owner: ${owner.address} at 0.004 ethers`);

  blogDetails = await dblogContract.getABlog(0);
  console.log(blogDetails);

  console.log(blogDetails.blogOwner)
  console.log(blogDetails.blogOwner == user1.address)


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
