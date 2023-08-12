import React, { useState } from 'react';
// import TitleModel from './TitleModel';
// import KeywordModel from './KeywordModel';
import './OutputComponent.css';


function OutputComponent({ userInput, setSelectedValue }) {
  const [selectedOption, setSelectedOption] = useState('');           // selectedOption: 변경 전(초기값)   setSelectedOption: 변경 후
  const [pnData, setpnData] = useState({
    P_Text: [],
    N_Text: [],
    Sum_P: [],
    Sum_N: [],
  });
 
  async function fetchDataHandler(){
    const response = await fetch('http://127.0.0.1:5000/process');
    const data = await response.json();

    const transformedData = {
      P_Text: data.positive_texts,
      N_Text: data.negative_texts,
      Sum_P: data.sum_p_texts,
      Sum_N: data.sum_n_texts,
    };
    setpnData(transformedData);
  }
  

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
          
          
          <p>유리 리스트</p>
          <ul>
           {pnData.Sum_P.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
          </ul>
        </div>
        <div className="summary-box">
          <p>불리 리스트</p>
          <ul>
           {pnData.Sum_N.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
          </ul>
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
          onChange={(e) =>{ handleProcessClick(e.target.value); fetchDataHandler()}}
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