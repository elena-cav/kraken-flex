import { postOutages } from "../helpers/postOutages";
import * as filterFoundOutages from "../helpers/filterOutages";
import axios from "axios";
const axiosPostMock = jest.spyOn(axios, "post");

const baseUrl: string =
  "https://api.krakenflex.systems/interview-tests-mock-api/v1";

describe("Filter outages", () => {
  const filterSpy = jest.spyOn(filterFoundOutages, "filterOutages");

  test("Should receive a success message if posted outages are correct", async () => {
    const filtered = [
      {
        id: "e706dc4d-7b7f-412c-a61c-f3a362835c1a",
        begin: "2022-10-14T05:45:54.180Z",
        end: "2022-03-30T18:50:32.255Z",
        name: "Battery 1",
      },
    ];
    filterSpy.mockResolvedValue(filtered);
    const resp = { statusText: "OK", status: 200 };
    axiosPostMock.mockResolvedValue(resp);
    return postOutages(baseUrl, "norwich-pear-tree").then((data) =>
      expect(data).toEqual("Status: OK, Status Code: 200")
    );
  });
  test("Should throw error if outages are not correct", async () => {
    const filtered = [
      {
        id: "e706dc4d-7b7f-412c-a61c-f3a362835c1a",
        begin: "2022-10-14T05:45:54.180Z",
        end: "2022-03-30T18:50:32.255Z",
      },
    ];
    filterSpy.mockResolvedValue(filtered);
    axiosPostMock.mockRejectedValueOnce({
      response: { data: { message: "error" }, status: 400 },
    });
    await expect(postOutages(baseUrl, "norwich-pear-tree")).rejects.toThrow(
      "error"
    );
  });
  test("Throws 500 error if server error occurs", async () => {
    axiosPostMock.mockRejectedValueOnce({
      response: { data: { message: "Server error" }, status: 500 },
    });
    await expect(postOutages(baseUrl, "norwich-pear-tree")).rejects.toThrow(
      "Server error"
    );
  });
});
