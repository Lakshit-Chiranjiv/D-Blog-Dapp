import React from 'react'

const Button = ({btnText,txtSize,extraClasses}) => {
  return (
    <button className={`bg-white rounded py-4 px-8 shadow-white hover:scale-95 hover:bg-black hover:shadow-none hover:text-white transition-all text-${txtSize} ${extraClasses}`}>
        {btnText}
    </button>
  )
}

export default Button