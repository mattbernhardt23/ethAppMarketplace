

import React from 'react'

export default function Button({
    children, 
    className= "bg-indigo-600 hover:bg-indigo-500", 
    ...rest 
}) {

  const variants = {
    purple: `text-white bg-indigo-600 "hover:bg-indigo-700"`,
    red: `text-white bg-red-600 hover:bg-red-700"`,
    lightPurple: `text-indigo-700 bg-indigo-100 hover:bg-indigo-200"`,
  }

  return (
    <span
        // This is how we send our onClick
        {...rest}
        className={`rounded-md shadow mr-auto px-8 py-3 border  text-base font-medium text-white ${className}`} 
     >
        {children}
    </span>
  )
}


