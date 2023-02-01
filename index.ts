import { postOutages } from "./helpers/postOutages";
const base: string =
  "https://api.krakenflex.systems/interview-tests-mock-api/v1";
const id: string = "norwich-pear-tree";
const runApp = async () => {
  const result = await postOutages(base, id);
  console.log(result);
};

runApp();
