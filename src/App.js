import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [sentiment, setSentiment] = useState("");

  const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;

  const APIBODY = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 60,
  };

  async function handleClick() {
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(APIBODY),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.choices[0].message.content);
        setSentiment(data.choices[0].message.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2> Sentiment Analysis Application</h2>
        <div className="input">
          <p> Enter the message to classify </p>
          <textarea
            className="textArea"
            type="text"
            placeholder="Type your message..."
            cols={50}
            rows={10}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="Response">
          <button onClick={handleClick}> Get Message sentiment</button>
          {sentiment !== "" ? <p> The message is {sentiment} </p> : null}
        </div>
      </header>
    </div>
  );
}

export default App;
