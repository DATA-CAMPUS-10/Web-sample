import React, { useState } from 'react';
import './App.css';
import InputComponent from './components/UI/InputComponents';
import OutputComponent from './components/UI/OutputComponents';

function App() {
  const [userInput, setUserInput] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const setImage = (image) => {
    setSelectedImage(image);
  };
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="App">
      <h1 id='title'>약관 상세 분석 시스템 {selectedValue}</h1>
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Uploaded"
          className="img-uploaded"
        />
      )}
      <div className="container">
        <InputComponent handleInputChange={handleInputChange} setImage={setImage} />
        <OutputComponent userInput={userInput} setSelectedValue={setSelectedValue} />
      </div>

    </div>
  );
}

export default App;
