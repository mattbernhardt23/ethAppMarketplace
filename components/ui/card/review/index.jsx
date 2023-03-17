import Image from "next/image";
import Link from "next/link";

export default function ReviewCard(course) {
  course = course.course;
 
  return (
    <div className="my-8 
    h-[55vh] md:h-[55vh]  lg:h-[65vh]
    w-[45vw] md:w-[30vw] lg:w-[23vw] 
    border-white shadow-lg border-2 relative rounded-2xl bg-[#F0CF90]">
      <div className="relative 
      h-[35vh] md:h-[45vh] lg:h-[55vh]
      w-full 
      card-clip bg-cyan-900 rounded-xl">
        <div className="relative flex flex-row items-end 
        h-[20vh] md:h-[25vh] lg:h-[30vh]
        w-[20vh] md:h-[25vh] lg:w-[30vh] 
        ml-auto">
        <Image
          className="object-cover p-2 rounded-full pl-4 pb-4 ml-auto "
          src={course.photo}
          priority
          fill={true}
          sizes="(max-width: 600px) 100vw, 50vw"
          // width="300"
          // height="300"
          alt={course.name}
        />
        </div>
        <div className="absolute left-[5%] bottom-[25%]">
          <div className="flex flex-col">
            <div className="uppercase mr-2 tracking-wide text-sm lg:text-lg text-white font-semibold">
              {course.name}
            </div>
          </div>
          <div className="uppercase mr-2 md:tracking-wide text-xs md:text-sm text-white font-semibold">
            {course.location}
          </div>
        </div>
      </div>
      <div className="
      absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[30%] md:translate-y-[65%] lg:translate-y-[65%]
      h-[20vh] md:h-[16vh] lg:h-[18vh]
      w-[35vw] md:w-[27vw] lg:w-[20vw]
      bg-white border-white border-2 rounded-2xl">
          <div className="flex items-center text-center p-2 font-semibold text-gray-600 text-xs md:text-base">
          {course.review?.substring(0, 120)}
          </div>
      </div>
    </div>
  );
}

{
  /* <div
    className="flex flex-col bg-cyan-900 w-72 h-5/6 items-center
     shadow-log shadow-black rounded-xl shadow-md m-6 overflow-hidden">
    <div className="flex flex-col items-center h-full">
      <div className="relative h-60 w-60">
        <Image
          className="object-cover rounded-full p-4"
          src={course.photo}
          priority
          fill={true}
          sizes="(max-width: 600px) 100vw, 50vw"
          // width="300"
          // height="300"
          alt={course.name}
        />
      </div>
    
      <div className="p-4">
      <div className="flex flex-col w-3/4">
          <div
            className="uppercase mr-2 tracking-wide text-md text-white font-semibold">
            {course.name}
          </div>
          
         </div> 
          <div
            className="uppercase mr-2 tracking-wide text-sm text-white font-semibold">
            {course.location}
          </div>
         </div> 
       
        <p
           className="px-6 pb-6 text-sm sm:text-base text-white">
          {course.review?.substring(0, 120)}...
          
        </p>
    </div>
  </div> */
}
