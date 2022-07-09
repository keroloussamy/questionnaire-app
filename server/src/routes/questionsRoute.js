const express = require('express');
const router = new express.Router();
const { createQuestion, deleteQuestion, updateQuestion, getQuestion } = require('../controllers/question');

router.get("/:questionnaireID/:id", getQuestion);
router.post("/:questionnaireID", createQuestion);
router.delete("/:questionnaireID/:id", deleteQuestion);
router.put("/:questionnaireID/:id", updateQuestion);

module.exports = router;