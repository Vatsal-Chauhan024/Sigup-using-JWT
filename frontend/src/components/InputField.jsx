import React from 'react'

const InputField = ({value, onChange, placeholder, type}) => {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className='border-[1px] border-gray-200 h-12 w-full text-sm shadow-md bg-white px-3 rounded-md outline-none'/>
  )
}

export default InputField
