import React, {useId} from 'react'

const Input = ({
    label,
    type = "text",
    className = "",
    ...props
}, ref) => {
    const id = useId()
  return (
   <div className='w-full'>
    {label && <label
    className=''
    htmlFor={id}
    >{label}</label>}
    <input 
    id={id}
    ref={ref}
    type={type}
    placeholder={props.placeholder}
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className} `} />
   </div>
  )
}

export default Input