import { runHealthCheck, scanEthereum } from "@fortanetwork/forta-bot";
import agent from "./agent"; // Ensure the default export is being used

const { initialize, handleTransaction, handleBlock } = agent;

async function main() {
    // Initialize environment and configurations
    const _ = await initialize();

    scanEthereum({
        rpcUrl: process.env.EVM_RPC!,
        handleTransaction: handleTransaction,
        handleBlock: handleBlock,
    });

    runHealthCheck();
}

// Only run the main() method if this file is directly invoked (vs imported for testing)
if (require.main === module) {
    main();
}
