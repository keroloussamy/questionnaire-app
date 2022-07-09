import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetQuestionnaireQuery } from '../../api/apiSlice';
import Loader from '../loader/Loader';
import './questionnaire.css';

const Questionnaire = () => {
  const { questionnaireId } = useParams();
  const { data, isLoading } = useGetQuestionnaireQuery(questionnaireId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (e) => {

		if (e.target.value === data?.questions[currentQuestion].answer.toString()) {
			setScore(score + data?.questions[currentQuestion].value);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < data?.questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

  return (
    isLoading ? (<Loader />) : (
    <div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {data?.questions.map(question => question.value).reduce((a, b) => a + b, 0)}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{data?.questions.length}
						</div>
						<div className='question-text'>{data?.questions[currentQuestion].question}?</div>
					</div>
					<div className='answer-section'>
            <button className='question-btn' value="true" onClick={handleAnswerOptionClick}>TRUE</button>
            <button className='question-btn' value="false" onClick={handleAnswerOptionClick}>FALSE</button>
					</div>
				</>
			)}
		</div>
    )
  )
}

export default Questionnaire