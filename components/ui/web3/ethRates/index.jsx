import Image from "next/image";
import {
  useEthPrice,
  COURSE_PRICE,
} from "@components/providers/web3/hooks/useEthPrice";
// import { useEthPrice } from "@components/hooks/web3"
import { Loader } from "@components/ui/common";

export default function EthRates() {
  const { eth, perItem } = useEthPrice();
  // console.log(eth)

  return (
    <div className="flex flex-row justify-around rounded-lg text-gray-800 bg-white p-4 w-fit mb-4">
      
      <div className="flex flex-col items-center mr-6">
      <div className="font-bold text-xl my-auto underline decoration-solid" >Current Eth Price</div>
      <div className="flex flex-row my-auto">
        <Image 
          height="35" 
          width="35" 
          src="/ethIcon.png" 
          alt="ethIcon" 
          className="mr-2"
        />
        <span className="text-xl font-bold my-2">
          = <span className="px-2">${eth ? eth : "Getting Eth Price ..."}</span>
        </span>
      </div>
      </div>
      <div className="flex flex-col items-center">
      <div className="font-bold text-xl my-auto underline decoration-solid">Series Price</div>
      <div className="flex flex-row">
        <Image height="35" width="35" src="/ethIcon.png" alt="ethIcon" />
        <span className="text-xl font-bold my-2">
        <span className="pl-2">{eth ? perItem : "Getting Eth Price ..."}</span>
        </span>
        <span className="text-xl font-bold my-2"> <span className='px-2'>=</span>
        ${COURSE_PRICE}.00</span>
      </div>
      </div>
    </div>
  );
}
