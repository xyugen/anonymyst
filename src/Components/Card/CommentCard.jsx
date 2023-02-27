import React from 'react'
import '../../Assets/Styles/comments-card.css'

const CommentCard = ({ key, title, date, content }) => {
  return (
    <div className='comment'>
        <div className='comment-header'>
            <h3 className='comment-title'>{title}</h3>
            <p className='text-sm card-date'>{date}</p>
        </div>
        <div className='comment-content'>
            {content}
        </div>
    </div>
  )
}

export default CommentCard