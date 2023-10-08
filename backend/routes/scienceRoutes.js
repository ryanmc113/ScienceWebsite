const express = require('express')
const router = express.Router()
const { getLearningGoals, 
        setLearningGoals, 
        updateLearningGoals, 
        deleteLearningGoals } 
        = require('../controllers/scienceController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getLearningGoals).post(protect, setLearningGoals);

router.route('/:id').delete(protect, deleteLearningGoals).put(protect, updateLearningGoals)

module.exports = router