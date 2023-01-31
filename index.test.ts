import { retrieveOutages } from ".";
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
    (axios.get as jest.Mock).mockRejectedValueOnce("error");
    jest.spyOn(axios, "get").mockRejectedValue(new Error("error"));
    await expect(retrieveOutages(badUrl)).rejects.toThrow("error");
  });
});

describe("Retrieve site info by ID", () => {
  test("first", () => {});
});

describe("Filter outages", () => {
  test("first", () => {});
});

describe("Display name", () => {
  test("first", () => {});
});
describe("Post outages", () => {
  test("first", () => {});
});
