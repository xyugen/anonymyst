import React, { useState } from "react";
import "../../Assets/Styles/post.css";
import { useNavigate } from "react-router-dom";
import Dialog from "../../Components/DialogBox/Dialog";
import { FaFileUpload } from "react-icons/fa";

import { supabase } from "../../Services/supabase";
import Compressor from "compressorjs";

const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState();
  const [fileName, setFileName] = useState("Upload image...");
  const [errorMessage, setErrorMessage] = useState("");

  const MAX_FILE_SIZE = 8000000;
  const history = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      // 8MB limit
      setErrorMessage("File size cannot exceed 8MB.");
      return;
    }

    if (file) {
      setFileName(file.name);
      
      // Compress uploaded image
      new Compressor(file, {
        quality: 0.6,
        success: (compressedFile) => {
          setImage(compressedFile);
        },
        error: (err) => {
          console.log(err.message);
          setErrorMessage("An error occured while compressing image.");
        },
      });
    } else {
      setFileName("Upload image...");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim leading/trailing spaces from content field
    const newContent = content.trim();

    // Check if content is empty
    if (newContent === "") {
      setErrorMessage("Content cannot be blank.");
      return;
    }

    // Check if image is uploaded and its size is valid
    if (image && image.size > MAX_FILE_SIZE) {
      setErrorMessage(
        `Image must be less than ${MAX_FILE_SIZE / (1024 * 1024)} MB.`
      );
      return;
    }

    // Insert the new post into the "posts" table
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .insert([{ title: title.trim() || "Anonymous", content: newContent }])
      .select();

    if (postError) {
      console.log("Error creating post:", postError);
      setErrorMessage("An error occurred while creating the post.");
      return;
    }

    console.log("Post created successfully:", postData);

    // Upload the image to Supabase Storage and connect it to the post
    const postId = postData[0]?.post_id; // add a check for existence of postData
    if (!postId) {
      setErrorMessage("An error occurred while creating the post.");
      return;
    }

    if (image) {
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`public/${postId}.jpg`, image, {
          cacheControl: "3600",
          contentType: "image/jpg",
        });

      if (imageError) {
        console.log("Error uploading image:", imageError);
        setErrorMessage("An error occurred while uploading the image.");
        return;
      }

      console.log("Image uploaded successfully:", imageData);

      // Update the post with the image URL
      const { data: publicURL } = await supabase.storage
        .from("images")
        .getPublicUrl(`${imageData.path}`);

      const { data: updateData, error: updateError } = await supabase
        .from("posts")
        .update({ image_url: `${publicURL.publicUrl}` })
        .eq("post_id", postData[0].post_id);

      if (updateError) {
        console.log("Error updating post:", updateError);
        setErrorMessage("An error occurred while updating the post.");
        return;
      }

      console.log("Post updated successfully:", updateData);
    }

    history("/");
  };

  return (
    <div className="post-form">
      <div className="post-form-header">
        <h2>Anonymyst</h2>
      </div>
      <div className="post-form-content">
        {errorMessage && <Dialog dialog={"error"} content={errorMessage} />}
        <form className="post-form-form" onSubmit={handleSubmit}>
          <label htmlFor="title" id="title-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            placeholder="Anonymous"
            value={title}
            maxLength={50}
            onChange={handleTitleChange}
          />

          <label htmlFor="content" id="content-label">
            Content:
          </label>
          <input
            type="file"
            id="image-upload"
            name="image-upload"
            accept=".png,.jpg,.jpeg"
            title="Upload image"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload" id="image-upload-label">
            <FaFileUpload /> {fileName}
          </label>
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
