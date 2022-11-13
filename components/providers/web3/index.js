const { useContext, createContext, useEffect, useState, useMemo } = require("react");
import { setupHooks } from "@components/providers/hooks/setupHooks"
import { loadContract } from "@utils/loadContract";
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from "web3";
 
const Web3Context = createContext()

export default function Web3Provider({children}) {
    
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isLoading: false,
        hooks: setupHooks()
    })


    useEffect(() => {
        
        const loadProvider = async () => {
            const provider = await detectEthereumProvider()
            if(provider) {
                const web3 = new Web3(provider)
                const contract = await loadContract("CourseMarketplace", web3)
                setWeb3Api({
                    provider,
                    web3,
                    contract,
                    isLoading: false,
                    hooks: setupHooks(web3, provider)
                })
            } else {
                setWeb3Api(api => ({...api, isLoading}))
                console.log("Please Install Metamask.")
            }

        }

        loadProvider()
    }, [])

    // This extends the functionality of our Web3Api, such as the connect function, but keeping it seperate.
    const _web3Api = useMemo(() => {
        const { web3, provider, isLoading } = web3Api
        return {
            ...web3Api,
            requireInstall: !isLoading && !web3,
            connect: provider ?
            async () => {
                try {
                    await provider.request({method: "eth_requestAccounts"})
                } catch {
                    console.log.error("Cannot Access Account")
                }
             } :
            () => console.log("Not Connected to Metamask")
        }
    }, [web3Api])



    return (
        <Web3Context.Provider value={_web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useWeb3() {
    return useContext(Web3Context)
}

export function useHooks(cb) {
    const { hooks } = useWeb3();
    
    return cb(hooks)
}