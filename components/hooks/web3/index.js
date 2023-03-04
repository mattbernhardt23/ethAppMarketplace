import { useHooks } from "@components/providers/web3"
import { useEffect } from "react"
import { useWeb3 } from "@components/providers"
import { useRouter } from "next/router"


// If _isEmpty returns true, then there is no data in the return. So, if one of the following checks returns true, then theis check returns true. 
const _isEmpty = data => {
    return (
      // Loose check, and will return true on undefined
      data == null ||
      // We then need to check for all the different data types that are returned by our hooks; arrays, objects, strings, etc. 
      data === "" ||
      (Array.isArray(data) && data.length === 0) ||
      // Object.keys let's us know if it has returned an empty object
      (data.constructor === Object && Object.keys(data).length === 0)
    )
  }

  // enhanceHook is wrapping all of our hooks, so if there is some data that we would like to share with all of our hooks, this is a great place to pass it down. 
const enhanceHook = swrRes => {
  // simply destructuring the swrRes to make our hasIninitialResponse much clearer.
    const { data, error } = swrRes
    // Double negation is how we get true or false instead of undefined, null or some value. 
    const hasInitialResponse = !!(data || error)
    const isEmpty = hasInitialResponse && _isEmpty(data)
  
    return {
      ...swrRes,
      isEmpty,
      hasInitialResponse
    }
  }

  export const useNetwork = () => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useNetwork)())
    return {
      network: swrRes
    }
  }

  export const useAccount = () => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useAccount)())
    return {
      account: swrRes
    }
  }

  export const useEthPrice = () => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useEthPrice)())
    return {
      account: swrRes
    }
  }
  
  export const useAdmin = ({redirectTo}) => {
    const { account } = useAccount()
    const { requireInstall } = useWeb3()
    const router = useRouter()
  
    useEffect(() => {
      if ((
        requireInstall ||
        account.hasInitialResponse && !account.isAdmin) ||
        account.isEmpty) {
  
        router.push(redirectTo)
      }
    }, [account])
  
    return { account }
  }
  

  export const useOwnedCourses = (...args) => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useOwnedCourses)(...args))
  
    return {
      ownedCourses: swrRes
    }
  }
  
  export const useOwnedCourse = (...args) => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useOwnedCourse)(...args))
  
    return {
      ownedCourse: swrRes
    }
  }

  export const useManagedCourses = (...args) => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useManagedCourses)(...args))
  
    return {
      managedCourses: swrRes
    }
  }
  
  export const useWalletInfo = () => {
    const { account } = useAccount()
    const { network } = useNetwork()
  
    const isConnecting =
     !account.hasInitialResponse &&
     !network.hasInitialResponse
  
    return {
      account,
      network,
      isConnecting,
      hasConnectedWallet: !!(account.data && network.isSupported)
    }
  }

