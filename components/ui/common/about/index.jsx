import React from 'react'

function About() {
  return (
    <div className="relative bg-cyan-900">
    <div className="h-[40vh] clip-elipse-top z-10 bg-white mb-10"></div>
    <div className="h-[40vh] clip-elipse-bottom z-10 bg-white w-full"></div>
    <div className="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 h-2/3 w-5/6 md:w-4/5 bg-white rounded-2xl border-4 shadow-2xl border-cyan-900 z-30">
      <div className="whitespace-normal font-tiltwarp flex flex-col justify-between p-4 sm:p-8 lg:p-16 text-center">
        <h2 className="text-xl pb-0 md:pb-0 sm:pb-4 sm:text-3xl md:text-4xl font-bold text-cyan-600">
          What's In Store For You
        </h2>
        <p className="whitespace-normal border-r-full  text-lg sm:text-xl text-cyan-800 py-2 md:py-6">
          Our mission is to inspire the leaders of tomorrow through learning from the lives and achievements of those who came before us. By studying the successes and failures of historical figures, we aim to provide valuable insights and lessons that can be applied to your personal and professional life. Our content covers a diverse range of topics, including leadership, innovation, creativity, and perseverance. Join us on a journey of self-improvement and personal growth as we explore the lives and legacies of some of the most influential people.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About