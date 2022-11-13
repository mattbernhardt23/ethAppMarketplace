import { useHooks } from "@components/providers/web3"


export const useEthPrice = () => {
    return useHooks((hooks) => hooks.useEthPrice)()
}