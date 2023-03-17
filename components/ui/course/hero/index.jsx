import { Button } from '@components/ui/common'
import Image from "next/image"

export default function Hero({
    title, 
    description, 
    hasOwner,
    course
  }) {


    return (
      <section>
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 md:max-w-2xl md:w-full lg:pb-28 xl:pb-32">
              <svg className="hidden md:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              </div>
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-cyan-900 sm:text-5xl md:text-6xl">
                  {title}
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                   {description}
                  </p>
                </div>
              </main>
            </div>
          </div>
          <div 
            className="absolute inset-y-0 right-0 w-1/2"
          >
            <Image 
              
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" 
              src={course.coverImage} 
              alt={title} 
              fill={true}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
        </div>
      </section>
    )
  }