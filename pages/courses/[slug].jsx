import { Button } from '@components/ui/common'
import { CourseHero, Curriculum, Keypoints } from '@components/ui/course'
import { getAllCourses } from "@content/courses/fetcher"
import { useOwnedCourse, useWalletInfo } from "@components/hooks/web3"
import { useWeb3 } from '@components/providers'
import { OrderModal } from "@components/ui/order"
import { useState } from 'react'


export default function Course({course}) {
    const { isLoading, web3, contract, requireInstall } = useWeb3()
    const { hasConnectedWallet, account } = useWalletInfo()
    const { ownedCourse } = useOwnedCourse(course, account.data)
    const courseState = ownedCourse.data?.state
    

    const [selectedCourse, setSelectedCourse] = useState(null)

    const purchaseCourse = async (order) => {
      
      const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id)
  
      const orderHash = web3.utils.soliditySha3(
        {type: "bytes16", value: hexCourseId},
        {type: "address", value: account.data},
      )
      const emailHash = web3.utils.sha3(order.email)
      const proof = web3.utils.soliditySha3(
        {type: "bytes32", value: emailHash},
        {type: "bytes32", value: orderHash},
      )
  
    
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

    const isLocked = 
        !courseState ||
        courseState === "purchased" || 
        courseState === "deactivated"

    return (
        <>
            <div className="py-4">
                <CourseHero 
                    course={course}
                    title={course.title}
                    description={course.description}
                    image={course.coverImage}
                    hasOwner={!!ownedCourse.data}
                />
                {!ownedCourse.data &&
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    disabled={!hasConnectedWallet}
                  >
                    Purchase Course Now 
                  </Button>
                }
            </div>
            <Keypoints 
                points = {course.wsl}
            />
            <Curriculum 
                course={course}
                isLoading={isLoading}
                locked={isLocked}
                courseState={courseState}
            />
            <OrderModal 
              course={selectedCourse}
              onClose={() => setSelectedCourse(null)}
              onSumbit={(formData, course) => purchaseCourse(formData, course)}
            />      
        </>
    )
}

export function getStaticPaths() {
    const { data } = getAllCourses()
    
    return {
        paths: data.map(c => ({
            params: {
                slug: c.slug
            }
        })),
        fallback: false,
    }
}

export function getStaticProps({params}) {
    const { data } = getAllCourses()
    const course = data.filter(c => c.slug === params.slug)[0]
  
    return {
      props: {
        course
      }
    }
  }
  
