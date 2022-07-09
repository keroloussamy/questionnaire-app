import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { useAddNewQuestionnaireMutation, useDeleteQuestionnaireMutation, useGetQuestionnairesQuery } from '../../api/apiSlice';
import Loader from '../loader/Loader';

const AddQuestionnaire = () => {
  const { data, isLoading } = useGetQuestionnairesQuery();
  const [addNewQuestionnaire] = useAddNewQuestionnaireMutation();
  const [deleteQuestionnaire] = useDeleteQuestionnaireMutation();
  const nameInput = useRef(null);

  const handleDeleteClick = async (id) => {
    try {
      await deleteQuestionnaire(id).unwrap();
    } catch (err) {
      console.error('Failed to delete the questionnaire: ', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewQuestionnaire({ title: nameInput.current.value }).unwrap();
      e.target.reset()
    } catch (err) {
      console.error('Failed to add the questionnaire: ', err)
    }
  }

  return (
    isLoading ? (<Loader />) : (
    <div className='addQuestionnaire-section'>
      <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {data?.map((item) => (
          <tr key={item._id}>
            <td>{item.title}</td>
            <td><Link to={`/AddQuestionnaire/${item._id}`} className='detailsBtn'>Details</Link></td>
            <td><button onClick={() => handleDeleteClick(item._id)} className='deleteBtn'>Delete</button></td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
      <div className="form addQuestionnaire-form">
        <form onSubmit={handleSubmit}>
          <h2>Add New Questionnaire</h2>
          <div>
            <label>Questionnaire Name:</label>
            <input type="text" className='input' placeholder='Name ...' ref={nameInput} required />
          </div>
          <input type='submit' className="addBtn" value='Add' />
        </form>
      </div>
    </div>
    )
  )
}

export default AddQuestionnaire