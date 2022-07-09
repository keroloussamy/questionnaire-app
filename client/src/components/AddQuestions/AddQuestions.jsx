import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useAddNewQuestionMutation, useDeleteQuestionMutation, useGetQuestionnaireQuery } from '../../api/apiSlice';
import Loader from '../loader/Loader';

const AddQuestions = () => {
  const { questionnaireId } = useParams();
  const { data, isLoading } = useGetQuestionnaireQuery(questionnaireId);
  const [ addNewQuestion ] = useAddNewQuestionMutation();
  const [ deleteQuestion ] = useDeleteQuestionMutation();
  const [questionInput, setQuestionInput] = useState();
  const [answerInput, setAnswerInput] = useState();
  const [valueInput, setValueInput] = useState();
  
  const handleQuestionInputOnChange = (e) => setQuestionInput(e.target.value);
  const handleAnswerInputOnChange = (e) => setAnswerInput(e.target.value);
  const handleValueInputOnChange = (e) => setValueInput(e.target.value);
  

  const handleDeleteClick = async (questionId) => {
    try {
      await deleteQuestion({ questionnaireId, questionId }).unwrap();
    } catch (err) {
      console.error('Failed to delete the question: ', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let questionData = { question: questionInput, answer: answerInput, value: valueInput };
      await addNewQuestion({questionnaireId, questionData}).unwrap();
      e.target.reset()
    } catch (err) {
      console.error('Failed to add the question: ', err)
    }
  }

  return (
    isLoading ? (<Loader />) : (
    <div className='addQuestionnaire-section'>
      <div>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Value</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {data?.questions.map((item) => (
          <tr key={item._id}>
            <td>{item.question}</td>
            <td>{item.answer ? "True" : "False"}</td>
            <td>{item.value}</td>
            <td><Link to={`/AddQuestionnaire/${questionnaireId}/${item._id}`} className='detailsBtn'>Edit</Link></td>
            <td><button onClick={() => handleDeleteClick(item._id)} className='deleteBtn'>Delete</button></td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
      <div className="form">
        <h2>Add New Question</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Question:</label>
            <input type="text" placeholder="Question text" className='input' onChange={handleQuestionInputOnChange} required />
          </div>
          <div>
            <label>Answer:</label>
            <div className='radio-container' onChange={handleAnswerInputOnChange}> 
              <input type="radio" value='true' id='true' name='answerInput' required/>
              <label htmlFor='true'>True</label>
              <input type="radio" value='false' id='false' name='answerInput' required/>
              <label htmlFor='false'>False</label>
            </div>
          </div>
          <div>
            <label>Value:</label>
            <input type="number" min='0.25' max='1' step="0.25" placeholder="Value" className='input' onChange={handleValueInputOnChange} required/>
          </div>
          <input type='submit' className="addBtn" value='Add' />
        </form>
      </div>
    </div>
    )
  )
}

export default AddQuestions