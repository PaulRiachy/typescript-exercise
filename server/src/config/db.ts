import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;
  const mongoName = process.env.MONGO_NAME;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in .env");
  }

  if (!mongoName) {
    throw new Error("MONGO_NAME is not defined in .env");
  }

  await mongoose.connect(mongoUri, {
    dbName: mongoName
  });

  console.log(`MongoDB connected to database: ${mongoName}`);
};