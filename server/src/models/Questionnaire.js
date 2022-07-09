const mongoose = require('mongoose');

// Schemas
const QuestionnaireSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: [{
      question: { type: String, required: true },
      answer: { type: Boolean, required: true },
      value: { 
        type: Number, 
        min: [0.25, 'Value should be equal or more than 0.25'], 
        max: [1, 'Value should be equal or less than 1'], 
        required: true },
    }]
  },
  { timestamps: true }
);

const Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);

module.exports = Questionnaire;