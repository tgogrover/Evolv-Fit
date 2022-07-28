const express=require('express');
const router=express.Router();
const {createMeal,updateMeal}=require('../controllers/meal')
const {body ,query} = require("express-validator")








router.post('/api/create/meal',[ 
    //Name,Category,FoodItems
body('Name').notEmpty().withMessage(" name  is required"),
body('Category').notEmpty().withMessage(" category is required")
],
createMeal);

router.patch('/api/update/meal',[ 
    //Name,Category,FoodItems
body('_id').notEmpty().withMessage(" _id  is required"),

],
updateMeal);



module.exports=router;
