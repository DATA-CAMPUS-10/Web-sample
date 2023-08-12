import React, { useState } from 'react';
import axios from 'axios';
import './InputComponent.css';

function InputComponent({ handleInputChange }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);

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
      setExtractedText(response.data.text);
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  return (
    <div className="input-component">
      <textarea
        className="input-textarea"
        placeholder="약관을 입력하세요..."
        value={extractedText} // ocr 이미지로 받아온 텍스트
        onChange={handleInputChange} // 사람이 작성한 텍스트
        style={{ whiteSpace: 'pre-wrap' }}
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {/* 이미지 미리보기 */}
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Uploaded"
          style={{ width: '200px', height: 'auto', maxWidth: '100%' }}
        />
      )}
      {/* 이미지 미리보기 */}
      
    </div>
  );
}

export default InputComponent;