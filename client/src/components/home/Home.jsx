import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css';
const Home = () => {
  return (
    <div className="homeBtn">
      <Link to="/addQuestionnaire" className='btn'>Create A Questionnaire</Link>
      <Link to="/questionnaires" className='btn'>Take A Questionnaire</Link>
    </div>
  )
}

export default Home