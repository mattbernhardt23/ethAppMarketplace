export default function Hero() {
  return (
    <section className="h-[70vh] w-full px-4 my-8 mb-20 bg-white rounded-2xl">
      <div className="relative rounded-2xl">
        <video
          className="absolute h-[71vh] min-w-full  object-cover rounded-2xl border-2-white overflow-hidden"
          autoPlay
          muted
          loop
        >
          <source src="/assets/video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="
        h-[72vh] w-[110vw] bg-white z-20 absolute -left-[40%] 
        clip-half-circle flex items-center sm:justify-start font-rampart">
        
        <div className="z-30 absolute top-[50%] right-[50%] translate-x-[75%] -translate-y-[50%] w-1/2 text-start whitespace-normal   text-cyan-900">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold
          ml-16 md:ml-0
          ">The Power Within</h1>
          <h2 className="py-8 text-2xl md:text-4xl text-cyan-500 font-bold
          ml-16 md:ml-0 ">
            Be Bold, Go Beyond
          </h2>
        </div>
      </div>
    </section>
  );
}
