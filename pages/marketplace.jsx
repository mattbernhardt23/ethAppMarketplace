import { CourseList, Card } from "@components/ui/course"
import { Button, Loader, Message} from "@components/ui/common"
import { MarketHeader } from "@components/ui/marketplace"
import { OrderModal } from "@components/ui/order"
import { getAllCourses } from "@content/courses/fetcher"
import { useState } from 'react'
import { useWeb3 } from "@components/providers/"
import { useOwnedCourses, useWalletInfo } from "@components/hooks/web3"

export default function Marketplace({courses}) {
  const { web3, contract, requireInstall } = useWeb3()
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo()
  const { ownedCourses } = useOwnedCourses(courses, account.data)
 
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isNewPurchase, setIsNewPurchase] = useState(true)
  
  console.log("from market place", "did this run")

  const purchaseCourse = async (order) => {
    //Returns in Hexidecimal Format the Course Id
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id)

    // We are constructing a hash here the same way we did in our Solidity contract. 
    // The sha3 is essentially the keccak256 function
    const orderHash = web3.utils.soliditySha3(
      {type: "bytes16", value: hexCourseId},
      {type: "address", value: account.data},
    )
    const emailHash = web3.utils.sha3(order.email)
    const proof = web3.utils.soliditySha3(
      {type: "bytes32", value: emailHash},
      {type: "bytes32", value: orderHash},
    )

    // We are taking our price in Eth from our order form and converting it to Wei
    const value = web3.utils.toWei(order.price)

    try {
      const contractCall = await contract.methods.purchaseCourse(
        hexCourseId, proof
      ).send({from: account.data, value })
      return contractCall
    } catch {
      console.log("Purchase Course: Operation Has Failed")
    }
  }
     
  return (  
          <>
            <MarketHeader />
            <CourseList 
              courses={courses} 
            >
              {course => {
                const owned = ownedCourses.lookup[course.id]
                return (
                  <Card 
                  key={course.id}
                  course={course}
                  state={owned?.state}
                  disabled={!hasConnectedWallet}
                  Footer={() => {
                    if (requireInstall) {
                      return (
                        <Button
                          size="sm"
                          disabled={true}
                          variant="lightPurple">
                          Install
                        </Button>
                      )
                    }

                    if (isConnecting) {
                      return (
                        <Button
                          size="sm"
                          disabled={true}
                          variant="lightPurple">
                          <Loader size="sm" />
                        </Button>
                      )
                    }

                    if (!ownedCourses.hasInitialResponse) {
                      //The empty div makes it so we go from a loading state to the owned button.
                      return (
                        <div style={{height: "42px"}}></div>
                      )
                    }
        
                    if (owned) {
                      return (
                      <>
                        <div>
                        <div className="flex">
                        <Button
                          size="sm"
                          disabled={true}
                          variant="white">
                          Yours &#1004;
                        </Button>
                        { owned.state === "deactivated" &&
                        <Button
                          size="sm"
                          disabled={false}
                          onClick={() => {
                            setIsNewPurchase(false)
                            setSelectedCourse(course)
                          }
                          }
                          variant="purple">
                          Fund to Activate
                        </Button>
                      }
                      </div>
                    </div>
                  </>
                )
              }
              return (
                <Button
                  size="sm"
                  onClick={() => setSelectedCourse(course)}
                  disabled={!hasConnectedWallet}
                  variant="cyan">
                  Purchase
                </Button>
              )}
            }
          />
        )}
      }
            </CourseList>
            <OrderModal 
              course={selectedCourse}
              onClose={() => setSelectedCourse(null)}
              onSumbit={(formData, course) => purchaseCourse(formData, course)}
            />
          </>
     )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  
  return {
    props: {
      courses: data
    }
  }
}
