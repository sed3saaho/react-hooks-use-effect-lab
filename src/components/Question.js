import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return; // exit early!
    }

    const timerId = setTimeout(() => {
      setTimeRemaining((time) => time - 1);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);

  
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  useEffect(() => {
    let timer;

    const startTimer = () => {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    };

    startTimer();

    return () => {
      clearTimeout(timer);
    };
  }, [onAnswered]);
  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => (
        <button key={answer} onClick={() => handleAnswer(index === correctIndex)}>
          {answer}
        </button>
      ))}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;