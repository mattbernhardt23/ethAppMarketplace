import { Hero, Button, About, FAQ, ReviewSlideshow, TrendingSlideshow } from "@components/ui/common"
import { getAllCourses } from "@content/courses/fetcher"
import { getAllReviews } from "@content/courses/reviewFetcher"


export default function Home({courses, reviews}) {
  
  return (  
          <div>
            <Hero />
            <About />
            <TrendingSlideshow
              items={courses} 
            />
            <FAQ />
            <ReviewSlideshow
              items={reviews} 
            />
          </div>
     )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  const {reviewData} = getAllReviews()
  
  return {
    props: {
      courses: data,
      reviews: reviewData
    }
  }
}


