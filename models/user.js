const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;


//defining the schema
var UserSchema=new Schema({

    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    CalorieRequirement:{
        type:Number,
        required:true,
        minlength:6
    },
   MealPlan:[
    {
    Day:{
        type:String,
    },
    Meals:{
        type: ObjectId, ref: "Meal" 
    }
}
   ]

    
},{ timestamps: true });


//exporting User model
module.exports=mongoose.model('User',UserSchema)