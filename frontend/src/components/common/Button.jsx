import React from 'react'

const Button = ({
    children,
    type = 'button',
    className = 'bg-orange-600',
    ...props
}) => {
  return (
   <button className={`px-4 py-2 rounded-lg ${className}`} {...props}>
    {children}
   </button>
  )
}

export default Button