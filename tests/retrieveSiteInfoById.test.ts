import * as findSiteInfo from "../retrieveSiteInfoById";
import axios from "axios";
const axiosGetMock = jest.spyOn(axios, "get");
const { retrieveSiteInfoByID } = findSiteInfo;

const baseUrl: string =
  "https://api.krakenflex.systems/interview-tests-mock-api/v1";
const badUrl: string = "https://flex.systems/interview-tests-mock-api/v1";

describe("Retrieve site info by ID", () => {
  test("Successfully retrieves outages if url is correct", async () => {
    const siteInfo = {
      id: "norwich-pear-tree",
      name: "Norwich Pear Tree",
      devices: [
        { id: "111183e7-fb90-436b-9951-63392b36bdd2", name: "Battery 1" },
      ],
    };
    const resp = { data: siteInfo };
    axiosGetMock.mockResolvedValue(resp);
    return retrieveSiteInfoByID(baseUrl, "norwich-pear-tree").then((data) =>
      expect(data).toEqual(siteInfo)
    );
  });

  test("Throws error if url if bad url is passed", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "error" }, status: 400 },
    });
    await expect(
      retrieveSiteInfoByID(badUrl, "norwich-pear-tree")
    ).rejects.toThrow("error");
  });
});
