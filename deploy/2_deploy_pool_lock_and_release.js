module.exports = async ({ getNamedAccounts, deployments }) => {
    const {firstAccount} = await getNamedAccounts()
    const { deploy, log } = deployments

    log("NFTPoolLockAndRelease deploying")


    // 构造函数入参：address _router, address _link, address nftAddr
    const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator")
    const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address)
    const ccipConfig = await ccipSimulator.configuration()
    const sourceChainRouter = ccipConfig.sourceRouter_
    const linkTokenAddr = ccipConfig.linkToken_
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