import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddQuestionnaire from "./components/addQuestionnaire/AddQuestionnaire";
import AddQuestions from "./components/AddQuestions/AddQuestions";
import EditQuestions from "./components/editQuestions/EditQuestions";
import Home from "./components/home/Home";
import Questionnaire from "./components/questionnaire/Questionnaire";
import QuestionnaireList from "./components/questionnaireList/QuestionnaireList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="questionnaires">
            <Route index element={<QuestionnaireList />} />
            <Route path=":questionnaireId" element={<Questionnaire />} />
          </Route>
          <Route path="addQuestionnaire">
            <Route index element={<AddQuestionnaire />} />
            <Route path=":questionnaireId" element={<AddQuestions />} />
            <Route path=":questionnaireId/:questionId" element={<EditQuestions />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
