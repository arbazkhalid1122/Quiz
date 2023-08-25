import {  notification } from 'antd';
import React, {  useState } from 'react';
import { After } from '..';

interface Question {
    id: number;
    text: string;
    options: string[];
    answer: string;
}

interface QuestionProps {
    qType: string;
}

const Array: { [key: string]: Question[] } = {
    frontend: [
        {
            id: 1,
            text: 'frontenmd?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
        {
            id: 2,
            text: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
        {
            id: 3,
            text: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
    ],
    backend: [
        {
            id: 1,
            text: 'backend?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
        {
            id: 2,
            text: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
        {
            id: 3,
            text: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
    ],
};


const Question: React.FC<QuestionProps> = (props) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [click, setClick] = useState<number | null>(null); 
    const [selectItem, setSelectItems] = useState(null)
    const [thank, setThank] = useState(false)
    const [optionArray, setOptionArray] = useState<any[]>([]); 
    const [correct, setCorrect] = useState<number | null>(null)
    const [wrong, setWrong] = useState<number | null>(null)

    const currentQuestions = Array[props.qType] || [];

    const currentQuestion = currentQuestions[currentQuestionIndex];


    const handle = (option: any, index: number) => {
        setSelectItems(option)
        setClick(index);
        setOptionArray((prevOptions: any) => [...prevOptions, option]);
    };

    console.log(props);

    const handleNextClick = (answer: any) => {
        if (selectItem) {
            if (currentQuestionIndex < Array[props.qType].length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setClick(null)
                setThank(false)
                setSelectItems(null)
            }
            else {
                const results = Array[props.qType].map((item, index) => item.answer === optionArray[index]);
                const getTrue = results.filter((item) => item).length
                setCorrect(getTrue)
                const getFalse = results.length - getTrue;
                setWrong(getFalse)
                setThank(true)
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
                        {currentQuestion && (
                            <div>
                                <h2>Question {currentQuestion.id}</h2>
                                <p>{currentQuestion.text}</p>
                                {currentQuestion.options.map((option, index) => (
                                    <div key={index}>
                                        <div
                                            className='items'
                                            onBlur={() => setClick(null)}
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
                            <button onClick={() => handleNextClick(currentQuestion.answer)}>Next</button>
                        </div>
                        <div className='hint'>
                            <p style={{textDecoration:'underline'}} onClick={() => hintClick(currentQuestion.answer)}>Hint</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );  
};

export default Question;

