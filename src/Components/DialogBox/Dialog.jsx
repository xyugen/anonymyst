import React from 'react';
import '../../Assets/Styles/dialog.css';

const Dialog = ({ dialog, content }) => {
  return (
    <div className={dialog === "error" ? "dialog-error" : "dialog-success"}>{content}</div>
  )
}

export default Dialog;
