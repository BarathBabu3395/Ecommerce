import mongoose from "mongoose";

export const connectDB=async() => {
       await mongoose.connect('mongodb://localhost:27017/food-delievery').then(() => console.log("DB connected"));
       
}