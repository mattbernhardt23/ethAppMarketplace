import { useAccount } from "./useAccount"
import { useNetwork } from "./useNetwork"
import { useEthPrice } from "./useEthPrice"
import { useOwnedCourses } from "./useOwnedCourses"

 
export const setupHooks = (...deps) => {

    return {
        useAccount: useAccount(...deps),
        useNetwork: useNetwork(...deps),
        useEthPrice: useEthPrice(...deps),
        useOwnedCourses: useOwnedCourses(...deps)
    }
}