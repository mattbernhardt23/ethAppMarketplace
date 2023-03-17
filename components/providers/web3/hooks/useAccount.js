import { useEffect } from "react";
import useSWR from "swr";
// This is a function that calls a function. I think this has something to do with hooks, I'm not sure.

const adminAddresses = {
  "0xe95fb13e8306ea1dccaff378b00af2cbc153f66665d11c77bf216c3f92160015": true,
  "0x23e901d1733896b47d22a33a84108b2c6a24789c82e9db693a014ecd2b03a1b7": true,
};

export const useAccount = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      const account = accounts[0];
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
  }, [provider]);

  return {
    data,
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};
