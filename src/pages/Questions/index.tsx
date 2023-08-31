import { notification } from 'antd';
import React, { useState } from 'react';
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
    data: any;
}

interface ResponseData {
    getTrue: number;
    getFalse: number;
}


const Question: React.FC<QuestionProps> = (props) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [click, setClick] = useState<number | null>(null);
    const [selectItem, setSelectItems] = useState(null)
    const [thank, setThank] = useState(false)
    const [optionArray, setOptionArray] = useState<any[]>([]);
    const [results, setResults] = useState<ResponseData | null>(null);

    const handle = (option: any, index: number) => {
        setSelectItems(option)
        setClick(index);
        setOptionArray((prevOptions: any) => [...prevOptions, option]);
    };


    const question = props.data
    const a = question?.filter((item: any) => item.category === props.qType)


    const handleNextClick = async (answer: any) => {
        if (selectItem) {
            if (currentQuestionIndex < a.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setClick(null);
                setThank(false);
                setSelectItems(null);
            } else {
                const type = props.qType;
                const post = axios.post('http://localhost:3000/api/database/hello', { optionArray, type });
                const res = await post;
                console.log(res, 'res');

                setResults(res.data.result);
                setThank(true);
            }
        } else {
            notification.error({
                message: 'Wrong Answer',
                description: 'Please select an option.',
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
            {thank ? (
                <After><h1>Submission Successfully</h1>
                    <p>
                        You have {`${results?.getTrue}`} correct answers and {`${results?.getFalse}`} wrong answers.
                    </p>
                    <div>Thank You!</div>

                </After>
            ) : (
                <div>
                    <h1>Quiz App</h1>
                    <div>
                        <div>
                            <h2>Question {a[currentQuestionIndex]?.id}</h2>
                            <p>{a[currentQuestionIndex]?.text}</p>
                            {a[currentQuestionIndex]?.options?.map((option: any, optionIndex: any) => (
                                <div key={optionIndex}>
                                    <div
                                        className='items'
                                        onClick={() => handle(option, optionIndex)}
                                        style={{
                                            background: click === optionIndex ? 'rgb(192, 237, 133)' : '',
                                        }}
                                    >
                                        {option}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='btn'>
                        <button onClick={() => handleNextClick(question[currentQuestionIndex]?.answer)}>Next</button>
                    </div>
                    <div className='hint'>
                        <p style={{ textDecoration: 'underline' }} onClick={() => hintClick(question[currentQuestionIndex]?.answer)}>Hint</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Question;




