import React from 'react'

const Card = ({ content }) => {
  return (
    <div className="h-96 bg-white rounded-lg shadow-lg p-6">
        {content}
    </div>
  )
}

export default Card