import axios from "axios";
import { load } from "ts-dotenv";

const env = load({
  API_KEY: String,
});

const config = {
  headers: {
    "x-api-key": env.API_KEY,
  },
};

type Outage = {
  id: string;
  begin: string;
  end: string;
};
export const retrieveOutages = async (baseUrl: string) => {
  try {
    const { data } = await axios.get<Outage[]>(`${baseUrl}/outages`, config);
    console.log(data);
    return data;
  } catch (e) {
    throw new Error(`Error retrieving outages: ${e}`);
  }
};
