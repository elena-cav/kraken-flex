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
type Device = { id: string; name: string };
type SiteInfo = {
  id: string;
  name: string;
  devices: Device[];
};

export const retrieveOutages = async (baseUrl: string) => {
  try {
    const { data } = await axios.get<Outage[]>(`${baseUrl}/outages`, config);
    return data;
  } catch (e) {
    throw new Error(`Error retrieving outages: ${e}`);
  }
};

export const retrieveSiteInfoByID = async (baseUrl: string, id: string) => {
  try {
    const { data } = await axios.get<SiteInfo>(
      `${baseUrl}/site-info/${id}`,
      config
    );
    return data;
  } catch (e) {
    throw new Error(`Error retrieving outages: ${e}`);
  }
};

export const filterOutages = async (baseUrl: string, id: string) => {
  const outages = await retrieveOutages(baseUrl);
  const siteInfo = await retrieveSiteInfoByID(baseUrl, id);
  const cutOffDate = Date.parse("2022-01-01T00:00:00.000Z");
  const filteredOutages = outages.filter((outage: Outage) => {
    const parsedBeginDate = Date.parse(outage.begin);
    const isAfterCutOffDate = parsedBeginDate > cutOffDate;
    const isFound = siteInfo.devices.some((el) => el.id === outage.id);
    return isAfterCutOffDate && isFound;
  });
  console.log(siteInfo);
  console.log(filteredOutages);
};

const base: string =
  "https://api.krakenflex.systems/interview-tests-mock-api/v1";

filterOutages(base, "norwich-pear-tree");
