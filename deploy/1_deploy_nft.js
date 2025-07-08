// 部署脚本
module.exports = async ({ getNamedAccounts, deployments }) => {
    const {firstAccount} = await getNamedAccounts()
    const { deploy, log } = deployments

    log("Deploying nft contract")
    await deploy("MyToken", {
        contract: "MyToken",
        from: firstAccount,
        log: true,
        args: ["MyToken", "MT"]
    })
    log("nft contract has deployed successfully.")
}

module.exports.tags = ["sourcechain", "all"]