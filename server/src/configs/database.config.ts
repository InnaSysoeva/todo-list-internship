import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongoURI = process.env.MONGO_URI || '';

const connectDataBase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};
export default connectDataBase;
