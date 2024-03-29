import Image from "next/image"

const STATE_COLORS = {
  Purchased: "cyan",
  Activated: "green",
  Deactivated: "red"
}

export default function OwnedCourseCard({children, course}) {

  const stateColor = STATE_COLORS[course?.state]  

  return (
    
    <div className="
    grid grid-cols-3 md:grid-cols-4 bg-white shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="w-full h-full relative">
            <Image
              className="object-cover"
              src={course.coverImage}
              alt="coverImage"
              // height="300"
              // width="300"
              priority
              fill={true}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
      </div>
      <div className="col-span-2 md:col-span-3">  
        <div>
        <div 
           className="px-4 py-5 sm:px-6"
        >
            <h3 
              className="text-lg leading-6 font-medium text-gray-900"
            >
            <span 
              className="mr-2"
            >
              {course.title}
            </span>
              <span 
                className={`text-xs text-${stateColor}-700 bg-${stateColor}-200 rounded-full p-2`}
              >
                {course.state}
              </span>
            </h3>

            </div>

            <div 
              className="border-t border-gray-200"
            >
              <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                <div 
                  className="text-sm font-medium text-gray-500"
                >
                  Descrition
                </div>
                <div 
                  className="mt-1 text-xs md:text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                >
                  {course.description}
                </div>
              </div>
              <div 
                className="bg-white px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6"
              >
                <div 
                  className="text-sm font-medium text-gray-500"
                >
                  Proof
                </div>
                <div 
                  className="mt-1 text-xs md:text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                >
                  {course.proof}
                </div>
              </div>
              <div 
                className="bg-white px-4 py-5 sm:px-6"
              > 
                {children}
              </div>
              </div>
        </div>
      </div>
    </div>  
      
  )
}
  