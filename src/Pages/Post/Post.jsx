import React, { useState } from 'react';
import '../../Assets/Styles/post.css';
import { useNavigate } from 'react-router-dom';
import Dialog from '../../Components/DialogBox/Dialog';

import { supabase } from '../../Services/supabase';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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

    // Insert the new post into the "posts" table
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title: title.trim() || 'Anonymous', content: newContent }]);

    if (error) {
      console.log('Error creating post:', error);
    } else {
      console.log('Post created successfully:', data);
    }

    history('/');
  };

  return (
    <div className="post-form">
      <div className="post-form-header">
        <h2>Anonymyst</h2>
      </div>
      <div className="post-form-content">
        {errorMessage && <Dialog dialog={"error"} content={errorMessage} />}
        <form className="post-form-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Anonymous"
            value={title}
            onChange={handleTitleChange}
          />

          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>

          <input type="submit" value="Post" className="btn" id="post-btn" />
        </form>
      </div>
    </div>
  );
};

export default Post;
