import React, { useState } from 'react'


export default function TextForm(props) {

  const handleUpClick = () => {
    // console.log("Uppercase was clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
   

  }
  const handleOnChange = (event) => {
    // console.log("On change");
    setText(event.target.value);
  }

  const [text, setText] = useState("Enter text here");

  return (
    <>
      <div className="container my-3">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            onChange={handleOnChange}
            value={text}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleUpClick}>
          Change To UpperCase
        </button>
      </div>

      <div className="container my-2">
        <h2> Your Text Summery</h2>
        <p>
          {text.trim().length === 0 ? 0 : text.split(" ").length} words and {text.length} characters
        </p>
        <p>
          {0.008 * text.split(" ").length} Minutes is required to read
        </p>
      </div>
    </>
  );
}
