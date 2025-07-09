const { network } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
module.exports = async ({ getNamedAccounts, deployments }) => {

    const { firstAccount } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("NFTPoolLockAndRelease deploying")

    let sourceChainRouter
    let linkTokenAddr

    if (developmentChains.includes(network.name)) {
        // 构造函数入参：address _router, address _link, address nftAddr
        const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator")
        const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address)
        const ccipConfig = await ccipSimulator.configuration()
        sourceChainRouter = ccipConfig.sourceRouter_
        linkTokenAddr = ccipConfig.linkToken_
    } else {
        sourceChainRouter = networkConfig[network.config.chainId].router
        linkTokenAddr = networkConfig[network.config.chainId].linkToken
    }


    const nftDeployment = await deployments.get("MyToken")
    const nftAddr = nftDeployment.address


    await deploy("NFTPoolLockAndRelease", {
        contract: "NFTPoolLockAndRelease",
        from: firstAccount,
        log: true,
        args: [sourceChainRouter, linkTokenAddr, nftAddr]
    })

    log("NFTPollLockAndRelease deployed successfully.")
}

module.exports.tags = ["sourcechain", "all"]