import * as dotenv from "dotenv";
import axios from 'axios';
import { fetchJwt } from '@fortanetwork/forta-bot';
dotenv.config();

export class PersistenceHelper {
  apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async persist(value: any, key: string) {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    if (process.env.NODE_ENV === "production") {
      const token = await fetchJwt({ key: "value" }, new Date(Date.now() + 5000));
      // @ts-ignore
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await axios.post(`${this.apiUrl}/store`, {
        key: key,
        value: value
      }, { headers: headers });

      if (response.status === 200) {
        console.log(`Successfully persisted data to key: ${key}`);
      } else {
        console.error(
          `Failed to persist data. Status: ${response.status}, Status Text: ${response.statusText}`
        );
      }
    } catch (e: any) {
      console.error(`Failed to persist value to database. Error: ${e.message}`);
    }
  }

  async load(key: string) {
    const headers = {
      "Accept": "application/json"
    };

    if (process.env.NODE_ENV === "production") {
      const token = await fetchJwt({ key: "value" }, new Date(Date.now() + 5000));
      // @ts-ignore
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await axios.get(`${this.apiUrl}/store`, {
        params: { key: key },
        headers: headers
      });

      if (response.status === 200) {
        console.log(`Successfully fetched data from key: ${key}`);
        return response.data.data;
      } else if (response.status === 404) {
        console.warn(`Key ${key} not found, returning an empty array.`);
        return [];
      } else {
        console.error(
          `Failed to fetch data. Key: ${key}, Status: ${response.status}, Status Text: ${response.statusText}`
        );
        return key.includes("alerted") ? [] : {};
      }
    } catch (e: any) {
      if (e.response && e.response.status === 404) {
        console.warn(`Key ${key} not found, returning an empty array.`);
        return [];
      }
      console.error(`Error in fetching data. Error: ${e.message}`);
      throw e;
    }
  }
}