import React from 'react'
import { Link } from 'react-router-dom';
import { useGetQuestionnairesQuery } from '../../api/apiSlice';
import Loader from '../loader/Loader';

const QuestionnaireList = () => {
  const { data, isLoading } = useGetQuestionnairesQuery();
  return (
    isLoading ? (<Loader />) : (
      <>
      <div>
        <h2 className="homeHeader">Choose One</h2>
        <div>
        {data?.map((item) => (
          <Link to={`/questionnaires/${item._id}`} key={item._id} className='btn'>{item.title}</Link>
        ))}
        </div>
      </div>
      </>
    )
  )
}

export default QuestionnaireList