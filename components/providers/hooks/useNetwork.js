import { useEffect } from "react"
import useSWR from "swr"

const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache"
}

export const useNetwork = (web3) => () => {
    const {mutate, ...rest} = useSWR(() => 
        web3 ? "web3/network" : null,
        async () => {
            const netId = await web3.eth.getChainId()
            return NETWORKS[netId]
        }
    )


    useEffect(() => {
        window.ethereum && 
        window.ethereum.on("chainChanged",
            (netId) => mutate(parseInt(netId, 16))
        )
    }, [])

    return  {
        network : {
            mutate,
            ...rest
        }
    }
}