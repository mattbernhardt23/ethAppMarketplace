import { OwnedCourseCard, CourseFilter } from "@components/ui/course";
import { MarketHeader } from "@components/ui/marketplace";
import { Message, Button } from "@components/ui/common";
import { useOwnedCourses, useAccount } from "@components/hooks/web3"
import { getAllCourses } from "@content/courses/fetcher";
import { useRouter } from "next/router";
import { useWeb3 } from "@components/providers";
import Link from "next/link"

export default function OwnedCourses({courses}) {
  const router = useRouter()
  const { requireInstall } = useWeb3()
  const { account } = useAccount()
  const { ownedCourses } = useOwnedCourses(courses, account.data)
  
 
  return (
    <>
      <section className="grid grid-cols-1">
      { ownedCourses.isEmpty && (
          !ownedCourses.data || ownedCourses?.data.length === 0
        ) &&
          <div className="w-1/2">
            <Message type="warning">
              <div>You don't own any courses</div>
              <Link href="/marketplace" legacyBehavior>
                <a className="font-normal hover:underline">
                  <i>Purchase Course</i>
                </a>
              </Link>
            </Message>
          </div>
      }
      { account.isEmpty &&
          <div className="w-1/2">
            <Message type="warning">
              <div>Please connect to Metamask</div>
            </Message>
          </div>
        }
        { requireInstall &&
          <div className="w-1/2">
            <Message type="warning">
              <div>Please install Metamask</div>
            </Message>
          </div>
        }
      { ownedCourses && ownedCourses.data?.map(course =>
          <OwnedCourseCard
            key={course.id}
            course={course}
          >
          
            <Button
              onClick={() => router.push(`/courses/${course.slug}`)}
              hoverable={true}
            >
              Watch the course
            </Button>
          </OwnedCourseCard>
        )}
      </section>
    </>
  )
}


// This is how we introduce our prop of "courses". Also, don't forget to include this in the params to make it accessible to the function. 
export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}