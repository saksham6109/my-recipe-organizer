import React from 'react'

const Button = ({text,onClick}) => {
  return (
    <div >
        <button
              onClick={onClick}
              className="bg-green-600 hover:bg-green-900 text-md text-white px-2 py-1 rounded-lg"
            >
              {text}
            </button>

      
    </div>
  )
}

export default Button
