import Image from "next/image"
import Link from "next/link"


export default function TrendingCard(course) {
  course = course.course

  return (
    <div
    className="flex flex-col bg-white border-gray border-2
      w-[40vw] md:w-[30vw] lg:w-[23vw] rounded-xl shadow-md mx-8 overflow-hidden md:max-w-2xl">
    <div className="flex flex-col h-full">
      <div className="relative h-[35vh]">
        <Image
          className={`object-cover`}
          src={course.coverImage}
          priority
          fill={true}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          // width="300"
          // height="300"
          alt={course.title}
        />
      </div>
    
      <div className="p-4">
      <div className="flex flex-col">
          <div
            className="uppercase mr-2 tracking-wide text-xs md:text-sm text-cyan-500 font-semibold">
            {course.type}
          </div>
          
         </div> 
        <Link 
          href={`/courses/${course.slug}`}
          legacyBehavior  
        >
          <a
            className="h-12 block lg:mt-2 lg:mb-4 text-sm sm:text-lg leading-tight font-medium text-gray-700 hover:underline"
          >
            {course.title}
          </a>
        </Link>
        <p
           className="pb-4 text-sm md:text-base text-gray-500">
          {course.description?.substring(0, 120)}...
          
        </p>
      </div>
    </div>
  </div>
)
}
