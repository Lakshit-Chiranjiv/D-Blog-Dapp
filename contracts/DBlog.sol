// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DBlog{

    address payable contractOwner;
    uint blogCount;


    constructor() payable{
        contractOwner = payable(msg.sender);
    }

    struct Blog{
        uint blogId;
        address blogOwner;
        address blogCreator;
        string blogTitle;
        string blogBody;
        uint numOfReads;
        uint salePrice;
        bool onSale;
    }

    Blog[] blogList;

    mapping(uint => address) blogOwnersMap;

    //0.0001 ether for someone else reading - from contract to the blog Owner
    //0.01 ether to create a blog - from blog Creator to contract
    //sale price should be greater than 0.001 ethers
    //contract owner will get 0.001 ether everytime a blog is sold
    //the blog seller will get (salePrice - 0.001 ether)ether on selling a blog
    //the blog buyer will pay the salePrice amount and from that the seller and contractOwner will get their share

    function readBlog(uint blogId) public {
        if(msg.sender != blogOwnersMap[blogId]){
            payable(blogOwnersMap[blogId]).transfer(0.0001 ether);
        }
    }

    function createBlog(string memory _blogTitle,string memory _blogBody,uint _salePrice,bool _onSale) public payable{
        require(msg.value == 0.01 ether,"It costs 0.01 ether to create a blog");
        require((_salePrice * 0.001 ether) > 0.001 ether,"Sale price should be more than 0.001 ether");
        require(bytes(_blogTitle).length > 3,"Blog title length should be more than 3 characters");
        blogList.push(Blog(blogCount,msg.sender,msg.sender,_blogTitle,_blogBody,0,(_salePrice * (0.001 ether)),_onSale));
        blogOwnersMap[blogCount] = msg.sender;
        blogCount++;
    }

    function putBlogOnSale(uint blogId) public{
        require(msg.sender == blogOwnersMap[blogId],"Only owner of blog can put it on sale");
        blogList[blogId].onSale = true;
    }

    function removeBlogFromSale(uint blogId) public{
        require(msg.sender == blogOwnersMap[blogId],"Only owner of blog can put it off sale");
        blogList[blogId].onSale = false;
    }

    function buyBlog(uint blogId) public payable{
        require(msg.sender != blogOwnersMap[blogId],"Owner can't buy his/her own blog");
        require(blogList[blogId].onSale == true,"Blog is not on sale");
        require(msg.value == blogList[blogId].salePrice,"Pay the exact blog sale amount to buy");
        payable(blogList[blogId].blogOwner).transfer(blogList[blogId].salePrice - (0.001 ether));
        payable(contractOwner).transfer(0.001 ether);
        blogList[blogId].blogOwner = msg.sender;
        blogOwnersMap[blogId] = msg.sender;
    }

    function getABlog(uint blogId) public view returns(Blog memory){
        return blogList[blogId];
    }

    function getAllBlogs() public view returns(Blog[] memory){
        return blogList;
    }

    receive () external payable{} 

}