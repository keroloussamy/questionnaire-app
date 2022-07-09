const Questionnaire = require('../models/Questionnaire');

const createQuestionnaire = async (req, res, next) => {
  const newQuestionnaire = new Questionnaire(req.body);
  const savedQuestionnaire = await newQuestionnaire.save();
  res.status(201).json(savedQuestionnaire);
};

const getQuestionnaires = async (req, res, next) => {
  const questionnaires = await Questionnaire.find({});
  res.status(200).json(questionnaires);
};

const getQuestionnaire = async (req, res, next) => {
  const { id: questionnaireID } = req.params;
  const questionnaire = await Questionnaire.findById(questionnaireID);

  if (!questionnaire) {
    return res.status(404).json({ msg: `Questionnaire With this id: ${questionnaireID} doesn't exist.` });
  }
  res.status(200).json(questionnaire);
};

const deleteQuestionnaire = async (req, res, next) => {
  const { id: questionnaireID } = req.params;
  const questionnaire = await Questionnaire.findById(questionnaireID);
  if (!questionnaire) {
    return res.status(404).json({ msg: `Questionnaire With this id: ${questionnaireID} doesn't exist.` });
  }
  await Questionnaire.deleteOne({ _id: questionnaire._id });
  res.status(200).json("Questionnaire has been deleted.");
};

const updateQuestionnaire = async (req, res, next) => {
  const { id: questionnaireID } = req.params;
  const questionnaire = await Questionnaire.findById(questionnaireID);
  if (!questionnaire) {
    return res.status(404).json({ msg: `Questionnaire With this id: ${questionnaireID} doesn't exist.` });
  }

  const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(questionnaireID, req.body, { new: true, runValidators: true }); 
  res.status(200).json(updatedQuestionnaire);
};


module.exports = {
  getQuestionnaires, createQuestionnaire, getQuestionnaire, deleteQuestionnaire, updateQuestionnaire
}