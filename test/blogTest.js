const { expect } = require("chai");
const { ethers } = require("hardhat");


let DBlog;
let dblogContract;

beforeEach(async function () {
  DBlog = await ethers.getContractFactory("DBlog");
  dblogContract = await DBlog.deploy();
  await dblogContract.deployed();
});

describe("Dblog contract", function () {

  it("Should return correct contract name", async function () {
    expect(await dblogContract.getContractName()).to.equal("Decentralized Blog App");
  });

  it("Should create a blog with passed blog Details", async function () {
    const [owner] = await ethers.getSigners();
    let txn = await dblogContract.createBlog('Sample blog title','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
    await txn.wait();
    let blogDetails = await dblogContract.getABlog(0);
    expect(blogDetails.blogTitle).to.equal("Sample blog title");
    expect(blogDetails.blogBody).to.equal("Blog body is lorem ipsum");
    expect(blogDetails.salePrice).to.equal(ethers.utils.parseEther("0.004"));
    expect(blogDetails.onSale).to.equal(true);
    expect(blogDetails.blogOwner).to.equal(owner.address);
    expect(blogDetails.blogCreator).to.equal(owner.address);
  });

  it("blogOwner should change after buying", async function () {
    const [owner,user1] = await ethers.getSigners();
    let txn = await dblogContract.createBlog('Sample blog title','Blog body is lorem ipsum',4,true,{ value: ethers.utils.parseEther("0.01") });
    await txn.wait();

    let blogDetails = await dblogContract.getABlog(0);
    expect(blogDetails.blogOwner).to.equal(owner.address);

    txn = await dblogContract.connect(user1).buyBlog(0, { value: ethers.utils.parseEther("0.004") });
    await txn.wait();

    blogDetails = await dblogContract.getABlog(0);
    expect(blogDetails.blogOwner).to.equal(user1.address);
  });
});
