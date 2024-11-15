# Native Ice Phishing Bot

## Description

This bot monitors:

- Transactions where the receiver is either an externally-owned account (EOA) or a suspicious contract, and the input data is the hash of a known function signature.
- When a suspicious EOA receives native tokens from a number of different EOAs that exceeds a certain threshold.
- When a contract is deployed with characteristics indicative of a potential native ice phishing attack.

## Supported Chains

- Ethereum
- Arbitrum
- Avalanche
- BNB Smart Chain
- Fantom
- Optimism
- Polygon

## Alerts

- NIP-1
  - Fired when the receiver of a transaction is an EOA, the value is non-zero and the input data is the hash of a known function signature.
  - Severity is always set to "Medium"
  - Type is always set to "Suspicious"
  - Metadata contains:
    - `attacker`: The receiver of the transaction
    - `victim`: The initiator of the transaction
    - `funcSig`: The function signature in the transaction input
    - `anomalyScore`: The anomaly score of the alert
  - Labels contain:
    - Label 1:
      - `entity`: The transaction's hash
      - `entityType`: The type of the entity, always set to "Transaction"
      - `label`: The type of the label, always set to "Attack"
      - `confidence`: The confidence level of the transaction being an attack (0-1), always set to 0.9
    - Label 2:
      - `entity`: The transaction initiator address
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Victim"
      - `confidence`^: The confidence level of the address being a victim (0-1), always set to 0.9
    - Label 3:
      - `entity`: The transaction receiver address
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Attacker"
      - `confidence`^: The confidence level of the receiver being an attacker (0-1), always set to 0.9
- NIP-2
  - Fired when the receiver of a transaction is an EOA, the value is 0 and the input data is the hash of a known function signature.
  - Severity is always set to "Info"
  - Type is always set to "Suspicious"
  - Metadata contains:
    - `attacker`: The receiver of the transaction
    - `victim`: The initiator of the transaction
    - `funcSig`: The function signature in the transaction input
    - `anomalyScore`: The anomaly score of the alert
  - Labels contain:
    - Label 1:
      - `entity`: The transaction's hash
      - `entityType`: The type of the entity, always set to "Transaction"
      - `label`: The type of the label, always set to "Attack"
      - `confidence`: The confidence level of the transaction being an attack (0-1), always set to 0.6
    - Label 2:
      - `entity`: The transaction initiator address
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Victim"
      - `confidence`^: The confidence level of the address being a victim (0-1), always set to 0.6
    - Label 3:
      - `entity`: The transaction receiver address
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Attacker"
      - `confidence`^: The confidence level of the receiver being an attacker (0-1), always set to 0.6
  - NIP-3
    - Fired when the receiver of a transaction is a contract, the value is non-zero, the function called is one that has previously created one NIP-1 alert, and the number of exposed contract functions is under a threshold.
    - Severity is always set to "Low"
    - Type is always set to "Suspicious"
    - Metadata contains:
      - `attacker`: The receiver of the transaction
      - `victim`: The initiator of the transaction
      - `funcSig`: The function signature in the transaction input
      - `anomalyScore`: The anomaly score of the alert
    - Labels contain:
      - Label 1:
        - `entity`: The transaction's hash
        - `entityType`: The type of the entity, always set to "Transaction"
        - `label`: The type of the label, always set to "Attack"
        - `confidence`: The confidence level of the transaction being an attack (0-1), always set to 0.6
      - Label 2:
        - `entity`: The transaction initiator address
        - `entityType`: The type of the entity, always set to "Address"
        - `label`: The type of the label, always set to "Victim"
        - `confidence`^: The confidence level of the address being a victim (0-1), always set to 0.6
      - Label 3:
        - `entity`: The transaction receiver address
        - `entityType`: The type of the entity, always set to "Address"
        - `label`: The type of the label, always set to "Attacker"
        - `confidence`^: The confidence level of the receiver being an attacker (0-1), always set to 0.6
  - NIP-4
    - Fired when a suspicious EOA receives funds from an over a threshold number of different EOAs.
    - Severity is always set to "High"
    - Type is always set to "Suspicious"
    - Metadata contains:
      - `attacker`: The receiver of the transaction
      - `victim`: The initiator of the transaction
      - `funcSig`: The function signature in the transaction input
      - `anomalyScore`: The anomaly score of the alert
    - Labels contain:
      - Label 1:
        - `entity`: The transaction receiver address
        - `entityType`: The type of the entity, always set to "Address"
        - `label`: The type of the label, always set to "Attacker"
        - `confidence`^: The confidence level of the receiver being an attacker (0-1), always set to 0.5
      - Label #:
        - `entity`: The victim address
        - `entityType`: The type of the entity, always set to "Address"
        - `label`: The type of the label, always set to "Victim"
        - `confidence`^: The confidence level of the address being a victim (0-1), always set to 0.5

- NIP-6
  - Fired when there's a withdrawal from the owner of a contract used for a native ice phishing attack.
  - Severity is always set to "Critical"
  - Type is always set to "Suspicious"
  - Metadata contains:
    - `attacker`: The owner address
    - `address`: The contract address
    - `receiver`: The address that received the funds
    - `anomalyScore`: The anomaly score of the alert
  - Labels contain:
    - Label 1:
      - `entity`: The transaction's hash
      - `entityType`: The type of the entity, always set to "Transaction"
      - `label`: The type of the label, always set to "Attack"
      - `confidence`: The confidence level of the transaction being an attack (0-1), always set to 0.9
    - Label 2:
      - `entity`: The withdrawal initiator address
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Attacker"
      - `confidence`^: The confidence level of the receiver being an attacker (0-1), always set to 0.9
    - Label 3:
      - `entity`: The withdrawal receiver address
      - `entityType

`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Attacker"
      - `confidence`^: The confidence level of the receiver being an attacker (0-1), always set to 0.9
- NIP-7
  - Fired when a suspicious EOA receives funds from over a threshold number of different EOAs and has no other interactions with those EOAs for a week.
  - Severity is always set to "Critical"
  - Type is always set to "Suspicious"
  - Metadata contains:
    - `attacker`: The receiver of the transaction
    - `victim`: The initiator of the transaction
    - `funcSig`: The function signature in the transaction input
    - `anomalyScore`: The anomaly score of the alert
  - Labels contain:
    - Label 1:
      - `entity`: The transaction receiver address
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Attacker"
      - `confidence`^: The confidence level of the receiver being an attacker (0-1), always set to 0.8
    - Label 2:
      - `entity`: The victim address
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Victim"
      - `confidence`^: The confidence level of the address being a victim (0-1), always set to 0.8
- NIP-8
  - Fired when a contract is deployed with characteristics indicative of a potential native & ERC20/ERC721 ice phishing attack (Using a Multicall and a Fallback function).
  - Severity is always set to "Critical"
  - Type is always set to "Suspicious"
  - Metadata contains:
    - `attacker`: The contract creator address
    - `address`: The created contract address
    - `anomalyScore`: The anomaly score of the alert
  - Labels contain:
    - Label 1:
      - `entity`: The transaction's hash
      - `entityType`: The type of the entity, always set to "Transaction"
      - `label`: The type of the label, always set to "Attack"
      - `confidence`: The confidence level of the transaction being an attack (0-1), always set to 0.9
    - Label 2:
      - `entity`: The contract creator address
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Attacker"
      - `confidence`^: The confidence level of the receiver being an attacker (0-1), always set to 0.9
- NIP-9
  - Fired when a multicall is executed stealing ERC20 funds in a known scammer contract.
  - Severity is always set to "Info"
  - Type is always set to "Suspicious"
  - Metadata contains:
    - `attacker`: The transaction initiator, the address that initiated the multicall, the contract that contains the multicall, and the fund recipient(s)
    - `victim`: The fund sender(s) (Only if known)
    - `anomalyScore`: The anomaly score of the alert
  - Labels contain:
    - Label 1:
      - `entity`: The transaction initiator address
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Attacker"
      - `confidence`: The confidence level of the transaction being an attack (0-1), always set to 0.9
    - Label 2:
      - `entity`: The address that invoked the multicall
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Attacker"
      - `confidence`: The confidence level of the transaction being an attack (0-1), always set to 0.9
    - Label 3:
      - `entity`: The contract that contained the multicall
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Attacker"
      - `confidence`: The confidence level of the transaction being an attack (0-1), always set to 0.9
    - Label 4:
      - `entity`: The recipient(s) address
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Attacker"
      - `confidence`: The confidence level of the receiver being an attacker (0-1), always set to 0.9
    - Label 5:
      - `entity`: The victim(s) address (only if known)
      - `entityType`: The type of the entity, always set to "Address"
      - `label`: The type of the label, always set to "Victim"
      - `confidence`: The confidence level of the address being a victim (0-1), always set to 0.9

## Test Data

The bot behaviour can be verified with the following transactions on Ethereum Mainnet:

- [0x28aec33f80d6d62965e524f9f97660cc0efff6aff1ebe4902c7849b06070f3cc](https://etherscan.io/tx/0x28aec33f80d6d62965e524f9f97660cc0efff6aff1ebe4902c7849b06070f3cc) (NIP-1 alert)
- [0x80bb173bed260691b72117849f198fbf467238e6001e6ff772412c3179d2b2c6](https://etherscan.io/tx/0x80bb173bed260691b72117849f198fbf467238e6001e6ff772412c3179d2b2c6) (NIP-2 alert)
- [0x4329c267d03999dc8f9f2f879a9e969381d926fddd802e4eadab8133780fe3c1](https://etherscan.io/tx/0x4329c267d03999dc8f9f2f879a9e969381d926fddd802e4eadab8133780fe3c1) (NIP-9 alert)

## Running Locally

To run this bot locally, follow these steps:

1. **Clone the repository and navigate to the project directory:**

   ```bash
   git clone git@github.com:zenchain-protocol/forta-nethermind-bots.git
   cd forta-nethermind-bots/native-ice-phishing
   ```

2. **Ensure you have Node Version Manager (NVM) installed and use the correct Node.js version:**

   ```bash
   nvm use
   ```

3. **Build and start the Docker containers:**

   Build the Docker images with `docker-compose`.

   ```bash
   docker-compose build --build-arg INSTALL_DEV=true --build-arg NODE_ENV=development
   ```

   Start the bot in detached mode:

   ```bash
   docker-compose up -d native-ice-phishing-detection-bot
   ```

4. **Run tests:**

   Execute the tests using the test runner container:

   ```bash
   docker-compose run --rm test-runner
   ```

   To test different transactions, you can modify the `command` in the `docker-compose.yml` file:

   ```yaml
   test-runner:
     command: ["npm", "run", "tx", "0x4329c267d03999dc8f9f2f879a9e969381d926fddd802e4eadab8133780fe3c1"]
   ```

   Replace `0x4329c267d03999dc8f9f2f879a9e969381d926fddd802e4eadab8133780fe3c1` with the hash of the transaction you want to test.

5. **Monitor logs and container status:**

   To see logs from the bot, use:

   ```bash
   docker-compose logs -f native-ice-phishing-detection-bot
   ```

   Check the status of the containers:

   ```bash
   docker-compose ps
   ```
