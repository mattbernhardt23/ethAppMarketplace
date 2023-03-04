const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name, web3) => {
  // Fetch the contract from our public folder
  const res = await fetch(`/contracts/${name}.json`);
  // We then get the Artifact from the res.JSON
  const Artifact = await res.json();

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

// Quick note: using the truffle package sends a very large file. That's why we access the web3.eth.Contract method directly, instead of creating an instance of the TruffleContract.
