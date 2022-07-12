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

        //read blog
        txn = await dblogContract.connect(user2).readBlog(0);
        await txn.wait();
        console.log("Blog read",txn.value);
      
        //get A Blog
        blogDetails = await dblogContract.getABlog(0);
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
        //will give error
        txn = await dblogContract.connect(user2).buyBlog(0,{ value: ethers.utils.parseEther("0.004") })
        await txn.wait()
      
        blogDetails = await dblogContract.getABlog(0);
        console.log(blogDetails);
        console.log("user 1 remains the blog 0 owner : "+blogDetails.blogOwner == user1.address)
      
    } catch (error) {
        console.log(error.message)
    }
}


async function filterCheck() {
  try {

      //deploying and contract address
      const [owner,user1,user2,user3,user4] = await ethers.getSigners();  
      const DBlog = await ethers.getContractFactory("DBlog");
      const dblogContract = await DBlog.deploy();
      await dblogContract.deployed();
    
      console.log("DBlog contract deployed to:", dblogContract.address);

        //create blog by owner
        let txn = await dblogContract.createBlog('Owner title','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
        await txn.wait();

        //create blog by owner part 2
        txn = await dblogContract.createBlog('Owner title 2','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
        await txn.wait();

        //create blog by user1
        txn = await dblogContract.connect(user1).createBlog('User 1 title','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
        await txn.wait();

        //create blog by user2
        txn = await dblogContract.connect(user2).createBlog('User 2 title','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
        await txn.wait();

        //create blog by user2 part 2
        txn = await dblogContract.connect(user2).createBlog('User 2 title 2','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
        await txn.wait();

        //create blog by user3
        txn = await dblogContract.connect(user3).createBlog('User 3 title','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
        await txn.wait();

        //create blog by user4
        txn = await dblogContract.connect(user4).createBlog('User 4 title','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
        await txn.wait();
      
        //get All Blogs
        let blogs = await dblogContract.getAllBlogs();
        let filterBlogs = blogs.filter((blog) => blog.blogOwner===user2.address)
        console.log(filterBlogs);
    
  } catch (error) {
      console.log(error.message)
  }
}

main()
  .then(() => {})
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

filterCheck()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
