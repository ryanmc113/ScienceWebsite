const aysncHandler = require('express-async-handler')

//@desc get learning goals
// @route GET api/science
//@access private
const getLearningGoals = aysncHandler(async (req, res) => {
    console.log(req.body);
    res.status(200).json({message: 'Time to learn! New Folder!'})
})

//@desc set learning goal
// @route Post api/science
//@access private
const setLearningGoals = aysncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Plase add text field!!!')
    }
    res.status(200).json({message: 'Set learning goal!'})
})

//@desc update learning goal
// @route PUT api/science/:id
//@access private
const updateLearningGoals = aysncHandler(async (req, res) => {
    
    res.status(200).json({message: `Update Learning Goal ${req.params.id}`})
})

//@desc delete learning goal
// @route Delete api/science/:id
//@access private
const deleteLearningGoals = aysncHandler(async (req, res) => {
    res.status(200).json({message: `Delete Learning Goal ${req.params.id}`})
})

module.exports = {
    getLearningGoals,
    setLearningGoals,
    updateLearningGoals,
    deleteLearningGoals
}