// src/App.jsx

import React from "react";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div>
      <HomePage />
      <h1>Heading Level 1</h1>
      <p>This is a paragraph following Heading 1.</p>

      <h2>Heading Level 2</h2>
      <p>This is a paragraph following Heading 2.</p>

      <h3>Heading Level 3</h3>
      <p>This is a paragraph following Heading 3.</p>

      <h4>Heading Level 4</h4>
      <p>This is a paragraph following Heading 4.</p>

      <h5>Heading Level 5</h5>
      <p>This is a paragraph following Heading 5.</p>

      <h6>Heading Level 6</h6>
      <p>This is a paragraph following Heading 6.</p>

      <p className="text-danger">This is a paragraph with the danger color.</p>
      <p className="text-warning">
        This is a paragraph with the warning color.
      </p>
    </div>
  );
}

export default App;
