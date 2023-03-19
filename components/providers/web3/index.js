const {
  useContext,
  createContext,
  useEffect,
  useState,
  useMemo,
} = require("react");
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "@utils/loadContract";
import Web3 from "web3";
import { useSetupHooks } from "./hooks/setupHooks";

const Web3Context = createContext();

const setListeners = (provider) => {
  provider.on("chainChanged", (_) => window.location.reload());
};

const CreateWeb3State = ({ web3, provider, contract, isLoading }) => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: useSetupHooks({ web3, provider, contract }),
  };
};

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState(
    CreateWeb3State({
      provider: null,
      web3: null,
      contract: null,
      isLoading: false,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      console.log("provider", provider);
      if (provider) {
        const web3 = new Web3(provider);
        console.log("web3", web3);
        const contract = await loadContract("CourseMarketplace", web3);
        setListeners(provider);
        setWeb3Api(
          CreateWeb3State({
            provider,
            web3,
            contract,
            isLoading: false,
          })
        );
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.log("Please Install Metamask.");
      }
    };

    loadProvider();
  }, []);

  // Seperating our state and additional functionality, such as our connect function and checking to see if Metamask has been installed.
  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              // Opens Metamask
              await provider.request({ method: "eth_requestAccounts" });
            } catch {
              console.log("Cannot Access Account");
            }
          }
        : () => console.log("Not Connected to Metamask"),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks(cb) {
  const { hooks } = useWeb3();

  return cb(hooks);
}
