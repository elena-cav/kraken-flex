import { filterOutages } from ".";
import retrieveOutages from "./retrieveOutages";
import retrieveSiteInfoByID from "./retrieveSiteInfoById";
import axios from "axios";
jest.mock("axios");

const baseUrl: string =
  "https://api.krakenflex.systems/interview-tests-mock-api/v1";
const badUrl: string = "https://flex.systems/interview-tests-mock-api/v1";

describe("Retrieve Outages", () => {
  test("Successfully retrieves outages if url is correct", async () => {
    const outages = [
      {
        id: "de6b0b1c-fd20-43ea-a071-8b602ce23b4b",
        begin: "2022-08-11T00:36:07.098Z",
        end: "2022-08-22T05:06:29.857Z",
      },
    ];
    const resp = { data: outages };
    (axios.get as jest.Mock).mockResolvedValue(resp);
    return retrieveOutages(baseUrl).then((data) =>
      expect(data).toEqual(outages)
    );
  });

  test("Throws error if url if bad url is passed", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "error" }, status: 400 },
    });
    await expect(retrieveOutages(badUrl)).rejects.toThrow("error");
  });
});

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
    (axios.get as jest.Mock).mockResolvedValue(resp);
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

describe.skip("Filter outages", () => {
  // https://medium.com/welldone-software/jest-how-to-mock-a-function-call-inside-a-module-21c05c57a39f
  test("first", async () => {
    const outages = [
      {
        id: "de6b0b1c-fd20-43ea-a071-8b602ce23b4b",
        begin: "2022-08-11T00:36:07.098Z",
        end: "2022-08-22T05:06:29.857Z",
      },
    ];
    const outagesResp = { data: outages };
    (axios.get as jest.Mock).mockResolvedValue(outagesResp);
    const siteInfo = {
      id: "norwich-pear-tree",
      name: "Norwich Pear Tree",
      devices: [
        { id: "111183e7-fb90-436b-9951-63392b36bdd2", name: "Battery 1" },
      ],
    };
    const siteInfoResp = { data: siteInfo };
    (axios.get as jest.Mock).mockResolvedValue(siteInfoResp);

    // const spy = jest.spyOn(retrieveOutages, "retrieveOutages");
    // spy.mockReturnValue(outages);

    // // const response = await filterOutages(baseUrl, "norwich-pear-tree");
    // console.log(response);
  });
});

// describe("Post outages", () => {
//   test("first", () => {});
// });
