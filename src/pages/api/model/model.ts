import mongoose from 'mongoose';


const quizSchema = new mongoose.Schema({
  _id: String,
  id: Number ,
  category: String,
  text: String,
  options: Array,
  answer: String,
});

export const QuizModel = mongoose.models.products || mongoose.model("products",quizSchema)
