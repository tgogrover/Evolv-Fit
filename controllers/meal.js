const mealModel=require('../models/meal');
const { validationResult } = require("express-validator");


exports.createMeal=async(req,res)=>{
   const {Name,Category,FoodItems} =req.body;
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
       return res.status(200).json({
           status: "422",
           message: errors.array()[0].msg,
           success: false,
           data: {},
       });
   }

 
   try {
    if(FoodItems.length == 0){
        return res.status(422).json({
            status: "422",
            message: "Food Items must required",
            success: false,
            data: {},
        });
    }
    const validation = FoodItems.filter((element)=>{
        return element.FoodId === '' || element.Quantity === '' 

    });

    if(validation.length != 0){
        return res.status(422).json({
            status: "422",
            message: "food Id, Quantity must required",
            success: false,
            data: {},
        });    
    }

   
     const  uniqueFoodItemCheck=  await  mealModel.findOneAndUpdate(
        {$and: [{ Name: Name }, { Category: Category }]},
        { $push: {FoodItems : FoodItems}},{new : true}).exec()
        if(uniqueFoodItemCheck == null){
            const Meal = new mealModel({
                Name,
                Category,
                FoodItems
            });
            await Meal.save();
            return res.status(200).json({
                status: "200",
                message: "Success",
                success: true,
                data:  {Meal} ,
            });

        }

        return res.status(200).json({
            status: "200",
            message: "Success",
            success: true,
            data:  {uniqueFoodItemCheck} ,
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


exports.updateMeal=async(req,res)=>{
    const {_id,FoodItems} =req.body;
    const errors = validationResult(req);
 
    if (!errors.isEmpty()) {
        return res.status(200).json({
            status: "422",
            message: errors.array()[0].msg,
            success: false,
            data: {},
        });
    }
 
  
    try {
     if(FoodItems.length == 0){
         return res.status(422).json({
             status: "422",
             message: "Food Items must required",
             success: false,
             data: {},
         });
     }
     const validation = FoodItems.filter((element)=>{
         return element.FoodId === '' || element.Quantity === '' 
 
     });
 
     if(validation.length != 0){
         return res.status(422).json({
             status: "422",
             message: "food Id, Quantity must required",
             success: false,
             data: {},
         });    
     }
 
    
      const  MealUpdate=  await  mealModel.findOneAndUpdate(
         { _id: _id }, 
          {FoodItems },{new : true}).exec();
        
 if(MealUpdate){
    return res.status(200).json({
        status: "200",
        message: "Success",
        success: true,
        data:  {MealUpdate} ,
    });

 }
         
     
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



 
    

