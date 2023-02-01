import axios, { AxiosResponse } from "axios";
import { load } from "ts-dotenv";
import { filterOutages } from "./helpers/filterOutages";
const env = load({
  API_KEY: String,
});

const config = {
  headers: {
    "x-api-key": env.API_KEY,
  },
};

export const postOutages = async (
  baseUrl: string,
  id: string
): Promise<string> => {
  const filteredOutages = await filterOutages(baseUrl, id);
  try {
    const { status, statusText } = await axios.post<AxiosResponse>(
      `${baseUrl}/site-outages/${id}`,
      filteredOutages,
      config
    );
    console.log(`Status: ${statusText}, Status Code: ${status}`);
    return `Status: ${statusText}, Status Code: ${status}`;
  } catch ({ response }) {
    const message = response.data.message;
    const status = response.status;
    throw new Error(`Status code ${status}: ${message}`);
  }
};

const base: string =
  "https://api.krakenflex.systems/interview-tests-mock-api/v1";

postOutages(base, "norwich-pear-tree");
