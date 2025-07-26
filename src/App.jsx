import React from "react";
import Playlist from "./components/Playlist";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1
        style={{
          fontSize: "2.2em",
          lineHeight: "1.1",
          textAlign: "end",
          paddingRight: "20px",
        }}
      >
        🎧 موزیک پلیر
      </h1>
      <Playlist />
    </div>
  );
}

export default App;
