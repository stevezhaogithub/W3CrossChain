const { getNamedAccounts, ethers } = require("hardhat")
const { expect } = require("chai")

let firstAccount
let ccipSimulator
let nft
let wnft
let nftPoolBurnAndMint
let nftPoolLockAndRelease

before(async () => {
    // prepare variables: contract, account
    firstAccount = (await getNamedAccounts()).firstAccount
    // 部署所有合约
    await deployments.fixture(["all"])

    ccipSimulator = await ethers.getContract("CCIPLocalSimulator", firstAccount)
    nft = await ethers.getContract("MyToken", firstAccount)
    nftPoolLockAndRelease = await ethers.getContract("NFTPoolLockAndRelease", firstAccount)
    wnft = await ethers.getContract("WrappedMyToken", firstAccount)
    nftPoolBurnAndMint = await ethers.getContract("NFTPoolBurnAndMint", firstAccount)
})

// 一、source chain -> destination chain
// 1. test if user can mint a nft from nft contract successfully.
// 2. test if user cn lock the nft in the pool and send ccip message on source chain
// 3. test if user can get a wrapped nft in destination chain


// 二、destination chain -> source chain
// 1. test if user can burn the wnft and send ccip message on destination chain
// 2. test if user have the nft unlocked on source chain



describe("source chain -> destination chain tests", async function () {
    // 1. test if user can mint a nft from nft contract successfully.
    it("test if user can mint a nft from nft contract successfully", async function () {
        await nft.safeMint(firstAccount)
        // 测试 tokenId 为 0 的 nft 的 owner 是否等于 firstAccount
        const owner = await nft.ownerOf(0)
        expect(owner).to.equal(firstAccount)
    })
})

// 2. test if user cn lock the nft in the pool and send ccip message on source chain
// 3. test if user can get a wrapped nft in destination chain


// 二、destination chain -> source chain
// 1. test if user can burn the wnft and send ccip message on destination chain
// 2. test if user have the nft unlocked on source chain

