import React from 'react'
import '../../Assets/Styles/card.css'
import { FaRegComments } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Card = ({ key, id, title, content, date, comCount }) => {
  return (
    <div className='card'>
        <div className='card-header'>
            <h2 className='card-title'>{title}</h2>
            <p className='text-sm card-date'>{date}</p>
        </div>
        <div className='card-main'>
            <p className='card-content'>{content}</p>
            {id &&
              <div className='card-comments-container'>
                <Link to={`/post/${id}`} className='card-comments'><FaRegComments size={25}/>{comCount}</Link>
              </div>
            }
        </div>
    </div>
  )
}

export default Card