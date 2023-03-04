import Image from "next/image"
import { useEthPrice, COURSE_PRICE } from "@components/providers/web3/hooks/useEthPrice"
// import { useEthPrice } from "@components/hooks/web3"
import { Loader } from "@components/ui/common"


export default function EthRates() {
  const { eth, perItem } = useEthPrice()
  // console.log(eth)

    return (
      <div className="flex flex-col xs:flex-row text-center">
      <div className="p-6 border drop-shadow rounded-md mr-2">
        <div className="flex items-center justify-center">
          { eth ?
            <>
              <Image
                height="35"
                width="35"
                src="/ethIcon.png"
                alt="ethIcon"
              />
              <span className="text-xl font-bold">
                = ${eth}
              </span>
            </> :
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          }
          </div>
          <p className="text-lg text-gray-500">Current eth Price</p>
        </div>
        <div className="p-6 border drop-shadow rounded-md">
        <div className="flex items-center justify-center">
          { eth ?
            <>
              <span className="text-xl font-bold">
                {perItem}
              </span>
              <Image
                height="35"
                width="35"
                src="/ethIcon.png"
                alt="ethIcon"
              />
              <span className="text-xl font-bold">
                = {COURSE_PRICE}$
              </span>
            </> :
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          }
          </div>
          <p className="text-lg text-gray-500">Price per course</p>
        </div>
      </div>
    )
  }