const express = require('express')
const router = express.Router()
const { getLearningGoals, 
        setLearningGoals, 
        updateLearningGoals, 
        deleteLearningGoals } 
        = require('../controllers/scienceController')

router.route('/').get(getLearningGoals).post(setLearningGoals);

router.route('/:id').delete(deleteLearningGoals).put(updateLearningGoals)

module.exports = router