import React from 'react'

const Button = ({
    children,
    type = 'button',
    textColor = 'text-white',
    className = 'bg-orange-600',
    ...props
}) => {
  return (
   <button className={`px-4 py-2 rounded-lg  ${textColor} ${className}`} {...props}>
    {children}
   </button>
  )
}

export default Button