import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditQuestionMutation, useGetQuestionQuery } from '../../api/apiSlice';
import Loader from '../loader/Loader';

const EditQuestions = () => {
  const { questionnaireId, questionId  } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetQuestionQuery({questionnaireId, questionId});
  const [ editQuestion ] = useEditQuestionMutation();
  const [questionInput, setQuestionInput] = useState();
  const [answerInput, setAnswerInput] = useState();
  const [valueInput, setValueInput] = useState();

  useEffect(() => {
    if (data) {
      setQuestionInput(data.question);
      setAnswerInput(data.answer);
      setValueInput(data.value);
    }
  }, [data])

  const handleQuestionInputOnChange = (e) => setQuestionInput(e.target.value);
  const handleAnswerInputOnChange = (e) => setAnswerInput(e.target.value);
  const handleValueInputOnChange = (e) => setValueInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let questionData = { question: questionInput, answer: answerInput, value: valueInput };
      await editQuestion({questionnaireId, questionId, questionData}).unwrap();
      navigate("/AddQuestionnaire/" + questionnaireId);
    } catch (err) {
      console.error('Failed to add the question: ', err)
    }
  }

  return (
    isLoading ? (<Loader />) : (
      <div className="form">
        <h2>Add New Question</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Question:</label>
            <input type="text" placeholder="Question text" className='input' defaultValue={data?.question} onChange={handleQuestionInputOnChange} required />
          </div>
          <div>
            <label>Answer:</label>
            <div className='radio-container' onChange={handleAnswerInputOnChange}>
              <input type="radio" value='true' id='true' name='answerInput' defaultChecked={data?.answer} required/>
              <label htmlFor='true'>True</label>
              <input type="radio" value='false' id='false' name='answerInput' defaultChecked={!data?.answer} required/>
              <label htmlFor='false'>False</label>
            </div>
          </div>
          <div>
            <label>Value:</label>
            <input type="number" min='0.25' max='1' step="0.25" placeholder="Value" className='input' defaultValue={data?.value} onChange={handleValueInputOnChange} required/>
          </div>
          <input type='submit' className="addBtn" value='Edit' />
        </form>
      </div>
    )
  )
}

export default EditQuestions