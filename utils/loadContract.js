const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;
import Artifact from "../public/contracts/CourseMarketplace.json";

export const loadContract = async (name, web3) => {
  console.log("Does this even fucking run?");
  // Fetch the contract from our public folder
  // const res = await fetch(`/contracts/${name}.json`);
  // console.log(res, "res");
  // // We then get the Artifact from the res.JSON
  // const Artifact = await res.json();

  console.log("artifact", Artifact);
  let contract = null;

  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );
  } catch {
    console.log(`Contract ${name} Cannot Be Loaded`);
  }

  return contract;
};
