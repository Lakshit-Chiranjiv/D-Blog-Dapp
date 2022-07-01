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


}