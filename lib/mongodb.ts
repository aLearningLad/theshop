import mongoose from "mongoose";

export const connectToDB = async () => {
  const connectionString = process.env.MONGO_URI;

  try {
    if (connectionString) {
      await mongoose.connect(connectionString);
    } else {
      throw new Error("Connection string is undefined");
    }
  } catch (error) {
    console.log(`Unable to connect to DB: ${error}`);
  }
};
