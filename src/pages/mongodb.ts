import mongoose from 'mongoose';

async function db() {
  try {
    const uri = "mongodb+srv://next-quiz-app:quiz-app@cluster0.hpes6y2.mongodb.net/productList?retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log('mongodb connected successfully');
  } catch (error) {
    console.error('mongodb connection failed:', error);
  }
}

export default db;
