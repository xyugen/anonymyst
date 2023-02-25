import React from 'react'

const Post = () => {
  return (
    <div className='post-form'>
      <div className='post-form-header'>
        <p>Write</p><h2>Anonymyst</h2>
      </div>
      <div className='post-form-content'>
        <form>
          <label>Title: </label>
          <input type='text' />
        </form>
      </div>
    </div>
  )
}

export default Post