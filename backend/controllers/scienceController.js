const aysncHandler = require('express-async-handler')

const Goal = require('../models/goalModel');
const User = require('../models/userModel');
//@desc get learning goals
// @route GET api/science
//@access private
const getLearningGoals = aysncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id})
    res.status(200).json({goals})
})

//@desc set learning goal
// @route Post api/science
//@access private
const setLearningGoals = aysncHandler(async (req, res) => {
    
    if(!req.body.text){
        res.status(400)
        throw new Error('Plase add text field!!!')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id

    })
    res.status(200).json(goal)
})

//@desc update learning goal
// @route PUT api/science/:id
//@access private
const updateLearningGoals = aysncHandler(async (req, res) => {
    
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const goalUpdated = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    })
    res.status(200).json(goalUpdated)
})

//@desc delete learning goal
// @route Delete api/science/:id
//@access private
const deleteLearningGoals = aysncHandler(async (req, res) => {
     const goal = await Goal.findById(req.params.id);

     if(!goal){
        res.status(400);
        throw new Error('Goal was not found');
     }

     const user = await User.findById(req.user.id)
     //Check for user
     if(!user){
         res.status(401)
         throw new Error('User not found')
     }
     if(goal.user.toString() !== user.id){
         res.status(401)
         throw new Error('User not authorized')
     }
     const goalUpdated = await Goal.findByIdAndUpdate(req.params.id, req.body,{
         new:true
     })
    //await goal.remove()
    await Goal.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getLearningGoals,
    setLearningGoals,
    updateLearningGoals,
    deleteLearningGoals
}