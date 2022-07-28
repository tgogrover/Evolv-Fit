const express=require('express');
const router=express.Router();
const {body ,query} = require("express-validator")
const {createFoodItems,MealProteinAlgorithm}=require('../controllers/foodItems')









router.post('/api/create/foodItem',createFoodItems);

router.get('/api/meal/algorithm',
[

    query('quantity')
    .notEmpty().withMessage(" quantity is required")
    .isNumeric()
     .withMessage("Invalid quantity "),
     query('amount')
    .notEmpty().withMessage(" amount is required")
    .isNumeric()
     .withMessage("Invalid amount "),
   
  ],
MealProteinAlgorithm
);



module.exports=router;
