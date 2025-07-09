const { task } = require("hardhat/config")
const { networkConfig } = require("../helper-hardhat-config")

task("burn-and-cross")
    .addOptionalParam("chainselector", "chain selector of dest chain")
    .addOptionalParam("receiver", "receiver address on dest chain")
    .addParam("tokenid", "token ID to be crossed chain")
    .setAction(async (taskArgs, hre) => {
        let chainselector
        let receiver
        const tokenId = taskArgs.tokenid
        const { firstAccount } = await getNamedAccounts()

        if (taskArgs.chainselector) {
            chainselector = taskArgs.chainselector
        } else {
            chainSelector = networkConfig[network.config.chainId].companionChainSelector
            console.log("chainselector is not set in command.")
        }
        console.log(`chainselector is ${chainSelector}`)

        if (taskArgs.receiver) {
            receiver = taskArgs.receiver
        } else {
            // const nftPoolBurnAndMintDeployment = deployments.get("NFTPoolBurnAndMint")
            const nftPoolLockAndReleaseDeployment = await hre.companionNetworks["destChain"].deployments.get("NFTPoolLockAndRelease")
            receiver = nftPoolLockAndReleaseDeployment.address
            console.log("receiver is not set in command.")
        }

        console.log(`reciever's address is ${receiver}`)

        // transfer link token to address of the pool
        const linkTokenAddress = networkConfig[network.config.chainId].linkToken
        const linkToken = await ethers.getContractAt("LinkToken", linkTokenAddress)
        const nftPoolBurnAndMint = await ethers.getContract["NFTPoolBurnAndMint"]
        const transferTx = linkToken.transfer(nftPoolBurnAndMint.target, ethers.parseEther("10"))
        await transferTx.wait(6)
        const balance = linkToken.balanceOf(nftPoolBurnAndMint.target)
        console.log(`Balance of pool is ${balance}`)

        // approve pool address to call transferFrom
        const wnft = await ethers.getContract("WrappedMyToken", firstAccount)
        await wnft.approve(nftPoolBurnAndMint.target, tokenId)
        console.log("approve success.")


        // call lockAndSendNFT
        const burnAndSendNFTtx = await nftPoolBurnAndMint.burnAndSendNFT(tokenId, firstAccount, chainselector, receiver)

        console.log(`ccip transaction is sent, the tx hash is ${burnAndSendNFTtx}`)
    })

module.exports = {}