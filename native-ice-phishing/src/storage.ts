import * as dotenv from "dotenv";
import axios from 'axios';
import { fetchJwt } from '@fortanetwork/forta-bot';

dotenv.config();

const apiUrl = process.env.STORAGE_API_URL || "";

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
    ZETTABLOCK: string[];
  };
};

export const getApiKeys = async (): Promise<apiKeys> => {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  if (process.env.NODE_ENV === "production") {
    const token = await fetchJwt({ key: "value" }, new Date(Date.now() + 5000));
    // @ts-ignore
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchKey = async (key: string) => {
    try {
      const response = await axios.get(`${apiUrl}/value`, {
        params: { key: key },
        headers: headers
      });
      if (response.status === 200) {
        return response.data.data;
      } else if (response.status === 404) {
        console.warn(`Key not found: ${key}`);
        return null; // Return null if key is not found
      } else {
        throw new Error(`Failed to fetch key: ${key}, Status: ${response.statusText} ${response.data}`);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        console.warn(`Key not found: ${key}`);
        return null; // Return null if key is not found
      }
      console.error(err);
      throw new Error(`Failed to fetch key ${key}: ${err}`);
    }
  };

  try {
    const keys = [
      'ETHERSCAN_API_KEYS',
      'OPTIMISTIC_ETHERSCAN_API_KEYS',
      'BSCSCAN_API_KEYS',
      'POLYGONSCAN_API_KEYS',
      'FANTOMSCAN_API_KEYS',
      'ARBISCAN_API_KEYS',
      'SNOWTRACE_API_KEYS',
      'ZENCHAIN_API_KEY',
      'ETHERSCAN_METADATA_TOKEN',
      'ZETTABLOCK_API_KEY'
    ];

    const results = await Promise.all(keys.map(fetchKey));
    const notFoundCount = results.filter(result => result === null).length;

    if (notFoundCount === keys.length) {
      throw new Error('All keys returned 404. Something is wrong with the key fetching process.');
    }

    const [
      etherscanApiKeys,
      optimisticEtherscanApiKeys,
      bscscanApiKeys,
      polygonscanApiKeys,
      fantomscanApiKeys,
      arbiscanApiKeys,
      snowtraceApiKeys,
      zenchainApiKeys,
      ETHERSCAN_METADATA_TOKEN,
      ZETTABLOCK
    ] = results;

    return {
      apiKeys: {
        nativeIcePhishing: {
          etherscanApiKeys: etherscanApiKeys ?? [],
          optimisticEtherscanApiKeys: optimisticEtherscanApiKeys ?? [],
          bscscanApiKeys: bscscanApiKeys ?? [],
          polygonscanApiKeys: polygonscanApiKeys ?? [],
          fantomscanApiKeys: fantomscanApiKeys ?? [],
          arbiscanApiKeys: arbiscanApiKeys ?? [],
          snowtraceApiKeys: snowtraceApiKeys ?? [],
          zenchainApiKeys: zenchainApiKeys ?? []
        }
      },
      generalApiKeys: {
        ETHERSCAN_METADATA_TOKEN: ETHERSCAN_METADATA_TOKEN ?? '',
        ZETTABLOCK: ZETTABLOCK ?? []
      }
    };
  } catch (e) {
    console.error(`Error assembling API keys: ${e}`);
    throw new Error(`Failed to assemble API keys: ${e}`);
  }
};
