import React, { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [inputJSON, setInputJSON] = useState("");

  const formattedJSON = useMemo(() => {
    try {
      const parsedJSON = JSON.parse(inputJSON);
      return JSON.stringify(parsedJSON, null, 2);
    } catch (error) {
      return null;
    }
  }, [inputJSON]);

  const error = useMemo(() => {
    if (formattedJSON === null && inputJSON.trim() !== "") {
      try {
        JSON.parse(inputJSON);
      } catch (error) {
        return error.message;
      }
    }
    return null;
  }, [inputJSON, formattedJSON]);

  const handleJSONInput = (event) => {
    setInputJSON(event.target.value);
  };

  const copyToClipboard = () => {
    if (formattedJSON) {
      navigator.clipboard.writeText(formattedJSON).then(
        () => {
          alert("整形済みJSONがクリップボードにコピーされました。");
        },
        (err) => {
          console.error("クリップボードへの書き込みに失敗しました: ", err);
        }
      );
    }
  };

  return (
    <div className="App">
      <h1>JSON整形ツール</h1>
      <div>
        <h3>JSON入力:</h3>
        <textarea
          rows="10"
          cols="60"
          value={inputJSON}
          onChange={handleJSONInput}
        ></textarea>
      </div>
      {error && (
        <div>
          <h3>エラー:</h3>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}
      <div>
        <h3>整形済みJSON:</h3>
        <div className="json-output">
          <pre>{formattedJSON}</pre>
          <button className="copy-button" onClick={copyToClipboard}>
            クリップボードにコピー
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
