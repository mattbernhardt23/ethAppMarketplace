import { CourseList, Card } from "@components/ui/course"
import { Button } from "@components/ui/common"
import { MarketHeader } from "@components/ui/marketplace"
import { OrderModal } from "@components/ui/order"
import { getAllCourses } from "@content/courses/fetcher"
import { useState } from 'react'

export default function Marketplace({courses}) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  
  
  // const canPurchse = !!(account.data && network.data)
  
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
