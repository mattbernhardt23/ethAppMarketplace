import Image from "next/image"
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {

    return (
      <footer className="bg-cyan-900 clip-footer 
      h-[45vh]">
       <div className="h-full pt-28">
        <div className="grid grid-cols-3  mx-2 lg:mx-20 h-full font-tiltwarp text-[#F0CF90] md:font-bold lg:text-base md:text-sm text-xs" >
          <div className="flex items-center justify-center">
          Copyright &copy; Matthew Bernhardt
          </div>
          <div className="flex items-center justify-center">
          <Image 
          height="250" 
          width="250" 
          src="/assets/logo.png" 
          alt="logo" 
        />
          </div>
          <div className="flex items-center justify-center text-xl md:text-3xl">
          <FaGithub />
          <FaTwitter className="mx-2 md:mx-6" />
          <FaLinkedin />
          </div>
        </div>
       </div>
      </footer>
    )
  }