import { useAccount } from "./useAccount"
import { useNetwork } from "./useNetwork"
import { useOwnedCourses } from "./useOwnedCourses"
import { useOwnedCourse } from "./useOwnedCourse"
import { useManagedCourses } from "./useManagedCourses"

 
export const setupHooks = ({web3, contract, provider}) => {

    return {
        useAccount: useAccount(web3, provider),
        useNetwork: useNetwork(web3),
        useOwnedCourses: useOwnedCourses(web3, contract),
        useOwnedCourse: useOwnedCourse(web3, contract),
        useManagedCourses: useManagedCourses(web3, contract)
    }
}
