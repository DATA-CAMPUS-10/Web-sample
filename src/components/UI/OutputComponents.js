import React, { useState } from 'react';
// import TitleModel from './TitleModel';
// import KeywordModel from './KeywordModel';
import './OutputComponent.css';


function OutputComponent({ userInput, setSelectedValue }) {
  const [selectedOption, setSelectedOption] = useState('');           // selectedOption: 변경 전(초기값)   setSelectedOption: 변경 후
  // const [keyword, setKeyword] = useState(''); // keyword 상태를 추가합니다.
  // const [top_nouns, setTop_nouns] = useState(''); // top_nouns 상태를 추가합니다.
  let output;

  const handleProcessClick = (option) => {         // select 드롭다운 메뉴에서 선택한 옵션에 따라 상태를 업데이트하는 이벤트 핸들러 함수
    if (option === selectedOption) {
      setSelectedOption('');
      setSelectedValue('');
    } else {
      setSelectedOption(option);
      setSelectedValue(option);
    }
  };
    
  if (selectedOption === ": 유리 / 불리 판단") {
    output = (
      <div className="output-box">
        <div className="judgement-box">
          {/* userInput을 prop으로 전달하여 TitleModel에서 사용할 수 있게 합니다. */}
          {/* <TitleModel userInput={userInput} setKeyword={setKeyword} /> setKeyword를 prop으로 전달합니다. */}
          <p>유불리 판단 텍스트의 리스트</p>
        </div>

        <div className="summary-box">
          {/* <KeywordModel userInput={userInput} setTop_nouns={setTop_nouns}/> */}
          <p>해당 텍스트의 요약본</p>
        </div>
      </div>
    );
  }
  else if (selectedOption === ": 키워드 분석") {
    output = (
      <div className="output-box">
        <div className="title-box">
          {/* userInput을 prop으로 전달하여 TitleModel에서 사용할 수 있게 합니다. */}
          {/* <TitleModel userInput={userInput} setKeyword={setKeyword} /> setKeyword를 prop으로 전달합니다. */}
          <p>타이틀 박스입니다.</p>
        </div>

        <div className="keyword-box">
          {/* <KeywordModel userInput={userInput} setTop_nouns={setTop_nouns}/> */}
          <p>키워드 박스입니다ㄴㄴ</p>
        </div>
      </div>
    );
  }
  else {
      output = <div className='output-box'></div>
    };
  


  return (
    <div className="output-component">
      <div className="output-buttons">
        <select
          value={selectedOption}
          onChange={(e) => handleProcessClick(e.target.value)}
        >
          <option value="">시스템을 선택하세요.</option>
          <option value=": 유리 / 불리 판단">유리 / 불리 판단</option>
          <option value=": 키워드 분석">키워드 분석</option>
        </select>
      </div>

      {output}
  
    </div>
  );
}



export default OutputComponent;