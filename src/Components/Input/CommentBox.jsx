import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { supabase } from '../../Services/supabase'
import Dialog from '../DialogBox/Dialog';

import './commentbox.css'

const CommentBox = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const params = useParams();
  const history = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim leading/trailing spaces from content field
    const newContent = content.trim();

    // Check if content is empty
    if (newContent === '') {
      setErrorMessage('Content cannot be blank.');
      return;
    }

    // Insert the new post into the "comments" table
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: params.id, title: title.trim() || 'Anonymous', content: newContent }]);

    setTitle('');
    setContent('');

    if (error) {
      console.log('Error creating comment:', error);
    } else {
      console.log('Comment created successfully:', data);
    }

    history('/post/' + params.id);
  };

  return (
    <div className="comment-form">
        <div className='comment-form-header'>
            <h3>Comment</h3>
        </div>
        {errorMessage && <Dialog dialog={"error"} content={errorMessage} />}
        <div className='comment-form-content'>
            <form className="comment-form-form" onSubmit={handleSubmit}>
            <label htmlFor="comment-title">Title:</label>
            <input
                type="text"
                id="comment-title"
                placeholder="Anonymous"
                value={title}
                onChange={handleTitleChange}
            />

            <label htmlFor="comment-content">Content:</label>
            <textarea
                id="comment-content"
                value={content}
                onChange={handleContentChange}
                required
            ></textarea>

            <input type="submit" value="Post" className="btn" id="comment-btn" />
            </form>
        </div>
    </div>
  )
}

export default CommentBox