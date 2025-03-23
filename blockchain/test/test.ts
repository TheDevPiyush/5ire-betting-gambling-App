import 'dotenv/config'
import hre from "hardhat";
const readline = require("readline-sync");

const deployedAddress = "0xCb852835eFBe5c4E546Ba8B4C6bdB8EcE501D0DF";

async function depositeFund(amount: string) {
    const BettingContract = await hre.ethers.getContractFactory("BettingApp");
    const signer = await hre.ethers.getSigner(process.env.PUBLIC_ADDRESS as string);
    const contract = BettingContract.attach(deployedAddress).connect(signer);

    console.log("Using wallet:", signer.address);
    console.log("Balance:", (await hre.ethers.provider.getBalance(signer.address)).toString());

    const tx = await contract.deposit({ value: hre.ethers.parseEther(amount), gasLimit: 500000 });

    await tx.wait();
    console.log("Transaction successful:", tx.hash);
}

async function WithdrawFunds(amount: string) {
    const BettingContract = await hre.ethers.getContractFactory("BettingApp");
    const signer = await hre.ethers.getSigner(process.env.PUBLIC_ADDRESS as string);
    const contract = BettingContract.attach(deployedAddress).connect(signer);

    const tx = await contract.withdraw(hre.ethers.parseEther(amount), { gasLimit: 500000 });
    await tx.wait();
    console.log("Withdraw successful:", tx.hash);
}

console.log("Enter your choice:\n1. Deposit\n2. Owner Withdraw\n");
const choice = readline.question();

if (choice === "1") {
    console.log("Enter Amount Please :");
    const amount = readline.question();
    depositeFund(amount).then(() => process.exit(0)).catch((e) => console.log(e));
} else if (choice === "2") {
    console.log("Enter Amount Please :");
    const amount = readline.question();
    WithdrawFunds(amount).then(() => process.exit(0)).catch((e) => console.log(e));
} else {
    console.log("Wrong Choice");
}
