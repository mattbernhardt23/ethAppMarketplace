
const SIZE = {
  sm: "p-1 text-base xs:px-8",
  md: "p-2 text-md md:text-lg xs:px-6",
  lg: "p-3 text-xl xs:px-8"
}



export default function Button({
  children,
  className,
  size = "md",
  hoverable = true,
  variant = "cyan",
  ...rest
}) {

  const sizeClass = SIZE[size]
  const variants = {
    white: `text-black bg-white`,
    
    green: `text-white bg-green-600 ${hoverable && "hover:bg-green-700"}`,
    
    cyan: `text-white 
      bg-gradient-to-tl from-cyan-800 to-cyan-500 
      `,
    
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
    
    lightCyan: `text-cyan-800 bg-gradient-to-tl from-cyan-100 to-cyan-500 
    ${hoverable && "hover:bg-indigo-200"}`,
  }

  return (
    <button
      {...rest}
      className={`${sizeClass} disabled:opacity-50 hover:scale-105 transition-all delay-250 disabled:cursor-not-allowed border rounded-full font-medium ${className} ${variants[variant]}`}>
      {children}
    </button>
  )
}