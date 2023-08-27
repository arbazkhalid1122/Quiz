import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { After } from '..';
import axios from 'axios';

interface Question {
    id: number;
    text: string;
    options: string[];
    answer: string;
}

interface QuestionProps {
    qType: string;
}
interface Data {
    [key: string]: Question[];
}


const Question: React.FC<QuestionProps> = (props) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [click, setClick] = useState<number | null>(null);
    const [selectItem, setSelectItems] = useState(null)
    const [thank, setThank] = useState(false)
    const [optionArray, setOptionArray] = useState<any[]>([]);
    const [correct, setCorrect] = useState<number | null>(null)
    const [wrong, setWrong] = useState<number | null>(null)
    const [data, setData] = useState<Data>({});




    const handle = (option: any, index: number) => {
        setSelectItems(option)
        setClick(index);
        setOptionArray((prevOptions: any) => [...prevOptions, option]);
    };

const url = 'http://localhost:3000/api/route/hello'

useEffect(()=>{
    const load = async ()=>{
        try {
            const response = await axios.get(url);
            const currentQuestions = response.data;
            setData(currentQuestions);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    load()
},[])

const filteredQuestions = data[props.qType] || [];

    
    const handleNextClick = async (answer: any) => {

        if (selectItem) {
            if (currentQuestionIndex < filteredQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setClick(null)
                setThank(false)
                setSelectItems(null)
            }
            else {
                const results = filteredQuestions.map((item, index) => item.answer === optionArray[index]);
                const getTrue = results.filter((item) => item).length;
                setCorrect(getTrue);
                const getFalse = results.length - getTrue;
                setWrong(getFalse);
                setThank(true);
            }

        } else {
            notification.error({
                message: 'Wrong Answer',
                description: 'Please select Option  .',
            });
        }
    };


    const hintClick = (name: string) => {
        const a = name.charAt(0)
        notification.info({
            message: 'Hint',
            description: `Its name start from ${a}`,
        })
    }

  

    return (
        <div>
            <div>
                {thank ? (
                    <After><h1>Submission Successfully</h1>
                        <p>
                            You have {`${correct}`} correct answers and {`${wrong}`} wrong answers.
                        </p>
                        <div>Thank You!</div>

                    </After>
                ) : (
                    <div>
                        <h1>Quiz App</h1>
                        {filteredQuestions && (
                            <div>
                                <h2>Question {filteredQuestions[currentQuestionIndex]?.id}</h2>
                                <p>{filteredQuestions[currentQuestionIndex]?.text}</p>
                                {filteredQuestions[currentQuestionIndex]?.options.map((option, index) => (
                                    <div key={index}>
                                        <div
                                            className='items'
                                            onClick={() => handle(option, index)}
                                            style={{ background: click === index ? 'rgb(192 237 133)' : '' }}
                                        >
                                            {option}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className='btn'>
                            <button onClick={() => handleNextClick(filteredQuestions[currentQuestionIndex]?.answer)}>Next</button>
                        </div>
                        <div className='hint'>
                            <p style={{ textDecoration: 'underline' }} onClick={() => hintClick(filteredQuestions[currentQuestionIndex]?.answer)}>Hint</p>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={handleNextClick}>Button</button>
        </div>
    );
};

export default Question;




