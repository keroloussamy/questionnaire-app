const express = require('express');
const router = new express.Router();
const { getQuestionnaires, createQuestionnaire, getQuestionnaire, deleteQuestionnaire, updateQuestionnaire } = require('../controllers/questionnaire');

router.get("/", getQuestionnaires);
router.get("/:id", getQuestionnaire);
router.post("/", createQuestionnaire);
router.put("/:id", updateQuestionnaire);
router.delete("/:id", deleteQuestionnaire);


module.exports = router;