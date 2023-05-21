import React from 'react'

function Button ({type, content, func, t}) {
  return (
    <button type={t ? t : null} className={type} onClick={func}>
      {content}
    </button>
  )
}

export default Button