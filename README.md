Sure, here is the modified README to clarify that only the Native Ice Phishing Detection Bot is being used at the moment:

# Forta-Agents

Forta Agents proof of concepts from **Venice** team.

## Current Active Agent

- **Native Ice Phishing Detection Bot**: The bot detects and analyzes specific transaction patterns associated with potential native ice phishing attacks. Its primary focus lies in monitoring transactions where the receiver is either an externally-owned account (EOA) or a suspicious contract, coupled with the input data being the hash of a known function signature. Additionally, the bot keeps a watchful eye on instances where suspicious EOAs receive native tokens from multiple different EOAs surpassing a predetermined threshold, as well as cases where contracts are deployed with attributes indicative of a potential native ice phishing attack.

## Other Agents (Not in Use)

- **Multi Gas Threshold**: Detect unusual amount of gas used.
- **Anomalous Tx Value**: Detect transactions using very high tx value.
- **High volume of failed transactions**: Detect protocols receiving a high volume of failed transactions.
- **Onwership Transfer**: Detect OwnershipTransferred events.
- **Flash Loan**: Detects use of flash loan.
- **TimeLock**: Detects use of Openzeppelin Timelock.
- **Detect Upgrade Events**: The agent detects upgrade events either for a specific contract or for any.
- **Detect Unusual Block Difficulty**: The agent checks for unusual changes in Block difficulty.
- **Compound Gov Event Tracker**: The agent detects any compound governance event.
- **High Utilization of Aave Reserves**: The agent detects high utilization values on `USDC`, `DAI`, and `USDT` reserves on Aave.
- **MEV Tracker**: The agent detects contract interactions which are inside MEV bundle.
- **Recently-created Smart Contracts with Little History**: Detect transactions to contracts recently-created or with little history.
- **Contracts deployed by contracts**: Detect when a contract deploys a new contract.
- **Gnosis Safe admin changes**: Detect transactions that emit gnosis safe events of admin or threshold changes.
- **Initialize**: Detects if the initialize function is called multiple times.
- **High Flash Loan Value**: Detects if a flash loan with a huge amount is used.
- **Possible locked NFTs**: Detect transactions that may lock an NFT in a contract.
- **Chainkeeper**: Detects transactions involving blacklisted addresses.
- **Success txn with internal failures agent**: Detect transactions with internal failures.
- **Yearn Strategy without call Harvest**: Detects yearn strategies that haven't called harvest in too much time.
- **Tornado Cash 1**: Detects addresses that sent more than 100 ETH into Tornado Cash in one day.
- **Reentrancy Counter**: Detects transactions with multiple nested calls to the same contract.
- **Curve Finance Agents Suite**: Provides a list of agents related to Curve contracts.
- **YFI governance changes**: Detect transactions that change the YFI governance address.