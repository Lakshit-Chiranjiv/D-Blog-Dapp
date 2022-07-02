const { ethers } = require("hardhat");

async function main() {
    try {

        //deploying and contract address
        const [owner,user1,user2] = await ethers.getSigners();  
        const DBlog = await ethers.getContractFactory("DBlog");
        const dblogContract = await DBlog.deploy();
        await dblogContract.deployed();
      
        console.log("DBlog contract deployed to:", dblogContract.address);
      
        //contract name
        let contractName = await dblogContract.getContractName();
        console.log(contractName);
      
        //create blog
        let txn = await dblogContract.createBlog('Some blog title','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
        await txn.wait();
        console.log("A new blog created",txn.value);
      
        //get A Blog
        let blogDetails = await dblogContract.getABlog(0);
        console.log(blogDetails);
       
        //checking blog owner
        console.log(blogDetails.blogOwner)
        console.log(blogDetails.blogOwner == owner.address)
      
        //buy blog
        txn = await dblogContract.connect(user1).buyBlog(0,{ value: ethers.utils.parseEther("0.004") })
        await txn.wait()
        console.log(`User 1: ${user1.address} bought blog with blog id 0 from the owner: ${owner.address} at 0.004 ethers`);
      
        blogDetails = await dblogContract.getABlog(0);
        console.log(blogDetails);
      
        //checking blog owner
        console.log(blogDetails.blogOwner)
        console.log(blogDetails.blogOwner == user1.address)
      
        //removing blog from sale
        txn = await dblogContract.connect(user1).removeBlogFromSale(0);
        await txn.wait();
      
        blogDetails = await dblogContract.getABlog(0);
        console.log(blogDetails);
        console.log("user 1 is blog 0 owner : "+blogDetails.blogOwner == user1.address)
      
        //trying to buy blog after it has been put off sale
        txn = await dblogContract.connect(user2).buyBlog(0,{ value: ethers.utils.parseEther("0.004") })
        await txn.wait()
      
        blogDetails = await dblogContract.getABlog(0);
        console.log(blogDetails);
        console.log("user 1 remains the blog 0 owner : "+blogDetails.blogOwner == user1.address)
      
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
