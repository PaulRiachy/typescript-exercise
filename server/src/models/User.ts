import mongoose, { Document, Schema } from "mongoose";

export type Gender = "male" | "female";

export type AgeBracket =
  | "1-17"
  | "18-29"
  | "30-49"
  | "50-69"
  | "70-89";

export type SalaryBracket =
  | "0-1999"
  | "2000-3999"
  | "4000-5999"
  | "6000-7999"
  | "8000-9999"
  | "other";

export type EducationType = "school" | "university";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  gender: Gender;
  ageBracket?: AgeBracket;
  salaryBracket?: SalaryBracket;
  customSalary?: number;
  education?: EducationType;
  educationYear?: string;
  major?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true
    },

    ageBracket: {
      type: String,
      enum: ["1-17", "18-29", "30-49", "50-69", "70-89"]
    },

    salaryBracket: {
      type: String,
      enum: [
        "0-1999",
        "2000-3999",
        "4000-5999",
        "6000-7999",
        "8000-9999",
        "other"
      ]
    },

    customSalary: {
      type: Number,
      min: 0
    },

    education: {
      type: String,
      enum: ["school", "university"]
    },

    educationYear: {
      type: String
    },

    major: {
      type: String,
      trim: true
    },

    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model<IUser>("User", userSchema);