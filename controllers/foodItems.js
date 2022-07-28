const foodItemModel=require('../models/foodItems');
const { validationResult } = require("express-validator");

exports.MealProteinAlgorithm = async(req,res)=>{
    const {quantity,amount}=req.query;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: "422",
            message: errors.array()[0].msg,
            success: false,
            data: {},
        });
    }
    try {
        const foodItemInDB = await foodItemModel.find({});
        if(foodItemInDB.length == 0){
            return res.status(401).json({
                status: "401",
                success: false,
                message: "No Food Items exist in Database",
                data: {},
              });           
        }
        const quantityRounding = Math.round(quantity);
        const amountRounding = Math.round(amount);
        const algo = foodItemInDB.map((element)=>{
            element.Calories= (element.Calories *quantityRounding *amountRounding)/element.ItemWeight ;
            element.Protein = element.Calories/4;
          //  element.ItemWeight = 
            return element
        

        })
    const sort =  await algo.sort((a,b)=>{return b.Calories - a.Calories})
        
       // console.log(sort)

        return res.status(200).json({
            status: "200",
            success: false,
            message: "Algorithm result =>",
            data: {sort},
          });           

        
    } catch (error) {
        return res.status(200).json({
            status: "500",
            message: "Internal Server Error",
            success: false,
            data: { error }
        })
    }
        
    }





exports.createFoodItems=async(req,res)=>{
   const {foodItemsArray} =req.body;
   if(foodItemsArray.length == 0){
    return res.status(422).json({
        status: "422",
        message: "Food Items's Information must required",
        success: false,
        data: {},
    });

   }
   try {
   // console.log(foodItemsArray)
    const validation = foodItemsArray.filter((element)=>{
        return element.Name === '' || element.Calories === '' 
        || element.Carb === '' || element.Protein === '' || element.Fat === '' || 
        element.AcceptedUnits === '' || element.ItemWeight === ''

    })
    console.log(validation)
    if(validation.length == 0){
        const FoodItems = await foodItemModel.insertMany(foodItemsArray)
        if(FoodItems){
            return res.status(200).json({
                status: "200",
                message: "Success",
                success: true,
                data: { FoodItems },
            });
        }
        
    }
    return res.status(422).json({
        status: "422",
        message: "Name,Calories,Carb,Protein,Fat,Accepted Units, Item Weight must required",
        success: false,
        data: {},
    });


    
    
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        status: "500",
        message: "Internal Server Error",
        success: false,
        data: { error }
    })
   }
  

}
    




