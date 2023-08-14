import React, { useState } from 'react';
import axios from 'axios';
import './InputComponent.css';

function InputComponent({ handleInputChange, setImage }) {
  // const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('분석할 약관 이미지를 선택해주세요.');
  let result;
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    //  setSelectedImage(image);

    setImage(image);
    // 서버로 이미지를 업로드하고 텍스트를 추출
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
      response.data.text = response.data.text.split(/[\n]/).filter(sentence => sentence.trim() !== '');
      setExtractedText(response.data.text);
      console.log(response.data.text);
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  const handleServerSend = async () => {
    try {
      const sentences = extractedText.split(/[\n]/).filter(sentence => sentence.trim() !== '');
      const response = await axios.post('http://localhost:5000/api/process', { sentences });

      console.log('Server send successful:', response.data);
    } catch (error) {
      console.error('Error during sending to server:', error);
    }
  };
  if (extractedText === "분석할 약관 이미지를 선택해주세요.") {
    result = (
      extractedText

    );
  } else {
    result = (
      extractedText.map((text, index) => (  // 수정된 부분 (변수명)
        <p key={index}>{text}</p>
      ))
      // extractedText.map((text, index) => (
      //   <p
      //     key={index}
      //     className={
      //       pnData.Sum_P.some(pText => pText === text)
      //         ? "red-highlight"
      //         : pnData.Sum_N.some(nText => nText === text)
      //         ? "blue-highlight"
      //         : ""
      //     }
      //   >
      //     {text}
      //   </p>
      // ))
    )
  }
  return (
    <div className="input-component">
      <div
        className="input-textarea"
      >
        {result}
      </div>
      <button onClick={handleServerSend}>서버로 전송</button>

      <input type="file" accept="image/*" onChange={handleImageUpload} />




    </div>
  );
}

export default InputComponent;