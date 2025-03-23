import hre from "hardhat";

async function main() {
    const BettingContract = await hre.ethers.getContractFactory("BettingApp");
    console.log("Deployment started.....")
    const DeployContract = BettingContract.deploy();
    (await DeployContract).waitForDeployment();
    console.log("contract Deployed at :")
    console.log((await DeployContract).target);
}

// 0xCb852835eFBe5c4E546Ba8B4C6bdB8EcE501D0DF
main().then(() => process.exit(0)).catch((e: any) => console.log(e))