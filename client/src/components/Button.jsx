import React from 'react'

const Button = ({btnText,txtSize}) => {
  return (
    <button className={`bg-white rounded py-4 px-8 text-${txtSize}`}>
        {btnText}
    </button>
  )
}

export default Button