//require pakages
const express=require('express');
const app=express();
const mongoose=require("mongoose");
const api_FoodItem_Route=require('./routes/foodItem');
const api_Meal_Route=require('./routes/meal');
const api_MealPlan_Route=require('./routes/user');


require('dotenv').config();



//mongoose connection
mongoose.connect('mongodb://localhost:27017/EVOLV_FIT',
{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('error',(err)=>{
console.log(' error connecting with mongodb with'+ err)
});

mongoose.connection.on('connected',()=>{
console.log('mongodb is connected with server successfully')});

//middlewares
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 

app.use(api_FoodItem_Route);
app.use(api_Meal_Route);
app.use(api_MealPlan_Route);








app.listen(process.env.PORT,()=>{
    console.log(`server is successfully running on server ${process.env.PORT}`)
})