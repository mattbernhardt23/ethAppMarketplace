import React from "react";
import Link from "next/link";
import { Button } from "@components/ui/common";

function FAQ() {
  return (
    <div className="relative bg-cyan-900">
      <div className="h-[40vh] clip-elipse-top z-10 bg-white mb-10"></div>
      <div className="h-[40vh] clip-elipse-bottom z-10 bg-white w-full"></div>
      <div className="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 h-2/3 w-5/6 md:w-4/5 bg-white rounded-2xl border-4 shadow-2xl border-cyan-900 z-30">
        <div className="whitespace-normal font-tiltwarp flex flex-col content-around p-4 lg:p-12 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold pb-4 md:pb-0 text-cyan-600">
            Learn How to Connect and Access Content
          </h2>
          <p className="whitespace-normal border-r-full  text-md sm:text-lg md:text-xl pb-4 md:pb-0 text-cyan-800 py-2 md:py-6">
          The Power Within harnesses the power of blockchain technology. The blockchain offers many benefits, such as decentralized data storage, transparency, and security. Our platform utilizes these advantages to provide a seamless experience for our users. However, we understand that not everyone is familiar with blockchain technology, which is why we are here to help. If connecting to a blockchain wallet is new to you, don&apos;t worry. Follow the link below and we&apos;ll  guide you through the process and teach you how it all works. 
          </p>
          <Link href={`/learn-more`} legacyBehavior>
            <a className="mx-auto  pt-2 md:pt-4">
              <Button className="max-w-max">Learn More</Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
