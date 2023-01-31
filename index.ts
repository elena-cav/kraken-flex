import axios from "axios";
import { load } from "ts-dotenv";
import { Outage } from "./types";
import retrieveOutages from "./retrieveOutages";
import retrieveSiteInfoByID from "./retrieveSiteInfoById";
const env = load({
  API_KEY: String,
});

const config = {
  headers: {
    "x-api-key": env.API_KEY,
  },
};

export const filterOutages = async (
  baseUrl: string,
  id: string
): Promise<Outage[]> => {
  const outages = await retrieveOutages(baseUrl);
  const { devices } = await retrieveSiteInfoByID(baseUrl, id);

  console.log("outages", outages);
  console.log("devices", devices);

  const cutOffDate = Date.parse("2022-01-01T00:00:00.000Z");
  const filteredOutages = outages
    .filter((outage: Outage) => {
      const parsedBeginDate = Date.parse(outage.begin);
      const isAfterCutOffDate = parsedBeginDate > cutOffDate;
      const isFound = devices.some((el) => el.id === outage.id);
      return isAfterCutOffDate && isFound;
    })
    .map((outage) => {
      devices.forEach((device) => {
        if (device.id === outage.id) {
          outage.name = device.name;
        }
        return outage;
      });
      return outage;
    });

  return filteredOutages;
};

export const postOutages = async (baseUrl: string, id: string) => {
  const filteredOutages = await filterOutages(baseUrl, id);
  try {
    const { data } = await axios.post(
      `${baseUrl}/site-outages/${id}`,
      filteredOutages,
      config
    );
    return data;
  } catch ({ response }) {
    const message = response.data.message;
    const status = response.status;
    throw new Error(`Status code ${status}: ${message}`);
  }
};

const base: string =
  "https://api.krakenflex.systems/interview-tests-mock-api/v1";
