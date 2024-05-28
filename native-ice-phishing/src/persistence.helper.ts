import * as dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import { getSecrets, apiKeys } from "./storage";

export class PersistenceHelper {
  databaseUrl;

  constructor(dbUrl: string) {
    this.databaseUrl = dbUrl;
  }

  async persist(value: any, key: string) {
    const apiKeys = (await getSecrets()) as apiKeys;
    const headers = {
      Authorization: `Basic ${apiKeys.generalApiKeys.REDIS_BASIC_AUTH}`,
    };
    try {
      const response = await fetch(`${this.databaseUrl}/SET/${key}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(value),
      });

      if (response.ok) {
        console.log(`Successfully persisted data to key: ${key}`);
        return;
      } else {
        console.log(
          `Failed to persist data. Status: ${response.status}, Status Text: ${response.statusText}`
        );
      }
    } catch (e) {
      console.log(`Failed to persist value to database. Error: ${e}`);
    }
  }

  async load(key: string) {
    const apiKeys = (await getSecrets()) as apiKeys;
    const headers = {
      Authorization: `Basic ${apiKeys.generalApiKeys.REDIS_BASIC_AUTH}`,
    };
    try {
      const response = await fetch(`${this.databaseUrl}/GET/${key}.bin`, {
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Successfully fetched data from key: ${key}`);
        return data;
      } else {
        console.log(
          `Failed to fetch data. Key: ${key}, Status: ${response.status}, Status Text: ${response.statusText}`
        );
        return key.includes("alerted") ? [] : {};
      }
    } catch (e) {
      console.log(`Error in fetching data. Error: ${e}`);
      throw e;
    }
  }
}
