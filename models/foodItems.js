const mongoose=require('mongoose');
const Schema = mongoose.Schema

//defining the schema
var FoodItemSchema=new Schema({

    Name:{
        type:String,
        required:true,
    },
    Calories:{
        type:Number,
        required:true,
        minlength:6
    },
    Protein:{
        type:Number,
        required:true,
        minlength:6
    },
    Carb:{
        type:Number,
        required:true,
        minlength:6
    },
    Fat:{
        type:Number,
        required:true,
        minlength:6
    },
    AcceptedUnits:{
        type:String,
        enum:["ml","liter","kg","g","item"],
        default: "g", required:true},
   
    ItemWeight:{
        type:Number,
        required:true,
    
}
   

    
},{ timestamps: true });


//exporting User model
module.exports=mongoose.model('Food_Item',FoodItemSchema)