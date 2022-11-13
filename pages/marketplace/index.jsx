import { CourseList, Card } from "@components/ui/course"
import { Button } from "@components/ui/common"
import { MarketHeader } from "@components/ui/marketplace"
import { OrderModal } from "@components/ui/order"
import { getAllCourses } from "@content/courses/fetcher"
import { useState } from 'react'
import { useWeb3 } from "@components/providers/"
import { useAccount } from "@components/web3/hooks/useAccount"

export default function Marketplace({courses}) {
  const { web3, contract } = useWeb3()
  const { account } = useAccount()
  const [selectedCourse, setSelectedCourse] = useState(null)
  
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
              {course => 
                <Card 
                  key={course.id}
                  course={course}
                  Footer={() => 
                    <div>
                      <Button
                        onClick={() => setSelectedCourse(course)}
                        // disabled={!canPurchse}
                      >
                        Purchase
                      </Button>
                    </div>
                  }
                />
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
