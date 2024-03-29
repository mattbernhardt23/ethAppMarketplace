import Image from "next/image"
import Link from "next/link"
import { AnimateKeyframes } from "react-simple-animate"
  
export default function Card({course, disabled, Footer, state}) {
  return (
    <div
      className="bg-white mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex h-full"> 
          <Image
            className={`object-cover ${disabled && "filter grayscale"}`}
            src={course.coverImage}
            priority
            width="200"
            height="230"
            alt={course.title}
          />
        </div>
      
        <div className="p-8">
        <div className="flex items-center">
            <div
              className="uppercase mr-2 tracking-wide text-sm text-cyan-500 font-semibold">
              {course.type}
            </div>
            <div>
              { state === "activated" &&
                <div className="text-xs text-black bg-green-200 p-1 px-3 rounded-full">
                  Activated
                </div>
              }
              { state === "deactivated" &&
                <div className="text-xs text-black bg-red-200 p-1 px-3 rounded-full">
                  Deactivated
                </div>
              }
              { state === "purchased" &&
                <AnimateKeyframes
                  play
                  duration={2}
                  keyframes={["opacity: 0.2", "opacity: 1"]}
                  iterationCount="infinite"
                >
                  <div className="text-xs text-black bg-yellow-200 p-1 px-3 rounded-full">
                    Pending
                  </div>
                </AnimateKeyframes>
              }
            </div>
           </div> 
          <Link 
            href={`/courses/${course.slug}`}
            legacyBehavior  
          >
            <a
              className="h-12 block mt-1 text-sm sm:text-lg leading-tight font-medium text-gray-700 hover:underline"
            >
              {course.title}
            </a>
          </Link>
          <p
             className="mt-2 text-sm sm:text-base text-gray-500">
            {course.description?.substring(0, 70)}...
            
          </p>
          {
            Footer &&
            <div className="pt-4">
              <Footer />
            </div>
          }
        </div>
      </div>
    </div>
  )
}