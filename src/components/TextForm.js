import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// toast.configure();

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const savedText = localStorage.getItem("text");
    if (savedText) setText(savedText);
  }, []);

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    toast.success("Converted to Uppercase");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    toast.success("Converted to Lowercase");
  };

  const handleClearText = () => {
    setText("");
    toast.info("Text cleared");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleRemoveExtraSpaces = () => {
    let newText = text.replace(/\s+/g, " ").trim();
    setText(newText);
    toast.success("Extra spaces removed");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const translateText = async () => {
    const apiKey = "YOUR_GOOGLE_API_KEY_HERE"; // replace with your API key
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2`,
        {},
        {
          params: {
            q: text,
            target: selectedLang,
            key: apiKey,
          },
        }
      );
      setText(response.data.data.translations[0].translatedText);
      toast.success("Text Translated");
    } catch (error) {
      toast.error("Translation failed");
    }
  };

  const getWordLengthDistribution = () => {
    const wordLengths = text.trim().split(/\s+/).map((word) => word.length);
    const counts = {};
    wordLengths.forEach((len) => {
      counts[len] = (counts[len] || 0) + 1;
    });
    return {
      labels: Object.keys(counts),
      datasets: [
        {
          label: "Word Length Frequency",
          data: Object.values(counts),
          backgroundColor: "#0d6efd",
        },
      ],
    };
  };

  return (
    <div className="container my-3 d-flex">
      <div style={{ flex: 1, marginRight: "30px" }}>
        <h1>{props.heading}</h1>
        <textarea
          className="form-control"
          onChange={handleOnChange}
          value={text}
          id="myBox"
          rows="8"
        ></textarea>

        <button className="btn btn-primary my-2" onClick={handleUpClick}>
          Change To UpperCase
        </button>
        <button className="btn btn-primary mx-2 my-2" onClick={handleLoClick}>
          Change To LowerCase
        </button>
        <button className="btn btn-primary mx-2 my-2" onClick={speak}>
          Listen Now
        </button>
        <button className="btn btn-success mx-2 my-2" onClick={handleCopy}>
          Copy Text
        </button>
        <button className="btn btn-warning mx-2 my-2" onClick={handleRemoveExtraSpaces}>
          Remove Extra Spaces
        </button>
        <button className="btn btn-danger mx-2 my-2" onClick={handleClearText}>
          Clear All Text
        </button>
        <button className="btn btn-secondary mx-2 my-2" onClick={handleDownload}>
          Download Text
        </button>

        <div className="my-3">
          <label className="form-label">Select Language:</label>
          <select
            className="form-select"
            onChange={(e) => setSelectedLang(e.target.value)}
            value={selectedLang}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="hi">Hindi</option>
            <option value="ur">Urdu</option>
            <option value="ar">Arabic</option>
          </select>
          <button className="btn btn-info my-2" onClick={translateText}>
            Translate
          </button>
        </div>

        <h2>Your Text Summary</h2>
        <p>
          {text.trim().length === 0 ? 0 : text.split(/\s+/).length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minutes is required to read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : 'Nothing to preview'}</p>
      </div>

      <div style={{ width: "40%" }}>
        <h4>Word Length Chart</h4>
        <Bar data={getWordLengthDistribution()} />
      </div>
    </div>
  );
}
