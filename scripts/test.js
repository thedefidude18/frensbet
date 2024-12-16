async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_URL);
    const blockNumber = await provider.getBlockNumber();
    console.log("Current block number:", blockNumber);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});