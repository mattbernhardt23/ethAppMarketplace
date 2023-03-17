import { handler as useAccount } from "./useAccount";
import { handler as useNetwork } from "./useNetwork";
import { handler as useOwnedCourses } from "./useOwnedCourses";
import { handler as useOwnedCourse } from "./useOwnedCourse";
import { handler as useManagedCourses } from "./useManagedCourses";

export const useSetupHooks = ({ web3, contract, provider }) => {
  return {
    useAccount: useAccount(web3, provider),
    useNetwork: useNetwork(web3),
    useOwnedCourses: useOwnedCourses(web3, contract),
    useOwnedCourse: useOwnedCourse(web3, contract),
    useManagedCourses: useManagedCourses(web3, contract),
  };
};
