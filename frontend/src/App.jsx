import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("No response yet.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function callBackend() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (!API_URL) {
        throw new Error("VITE_API_URL is missing.");
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message || "No message returned.");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Simple AWS Fullstack App</h1>
        <p>
          Frontend on Amplify, backend on Lambda.
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={callBackend} disabled={loading}>
          {loading ? "Loading..." : "Generate message"}
        </button>

        {error && <div className="error">Error: {error}</div>}
        {!error && <div className="result">{message}</div>}
      </div>
    </div>
  );
}