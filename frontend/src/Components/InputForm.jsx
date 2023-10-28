import React, { useState } from "react";
import axios from "axios"; // You may need to install this dependency
import OutputDisplay from "./OutputDisplay";
import "./InputForm.css";

function InputForm() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [targetLanguage, setTargetLanguage] = useState(""); // For translation
  const baseURL = "https://dull-handbag-frog.cyclic.app"

  const handleTextGeneration = async () => {
    try {
      const response = await axios.post(`${baseURL}/generate-text`, {
        prompt: input,
      });
      setOutput(response.data.generatedText);
    } catch (error) {
      console.error(error);
      setOutput("Text generation failed");
    }
  };

  const handleTextSummarization = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/summarize-text`,
        {
          textToSummarize: input,
        }
      );
      setOutput(response.data.summarizedText);
    } catch (error) {
      console.error(error);
      setOutput("Text summarization failed");
    }
  };

  const handleTextTranslation = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/translate-text`,
        {
          textToTranslate: input,
          targetLanguage: targetLanguage,
        }
      );
      setOutput(response.data.translatedText);
    } catch (error) {
      console.error(error);
      setOutput("Text translation failed");
    }
  };

  return (
    <>
      <div id="inputForm">
        {/* 1 */}
        <div>
          <textarea
            rows="6"
            cols="50"
            placeholder="Enter text or prompt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        {/* 2 */}
        <div>
          <button onClick={handleTextGeneration}>Generate Text</button>
          <button onClick={handleTextSummarization}>Summarize Text</button>
          <input
            type="text"
            placeholder="Enter Target Language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          />
          <button onClick={handleTextTranslation}>Translate Text</button>
        </div>
      </div>
      <div id="outputBox">
        <h4>Output:</h4>
        <OutputDisplay output={output} />
      </div>
    </>
  );
}

export default InputForm;
