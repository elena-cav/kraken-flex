import axios from "axios";
import { load } from "ts-dotenv";
import { SiteInfo } from "../types";
const env = load({
  API_KEY: String,
});

const config = {
  headers: {
    "x-api-key": env.API_KEY,
  },
};

export const retrieveSiteInfoByID = async (baseUrl: string, id: string) => {
  try {
    const { data } = await axios.get<SiteInfo>(
      `${baseUrl}/site-info/${id}`,
      config
    );
    return data;
  } catch ({ response }) {
    const message = response.data.message;
    const status = response.status;
    throw new Error(`Status code ${status}: ${message}`);
  }
};
