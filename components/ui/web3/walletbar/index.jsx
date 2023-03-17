import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button } from "@components/ui/common";
import { EthRates } from "@components/ui/web3";

export default function WalletBar() {
  const { requireInstall } = useWeb3();
  const { account, network } = useWalletInfo();

  return (
    <section>
      <div className="bg-cyan-900 pt-8">
        <div className="px-12">
          <h1 className="pt-4 mb-4 text-6xl text-[#F0CF90] font-bold">
            Find Your Inspiration
          </h1>
          <h2 className="py-4 text-4xl font-bold  text-gray-300 border-b-2 border-[#F0CF90]">
            Peep Inside a Thought Bubble
          </h2>
        </div>
      </div>
      <div className=" h-[20vh] lg:h-[40vh] clip-elipse-top bg-cyan-900 w-full"></div>
      <div className="mx-auto flex flex-col items-center pb-12 lg:pb-20">
            <EthRates />
            <div>
              {network.hasInitialResponse && !network.isSupported && (
                <div className="bg-gray-300 text-red-600 p-4 rounded-lg">
                  <div>Connected to wrong network</div>
                  <div>
                    Connect to: {` `}
                    <strong className="text-2xl">{network.target}</strong>
                  </div>
                </div>
              )}
              {requireInstall && (
                <div className="bg-yellow-500 p-4 rounded-lg">
                  Cannot connect to network. Please install Metamask.
                </div>
              )}
              {network.data && (
                <div className="text-gray-700">
                  <span>Currently on </span>
                  <strong className="text-2xl text-gray-700">
                    {network.data}
                  </strong>
                </div>
              )}
            </div>
          </div>
    </section>
  );
}
