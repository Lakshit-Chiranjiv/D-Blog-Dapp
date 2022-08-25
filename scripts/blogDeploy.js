const { ethers } = require("hardhat");

async function main() {
    try {

        //deploying and contract address
        const [owner] = await ethers.getSigners();  
        let ownerBalance = await owner.getBalance();
        const DBlog = await ethers.getContractFactory("DBlog");
        console.log("owner balance before deploying :",ownerBalance.toString());
        // const dblogContract = await DBlog.deploy();
        const dblogContract = await DBlog.deploy({ value: ethers.utils.parseEther("0.4") });
        await dblogContract.deployed();
        ownerBalance = await owner.getBalance();
        console.log("owner balance after deploying :",ownerBalance.toString());
      
        console.log("DBlog contract deployed on goerli to address:", dblogContract.address);
    } catch (error) {
        console.log(error.message)
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
