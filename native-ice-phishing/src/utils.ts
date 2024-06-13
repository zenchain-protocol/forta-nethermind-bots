import { TransactionEvent, ethers } from "@fortanetwork/forta-bot";

const ONE_DAY = 24 * 60 * 60;
const timePeriodDays = 5;
export const TIME_PERIOD = timePeriodDays * ONE_DAY;

export const MAX_OBJECT_SIZE = 4 * 1024 * 1024; // 4 MB

export const POLYGON_MATIC_ADDRESS =
  "0x0000000000000000000000000000000000001010";

export const WITHDRAW_SIG = "3ccfd60b"; // withdraw();
export const WITHDRAWTO_SIG = "f714ce"; // withdraw(uint256, address) without leading 0s;
export const BALANCEOF_SIG = "70a08231";
export const MULTICALL_SIGS = ["caa5c23f", "63fb0b96"]; // multicall((address,bytes)[]), multicall(address[],bytes[])
export const TRANSFER_FROM_SIG = "0x23b872dd"; // transferFrom(address,address,uint256)
export const TRANSFER_SIG = "0xa9059cbb";
export const PERMIT2_SIG = "0x2a2d80d1"; // permit(address,((address,uint160,uint48,uint48)[],address,uint256),bytes)
export const PERMIT2_TRANSFER_FROM_SIG = "0x0d58b1db"; // transferFrom((address,address,uint160,address)[])
export const BUY_TOKENS_SIG = "0x3610724e"; // buyTokens(uint256)

export const OWNER_ABI = [
  "function owner() public view returns (address)",
  "function getOwner() public view returns (address)",
];
export const MULTICALL_ABIS = [
  "function multicall(tuple(address target, bytes callData)[] calls)",
  "function multicall(address[] targets, bytes[] callData)",
];
export const TRANSFER_FROM_ABI = [
  "function transferFrom(address sender, address recipient, uint256 amount)",
];
export const TRANSFER_ABI = [
  "function transfer(address recipient, uint256 amount)",
];
export const TRANSFER_EVENT_ABI = [
  "event Transfer(address indexed from, address indexed to, uint value)",
];

export const PERMIT2_FUNCTION_ABI = [
  "function permit(address owner, ((address token, uint160 value, uint48 expiration, uint48 nonce)[] details, address spender, uint256 deadline), bytes signature)",
];

export const PERMIT2_TRANSFER_FROM_FUNCTION_ABI = [
  "function transferFrom((address from, address to, uint160 amount, address token)[] transferDetails)",
];

export const toTxCountThreshold = 2000;
export const fromTxCountThreshold = 9999;
export const transfersThreshold = 7;

export type Transfer = {
  from: string;
  fromNonce: number;
  fundingAddress: string;
  latestTo: string;
  value: string;
  timestamp: number;
};

export type Data = {
  nativeTransfers: Record<string, Transfer[]>;
  alertedAddresses: string[];
  alertedHashes: string[];
  alertedAddressesCritical: string[];
};

interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
}

export interface Response {
  status: string;
  message: string;
  result: Transaction[];
}

export const filterConflictingEntries: (transfers: Transfer[]) => Transfer[] = (
  transfers
) => {
  return transfers.filter((transfer, _, self) => {
    const conflictingEntries = self.filter((otherTransfer) => {
      const isFromSame = otherTransfer.from === transfer.from;
      if (!isFromSame) return false;

      // Convert the values to BigInt
      const transferValue = BigInt(transfer.value);
      const otherTransferValue = BigInt(otherTransfer.value);

      // Calculate bounds
      const lowerBound = (otherTransferValue * 8n) / 10n;
      const upperBound = (otherTransferValue * 12n) / 10n;

      // Check if transfer value is out of range (80% - 120%)
      const isValueOutOfRange = transferValue < lowerBound || transferValue > upperBound;

      // Check if transfer value is unique
      const isValueUnique = transferValue !== otherTransferValue;

      // Check if latestTo is unique
      const isLatestToUnique = otherTransfer.latestTo !== transfer.latestTo;

      // Return true if any of the conditions are violated
      return !(isValueOutOfRange || isValueUnique || isLatestToUnique);
    });

    // Keep only the first conflicting entry
    return (
      conflictingEntries.length === 0 ||
      self.indexOf(transfer) === self.indexOf(conflictingEntries[0])
    );
  });
};

export const checkRoundValue = (num: bigint): boolean => {
  const divisor = 10n ** 18n; // equivalent to 10^18
  const quotient = num / divisor;
  return quotient * divisor === num;
};

export const isKeywordPresent = (labels: string[]) => {
  const keywords = [
    "attack",
    "xploit",
    "phish",
    "hack",
    "drain",
    "scam",
    "fraud",
    "heist",
    ".eth",
  ];
  return labels.some((label) =>
    keywords.some((keyword) => label.toLowerCase().includes(keyword))
  );
};

export const extractAttackers = (txEvent: TransactionEvent) => {
  let attackers: string[] = [];

  txEvent.traces.forEach((trace) => {
    if (
      MULTICALL_SIGS.some((sig) => trace.action.input?.startsWith(`0x${sig}`))
    ) {
      attackers.push(trace.action.from, trace.action.to);
    }
  });

  return attackers;
};
