import React, { useState } from 'react'
import '../../Assets/Styles/card.css'
import { FaRegComments, FaImage } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Card = ({ key, id, title, content, image, haveImage, date, comCount }) => {
  const [enlarge, setEnlarged] = useState(false);

  const handleImageClick = () => {
    setEnlarged(!enlarge);
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm card-date">{date}</p>
      </div>
      <div className="card-main">
        {image &&
          <div className='card-image-container'>
            <img className="card-image" alt="Post" src={image} />
          </div>
        }
        <p className="card-content">{content}</p>
        <div className="card-btns">
          {id && (
            <div className="card-comments-container">
              <Link to={`/post/${id}`} className="card-comments">
                <FaRegComments size={25} />
                {comCount}
              </Link>
            </div>
          )}
          {haveImage && (
            <div className="image-icon" onClick={handleImageClick}>
              <FaImage size={18} id="image-icon" title="Contains image" />
              <p id="image-icon-label">Contains image</p>
            </div>
          )}
          {haveImage && enlarge && (
            <div
              className="enlarged-image-container"
              onClick={handleImageClick}
            >
              <img className="enlarged-image" alt="Post" src={haveImage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card