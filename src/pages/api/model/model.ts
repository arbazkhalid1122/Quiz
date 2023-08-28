import mongoose from 'mongoose';


const quizSchema = new mongoose.Schema({
  name: String ,
  email: String,
});

export const QuizModel = mongoose.models.products || mongoose.model("products",quizSchema)
