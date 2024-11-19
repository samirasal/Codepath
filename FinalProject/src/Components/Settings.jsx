import React, { useState } from "react";

function Settings({ setTheme, setLayout }) {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedLayout, setSelectedLayout] = useState("list");

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    setTheme(theme); 
    localStorage.setItem("theme", theme);
  };

  const handleLayoutChange = (layout) => {
    setSelectedLayout(layout);
    setLayout(layout); 
    localStorage.setItem("layout", layout);
  };

  return (
    <div>
      <h2>Customize Interface</h2>

      <h3>Theme</h3>
      <button onClick={() => handleThemeChange("light")}>Light Mode</button>
      <button onClick={() => handleThemeChange("dark")}>Dark Mode</button>

      <h3>Layout</h3>
      <button onClick={() => handleLayoutChange("list")}>List View</button>
      <button onClick={() => handleLayoutChange("grid")}>Grid View</button>
    </div>
  );
}

export default Settings;
