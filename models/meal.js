const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

//defining the schema
var MealSchema=new Schema({

    Name:{
        type:String,
        required:true
    },
  
    Category:{
        type:String,
        enum:["Breakfast","Lunch","Evening Snack","Dinner"],
        default: "Breakfast", 
        required:true
    },
   
    FoodItems:[{
        FoodId:{ 
                type: ObjectId, ref: "Food_Item"    
        },
        Quantity:{
            type:String,
            required:true
        }
    
}]
   

    
},{ timestamps: true });


//exporting User model
module.exports=mongoose.model('Meal',MealSchema)