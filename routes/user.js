const express=require('express');
const router=express.Router();
// const {signupValidation,Validator}=require('../../validators/validators')
const {createMealPlan,updateMeal}=require('../controllers/user')
const {body ,query} = require("express-validator")








router.post('/api/create/mealPlan',[ 
  //  Name, CalorieRequirement,MealPlan
body('Name').notEmpty().withMessage(" name  is required"),
body('CalorieRequirement').notEmpty().withMessage(" calorie requirement is required"),
body('Email').notEmpty().withMessage("Email is required"),
],
createMealPlan);

router.patch('/api/update/mealPlan',[ 
  //  Name, CalorieRequirement,MealPlan
body('_id').notEmpty().withMessage(" _id  is required"),
body('CalorieRequirement').notEmpty().withMessage(" calorie requirement is required"),
],
updateMeal);



module.exports=router;
