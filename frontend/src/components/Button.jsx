import React from 'react'

const Button = ({value, className, onClick}) => {
  return (
    <button onClick={onClick} className={`w-72 h-12 rounded-md hover:bg-orange-600 bg-orange-500 flex justify-center items-center text-white ${className}`} >{value}</button>
  )
}

export default Button
