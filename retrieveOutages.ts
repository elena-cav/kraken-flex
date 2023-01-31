import axios from "axios";
import { load } from "ts-dotenv";
import { Outage } from "./types";
const env = load({
  API_KEY: String,
});

const config = {
  headers: {
    "x-api-key": env.API_KEY,
  },
};

const retrieveOutages = async (baseUrl: string) => {
  try {
    const { data } = await axios.get<Outage[]>(`${baseUrl}/outages`, config);
    return data;
  } catch ({ response }) {
    const message = response.data.message;
    const status = response.status;
    throw new Error(`Status code ${status}: ${message}`);
  }
};

export default retrieveOutages;
