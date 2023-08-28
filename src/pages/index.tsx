
'use client'
import { Button, Col, Form, Input, Row, Select, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider, styled } from 'styled-components';
import { ColorPicker } from 'antd';
import Question from './Questions';
import { CiPickerHalf } from 'react-icons/ci';

const App: React.FC = () => {
  const [form] = Form.useForm();
  
  const [color, setColor] = useState(false)
  const [question, setQuestion] = useState(false)
  const [colorValue, setColorValur] = useState<any | null>(null)
  const [qType, setQType] = useState<any | null>(null)
  const [container, setContainer] = useState<any | null>(null)
  const [conColor, setConColor] = useState(false)

 

  const handleColor = (e: any) => {
    setColor(true)
    console.log(e);
  }
 
  const handleColorPicker = (e: any) => {
    console.log(e, 'pivkererer');
    setColorValur(e)
    setColor(false)
  }

  const handleColor2 = (e: any) => {
    setConColor(true)
    console.log(e);
  }
  const handleColorPicker2 = (e: any) => {
    console.log(e, 'pivkererer');
    setContainer(e)
    setConColor(false)
  }


  const handleSelect = (e: string) => {
    setQType(e)
  }

  const main1 = colorValue?.toHexString() || 'black';
  const main2 = container?.toHexString() || 'beige';

  return (
    <ThemeProvider theme={{ main1, main2 }}>
      <div style={{ background: main1 ? main1 : 'white', display: 'flex', justifyContent: 'end' }}>
        <CiPickerHalf onClick={handleColor} style={{ width: '50px', height: '50px', color: main1 === 'black' ? 'white' : 'black' }}></CiPickerHalf>
        <ColorPicker open={color} onChangeComplete={(e) => handleColorPicker(e)}> </ColorPicker>
      </div>
      <Main>
        <Container >
          {!question ? (
            <div className='antd'>
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <CiPickerHalf onClick={handleColor2} style={{ width: '30px', height: '30px', color: main1 === 'black' ? 'white' : 'black' }}></CiPickerHalf>
                <ColorPicker open={conColor} onChangeComplete={(e) => handleColorPicker2(e)}> </ColorPicker>
              </div>

              <h1>Quiz App</h1>
              <Form
                form={form}
                onFinish={() => setQuestion(true)}
              >

                <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please Select' }]}>
                  <Input placeholder='Please Enter Your Name' ></Input>
                </Form.Item>

                <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please Select' }]} >
                  <Input placeholder='Please Enter Your Email'></Input>
                </Form.Item>

                <Form.Item rules={[{ required: true, message: 'Please Select' }]} style={{marginTop:'5px'}} label='Select Question Type' name='Select'>
                  <Select
                    placeholder='Select'
                    allowClear
                    onChange={(name) => handleSelect(name)}
                    size='large'
                    options={[{ value: 'frontend', label: 'frontend' }, { value: 'backend', label: 'backend' }]}
                  />
                </Form.Item> 

                <Form.Item>
                  <div className='btn'>
                    <button>Next</button>
                  </div>
                </Form.Item>
              </Form>
            </div>) : (
            <Question qType={qType}></Question>)}
        </Container>
      </Main>
    </ThemeProvider>
  );
};
 
export default App;


export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* background: black; */
  background-color: ${(props) => (props.theme?.main1 ? props.theme.main1 : 'black')};
`;


export const Container = styled.div`
  h1{
      margin-top: 5px;
      text-align: center;
      margin-bottom: 10px;
    }
    h2{
      margin-top: 15px;
      margin-bottom: 20px;
    }

  background: ${(props) => (props?.theme?.main2 ? props.theme.main2 : 'beige')};

    padding: 1vw 5vw 5vw 5vw;
    border-radius: 8px;
    width: 600px;

.btn{

button{
  width: 453px; 
  font-size: 20px;
  height: 54px;
  margin-top: 20px;
  border-radius: 15px;
  border: none;
  background: black;
  color: white;

  @media (max-width: 680px) {
  width: 100%;
}
}
}
  

  .items{
    background: #edebeb;
    margin-top: 20px;
    padding: 20px;
    border-radius: 15px;
    &:hover{
    box-shadow: 1px 2px 22px 1px #c9c9c9;

    }
  }

  .hint{
    text-align: end;
    margin-top: 9px;
    margin-right: 16px;
  }

  @media (max-width: 680px) {
    width: 100%;
    margin-left: 5vw;
  }

.antd{
  margin-top: 35px;
  .ant-input{
    padding: 12px;
    margin: 5px;
    background-color: ${(props) => (props?.theme?.main2 ? props.theme.main2 : 'beige')};
  }
  .ant-row{
    display: block  ;
    width: 450px;  
  }
  .ant-select-selector{ 
    width: 100%;
    height: 45px;
    padding: 6px 12px 7px 14px;
  }
 
  .ant-select{
    left: 8px;
    
  }

  .ant-select-selector{
    background: ${(props) => (props?.theme?.main2 ? props.theme.main2 : 'beige')};
  }

  @media (max-width: 508px) {
    .ant-row{
      width: 100%;
    }
    .ant-form{
      padding: 0px 22px;
    }
  }
}

`

export const After = styled.div`
text-align: center;
font-size: 25px;
`