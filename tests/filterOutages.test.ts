import { filterOutages } from "../filterOutages";
import * as findOutages from "../retrieveOutages";
import * as findSiteInfo from "../retrieveSiteInfoById";
// const axiosGetMock = jest.spyOn(axios, "get");
// const axiosPostMock = jest.spyOn(axios, "post");

const baseUrl: string =
  "https://api.krakenflex.systems/interview-tests-mock-api/v1";
const badUrl: string = "https://flex.systems/interview-tests-mock-api/v1";

describe("Filter outages", () => {
  const outagesSpy = jest.spyOn(findOutages, "retrieveOutages");
  const siteInfoSpy = jest.spyOn(findSiteInfo, "retrieveSiteInfoByID");

  test("Should filter out outages that began before 2022-01-01T00:00:00.000Z ", async () => {
    const outages = [
      {
        id: "e47ccef2-f2b8-43dd-b904-cdb211e6a3ac",
        begin: "2021-03-13T18:28:12.607Z",
        end: "2021-05-09T15:03:57.509Z",
      },
      {
        id: "e706dc4d-7b7f-412c-a61c-f3a362835c1a",
        begin: "2022-10-14T05:45:54.180Z",
        end: "2022-03-30T18:50:32.255Z",
      },
    ];
    const siteInfo = {
      id: "norwich-pear-tree",
      name: "Norwich Pear Tree",
      devices: [
        { id: "e706dc4d-7b7f-412c-a61c-f3a362835c1a", name: "Battery 1" },
        { id: "86b5c819-6a6c-4978-8c51-a2d810bb9318", name: "Battery 2" },
      ],
    };
    outagesSpy.mockResolvedValue(outages);
    siteInfoSpy.mockResolvedValue(siteInfo);

    const response = await filterOutages(baseUrl, "norwich-pear-tree");
    expect(response).toEqual([
      {
        id: "e706dc4d-7b7f-412c-a61c-f3a362835c1a",
        begin: "2022-10-14T05:45:54.180Z",
        end: "2022-03-30T18:50:32.255Z",
        name: "Battery 1",
      },
    ]);
  });
  test("Should filter out outages that don't match devices id", async () => {
    const outages = [
      {
        id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
        begin: "2022-03-13T18:28:12.607Z",
        end: "2022-05-09T15:03:57.509Z",
      },
      {
        id: "d506dc4d-7b7f-412c-a61c-f3a362835c1a",
        begin: "2022-10-14T05:45:54.180Z",
        end: "2022-03-30T18:50:32.255Z",
      },
    ];
    const siteInfo = {
      id: "norwich-pear-tree",
      name: "Norwich Pear Tree",
      devices: [
        { id: "e706dc4d-7b7f-412c-a61c-f3a362835c1a", name: "Battery 1" },
        { id: "86b5c819-6a6c-4978-8c51-a2d810bb9318", name: "Battery 2" },
      ],
    };
    outagesSpy.mockResolvedValue(outages);
    siteInfoSpy.mockResolvedValue(siteInfo);
    const response = await filterOutages(baseUrl, "norwich-pear-tree");
    expect(response).toEqual([
      {
        id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
        begin: "2022-03-13T18:28:12.607Z",
        end: "2022-05-09T15:03:57.509Z",
        name: "Battery 2",
      },
    ]);
  });
  test("Should attach display name to remaining device", async () => {
    const outages = [
      {
        id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
        begin: "2022-03-13T18:28:12.607Z",
        end: "2022-05-09T15:03:57.509Z",
      },
    ];
    const siteInfo = {
      id: "norwich-pear-tree",
      name: "Norwich Pear Tree",
      devices: [
        { id: "86b5c819-6a6c-4978-8c51-a2d810bb9318", name: "Battery 3" },
      ],
    };
    outagesSpy.mockResolvedValue(outages);
    siteInfoSpy.mockResolvedValue(siteInfo);
    const response = await filterOutages(baseUrl, "norwich-pear-tree");
    expect(response).toEqual([
      {
        id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
        begin: "2022-03-13T18:28:12.607Z",
        end: "2022-05-09T15:03:57.509Z",
        name: "Battery 3",
      },
    ]);
  });
  test("Should filter and update multiple outages", async () => {
    const outages = [
      {
        id: "e47ccef2-f2b8-43dd-b904-cdb211e6a3ac",
        begin: "2022-03-13T18:28:12.607Z",
        end: "2022-05-09T15:03:57.509Z",
      },
      {
        id: "e706dc4d-7b7f-412c-a61c-f3a362835c1a",
        begin: "2021-10-14T05:45:54.180Z",
        end: "2022-03-30T18:50:32.255Z",
      },
      {
        id: "e7e30ecd-ce06-41ec-b8d8-d50f84294508",
        begin: "2022-01-26T15:49:53.082Z",
        end: "2022-07-23T10:29:32.331Z",
      },
      {
        id: "e83fe0d1-48b9-4e89-a997-373ba4859111",
        begin: "2022-07-07T04:23:24.660Z",
        end: "2022-09-29T03:20:59.711Z",
      },
    ];

    const siteInfo = {
      id: "norwich-pear-tree",
      name: "Norwich Pear Tree",
      devices: [
        { id: "e7e30ecd-ce06-41ec-b8d8-d50f84294508", name: "Battery 1" },
        { id: "e83fe0d1-48b9-4e89-a997-373ba4859111", name: "Battery 2" },
        { id: "70656668-571e-49fa-be2e-099c67d136ab", name: "Battery 3" },
        { id: "9ed11921-1c5b-40f4-be66-adb4e2f016bd", name: "Battery 4" },
      ],
    };
    outagesSpy.mockResolvedValue(outages);
    siteInfoSpy.mockResolvedValue(siteInfo);
    const response = await filterOutages(baseUrl, "norwich-pear-tree");
    expect(response).toEqual([
      {
        id: "e7e30ecd-ce06-41ec-b8d8-d50f84294508",
        begin: "2022-01-26T15:49:53.082Z",
        end: "2022-07-23T10:29:32.331Z",
        name: "Battery 1",
      },
      {
        id: "e83fe0d1-48b9-4e89-a997-373ba4859111",
        begin: "2022-07-07T04:23:24.660Z",
        end: "2022-09-29T03:20:59.711Z",
        name: "Battery 2",
      },
    ]);
  });

  test("Should keep all valid outages with identical id", async () => {
    const outages = [
      {
        id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
        begin: "2022-02-16T07:01:50.149Z",
        end: "2022-10-03T07:46:31.410Z",
      },
      {
        id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
        begin: "2022-05-09T04:47:25.211Z",
        end: "2022-12-02T18:37:16.039Z",
      },
      {
        id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
        begin: "2021-10-24T02:46:52.779Z",
        end: "2023-04-25T00:04:34.178Z",
      },
    ];
    const siteInfo = {
      id: "norwich-pear-tree",
      name: "Norwich Pear Tree",
      devices: [
        {
          id: "111183e7-fb90-436b-9951-63392b36bdd2",
          name: "Battery 1",
        },
        {
          id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
          name: "Battery 2",
        },
      ],
    };
    outagesSpy.mockResolvedValue(outages);
    siteInfoSpy.mockResolvedValue(siteInfo);
    const response = await filterOutages(baseUrl, "norwich-pear-tree");
    expect(response).toEqual([
      {
        id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
        begin: "2022-02-16T07:01:50.149Z",
        end: "2022-10-03T07:46:31.410Z",
        name: "Battery 2",
      },
      {
        id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
        begin: "2022-05-09T04:47:25.211Z",
        end: "2022-12-02T18:37:16.039Z",
        name: "Battery 2",
      },
    ]);
  });
});
