import { runHealthCheck, scanEthereum } from "@fortanetwork/forta-bot";
import handleBlock from "./agent";
import handleTransaction from "./agent";
import initialize from "./agent";


async function main() {
    // TODO: Figure out how to migrate these function definitions to V2 
    const initializeResponse = await initialize();

    scanEthereum({
        rpcUrl: process.env.EVM_RPC!,
        handleTransaction: handleTransaction,
        handleBlock: handleBlock,
    })

    runHealthCheck()
}

// only run main() method if this file is directly invoked (vs imported for testing)
if (require.main === module) {
    main();
}