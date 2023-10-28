import React from 'react';
import InputForm from './Components/InputForm';
import OutputDisplay from './Components/OutputDisplay';
import "./App.css"

function App() {
  return (
    <div className="App">
      <h1>AI Content Generation Tool</h1>
      <InputForm />
      <OutputDisplay/>
    </div>
  );
}

export default App;
