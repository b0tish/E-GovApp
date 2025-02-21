import React, { useState } from "react";

const API_KEY =process.env.REACT_APP_TOKEN_API; // Replace with your actual API key
console.log(API_KEY);


const Test = () => {
  const [prompt, setPrompt] = useState("Tell me about Football");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const generateText = async () => {
    if (!prompt) return alert("Please enter a prompt!");

    setLoading(true);
    setGeneratedText(""); // Clear previous result

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/gemma-2-2b-it",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setGeneratedText(data[0]?.generated_text || "No response generated.");
      } else {
        setGeneratedText("Error generating text.");
      }
    } catch (error) {
      setGeneratedText("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">AI Text Generator</h2>
      <textarea
        className="w-full p-2 border rounded-md"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={generateText}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Text"}
      </button>

      {generatedText && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <strong>Generated Text:</strong>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Test;
