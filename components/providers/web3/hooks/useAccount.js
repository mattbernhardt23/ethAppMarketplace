import { useEffect } from "react";
import useSWR from "swr";

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();

      const account = accounts[0];
      // const signer = provider.getSigner();

      // // Get the account address
      // const account = await signer.getAddress();
      if (!account) {
        throw new Error("Cannot retrieve account. Please refresh the browser");
      }

      return account;
    }
  );

  useEffect(() => {
    // This will mutate the state, meaning, after this call has been made, it won't continue to be made. That's what we are doing in the return,
    const mutator = (accounts) => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);

    return () => {
      // Provide the name of the event we don't want to listen to, and the mutator function that is mutationg the state.
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider, mutate]);

  return {
    data,
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};
