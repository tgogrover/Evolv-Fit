const userModel=require('../models/user');
const { validationResult } = require("express-validator");


exports.createMealPlan=async(req,res)=>{
   const {MealPlan,CalorieRequirement,Email,Name} =req.body;
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
    if(MealPlan.length == 0){
        return res.status(422).json({
            status: "422",
            message: "Meal  must required",
            success: false,
            data: {},
        });
    }
    const validation = MealPlan.filter((element)=>{
        return element.Day === '' || element.Meals === '' 

    });
  //  console.log(validation)

    if(validation.length != 0){
        return res.status(422).json({
            status: "422",
            message: "Meals  must required",
            success: false,
            data: {},
        });    
    }

   
     const  uniqueMealPlanUser=  await  userModel.findOneAndUpdate(
        {$and: [{ Name }, { Email }]}
        ,{ $push: {MealPlan}},{new : true}).exec()
     
       if(uniqueMealPlanUser == null){
        const NewMealPlan = new userModel({
            MealPlan,CalorieRequirement,Email,Name
        });
        await NewMealPlan.save();
        return res.status(200).json({
            status: "200",
            message: "Success",
            success: true,
            data:  {NewMealPlan} ,
        });
        

       }

       return res.status(200).json({
        status: "200",
        message: "Success",
        success: true,
        data:  {uniqueMealPlanUser} ,
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
    const {_id,MealPlan,CalorieRequirement} =req.body;
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
     if(MealPlan.length == 0){
         return res.status(422).json({
             status: "422",
             message: "Meal Items must required",
             success: false,
             data: {},
         });
     }
     const validation = MealPlan.filter((element)=>{
        return element.Day === '' || element.Meals === '' 
 
     });
 
     if(validation.length != 0){
         return res.status(422).json({
             status: "422",
             message: "meal Id, day must required",
             success: false,
             data: {},
         });    
     }
 
    
      const  MealUpdate=  await  userModel.findOneAndUpdate(
         { _id: _id }, 
          {MealPlan ,CalorieRequirement},{new : true}).exec();
        
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


    

