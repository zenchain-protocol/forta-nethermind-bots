import { readFileSync } from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const secrets_file_path = process.env.SECRETS_FILE_PATH || "";

export type apiKeys = {
  apiKeys: {
    nativeIcePhishing: {
      etherscanApiKeys: string[];
      optimisticEtherscanApiKeys: string[];
      bscscanApiKeys: string[];
      polygonscanApiKeys: string[];
      fantomscanApiKeys: string[];
      arbiscanApiKeys: string[];
      snowtraceApiKeys: string[];
      zenchainApiKeys: string[];
    };
  };
  generalApiKeys: {
    ETHERSCAN_METADATA_TOKEN: string;
    REDIS_BASIC_AUTH: string;
    ZETTABLOCK: string[];
  };
};

export const getSecrets = async (): Promise<object> => {
  const data = readFileSync(secrets_file_path, "utf8");
  return JSON.parse(data) as apiKeys;
};
