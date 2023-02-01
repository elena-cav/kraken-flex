import axios from "axios";
const axiosGetMock = jest.spyOn(axios, "get");
import * as findOutages from "../helpers/retrieveOutages";
const { retrieveOutages } = findOutages;

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
        name: "Battery 1",
      },
    ];
    const resp = { data: outages };
    axiosGetMock.mockResolvedValue(resp);
    return retrieveOutages(baseUrl).then((data) =>
      expect(data).toEqual(outages)
    );
  });

  test("Throws error if url if bad url is passed", async () => {
    axiosGetMock.mockRejectedValueOnce({
      response: { data: { message: "error" }, status: 400 },
    });
    await expect(retrieveOutages(badUrl)).rejects.toThrow("error");
  });
});
