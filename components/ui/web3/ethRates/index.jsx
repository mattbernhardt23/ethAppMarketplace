import Image from "next/image"
import { useEthPrice, COURSE_PRICE } from "@components/web3/hooks/useEthPrice"
import { Loader } from "@components/ui/common"



export default function EthRates() {
  const { eth, perItem } = useEthPrice()

    //console.log(eth)
    return (
      <div className="grid grid-cols-4 mb-5">
        <div className="flex flex-1 items-stretch text-center">
          <div className="p-10 border drop-shadow rounded-md">
            {/* <div>
              <span className="text-2xl font-bold">ETH = ${ethPrice}</span> */}

            <div className="flex items-center">
            { !eth ?
            <Loader size="md"/> :
            <>
              <Image
                height="35"
                width="35"
                src="/ethIcon.png"
                alt="ethicon"
              />
              <span className="text-2xl font-bold">
                = ${eth}
              </span>
            </>
            }
            </div>
            <p className="text-xl text-gray-500">Current eth Price</p>
          </div>
        </div>
        <div className="flex flex-1 items-stretch text-center">
          <div className="p-10 border drop-shadow rounded-md">
          { eth ?
              <>
                <span className="text-2xl font-bold">
                  {perItem}
                </span>
                <Image
                  height="35"
                  width="35"
                  src="/ethIcon.png"
                  alt="ethicon"
                />
                <span className="text-2xl font-bold">
                  = {COURSE_PRICE}$
                </span>
              </> :
              <div className="w-full flex justify-center">
                <Loader size="md" />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }