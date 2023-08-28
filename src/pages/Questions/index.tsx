import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { After } from '..';
import axios from 'axios';
import { useStore } from '@/Store/store';

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
    const [question, setQuestion] = useState<any[]>([]);
    const [results, setResults] = useState<ResponseData | null>(null);


    const handle = (option: any, index: number) => {
        setSelectItems(option)
        setClick(index);
        setOptionArray((prevOptions: any) => [...prevOptions, option]);
    };


    const {
        quizStore: { getApii },
    } = useStore(null);


    useEffect(() => {
        const load = async () => {
            const res = await getApii()
            setQuestion(res)
        }
        load()
    }, [])



    const handleNextClick = async (answer: any) => {
        if (selectItem) {
            if (currentQuestionIndex < question.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setClick(null);
                setThank(false);
                setSelectItems(null);
            } else {
                const type = props.qType;
                const post = axios.post('http://localhost:3000/api/route/hello', { optionArray, type });
                const res = await post;
                setResults(res.data);
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
                        {question?.filter((item) => item.category === props.qType).slice(currentQuestionIndex, currentQuestionIndex + 1)
                            .map((item, questionIndex) => (
                                <div key={questionIndex}>
                                    <h2>Question {item?.id}</h2>
                                    <p>{item?.text}</p>
                                    {item?.options?.map((option: any, optionIndex: any) => (
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
                                </div>))}
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




