import { Outage, SiteInfo } from "../types";
import { retrieveOutages } from "./retrieveOutages";
import { retrieveSiteInfoByID } from "./retrieveSiteInfoById";

export const filterOutages = async (
  baseUrl: string,
  id: string
): Promise<Outage[]> => {
  const outages: Outage[] = await retrieveOutages(baseUrl);
  const { devices }: SiteInfo = await retrieveSiteInfoByID(baseUrl, id);
  const cutOffDate: number = Date.parse("2022-01-01T00:00:00.000Z");
  const filteredOutages: Outage[] = outages
    .filter((outage: Outage) => {
      const parsedBeginDate = Date.parse(outage.begin);
      const isAfterCutOffDate = parsedBeginDate >= cutOffDate;
      const isFound = devices.some(({ id }) => id === outage.id);
      return isAfterCutOffDate && isFound;
    })
    .map((outage: Outage) => {
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
