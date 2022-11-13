import { useEffect } from "react"
import useSWR from "swr"
// This is a function that calls a function. I think this has something to do with hooks, I'm not sure.

const adminAddress = {"2c9bf2f1a90dd76c27624e2aa73b0cf32484afbc6bde742aff9aba42fa0ee934": true}

export const useAccount = web3 => () => {
    

    const {data, mutate, ...rest} = useSWR(() => 
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts = await web3.eth.getAccounts()
            return accounts[0]
        }
    )


    useEffect(() => {
        window.ethereum && 
        window.ethereum.on("accountsChanged",
            accounts => mutate(accounts[0]) ?? null
        )
    }, [])

    return  {
        account : {
            data,
            isAdmin:(
                data && 
                adminAddress[web3.utils.keccak256(data)]) ?? false,
            mutate,
            ...rest
        }
    }
} 