async function main() {
    // Get the account that will deploy the contract
    const [deployer] = await ethers.getSigners(); // ethers.getSigners() returns a list of accounts
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory to deploy the BettingPlatform contract
    const BettingPlatform = await ethers.getContractFactory("BettingPlatform");

    // Deploy the contract
    const bettingPlatform = await BettingPlatform.deploy(); // Contract deployment
    console.log("BettingPlatform deployed to:", bettingPlatform.address);
}

// Call the main function and handle errors
main()
  .then(() => process.exit(0))  // Success
  .catch((error) => {
    console.error(error); // Log error if something goes wrong
    process.exit(1);
  });
