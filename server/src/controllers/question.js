const Questionnaire = require('../models/Questionnaire');

const createQuestion = async (req, res, next) => {
  const questionnaireID = req.params.questionnaireID;
  const questionnaire = await Questionnaire.findById(questionnaireID);
  if (!questionnaire) {
    return res.status(404).json({ msg: `Questionnaire With this id: ${questionnaireID} doesn't exist.` });
  }

  questionnaire.questions.push(req.body);
  await questionnaire.save();
  res.status(201).json(questionnaire);
};

const deleteQuestion = async (req, res, next) => {
  const { id: questionID, questionnaireID } = req.params;
  const questionnaire = await Questionnaire.findById(questionnaireID);
  if (!questionnaire) {
    return res.status(404).json({ msg: `Questionnaire With this id: ${questionnaireID} doesn't exist.` });
  }

  const question = await questionnaire.questions.id(questionID);
  if (!question) {
    return res.status(404).json({ msg: `Question With this id: ${questionID} doesn't exist.` });
  }

  questionnaire.questions.pull(questionID);
  await questionnaire.save();
  res.status(200).json({ msg: 'Question has been deleted.' });
};

const updateQuestion = async (req, res, next) => {
  const { id: questionID, questionnaireID } = req.params;
  const questionnaire = await Questionnaire.findById(questionnaireID);
  if (!questionnaire) {
    return res.status(404).json({ msg: `Questionnaire With this id: ${questionnaireID} doesn't exist.` });
  }

  const question = await questionnaire.questions.id(questionID);
  if (!question) {
    return res.status(404).json({ msg: `Question With this id: ${questionID} doesn't exist.` });
  }

  await Questionnaire.updateOne({"questions._id": questionID}, { $set: { "questions.$": req.body } }, { new: true, runValidators: true });

  res.status(200).json({ msg: 'Question has been updated.' });
};

const getQuestion = async (req, res, next) => {
  const { id: questionID, questionnaireID } = req.params;
  const questionnaire = await Questionnaire.findById(questionnaireID);
  if (!questionnaire) {
    return res.status(404).json({ msg: `Questionnaire With this id: ${questionnaireID} doesn't exist.` });
  }

  const question = await questionnaire.questions.id(questionID);
  if (!question) {
    return res.status(404).json({ msg: `Question With this id: ${questionID} doesn't exist.` });
  }

  res.status(200).json(question);
};

module.exports = {
  createQuestion, deleteQuestion, updateQuestion, getQuestion
}