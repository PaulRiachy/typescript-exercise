import { Request, Response } from "express";
import { User } from "../models/User";

export const getUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve users"
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        message: "User not found"
      });

      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Invalid user ID"
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      gender,
      ageBracket,
      salaryBracket,
      customSalary,
      education,
      educationYear,
      major
    } = req.body;

    if (!firstName || !lastName || !gender) {
      res.status(400).json({
        message: "First name, last name and gender are required"
      });

      return;
    }

    const user = new User({
      firstName,
      lastName,
      gender,
      ageBracket: ageBracket || undefined,
      salaryBracket: salaryBracket || undefined,
      customSalary:
        customSalary !== undefined && customSalary !== ""
          ? Number(customSalary)
          : undefined,
      education: education || undefined,
      educationYear: educationYear || undefined,
      major: major || undefined,
      image: req.file
        ? `data:${req.file.mimetype};base64,${req.file.buffer.toString(
            "base64"
          )}`
        : undefined
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Failed to create user"
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      gender,
      ageBracket,
      salaryBracket,
      customSalary,
      education,
      educationYear,
      major
    } = req.body;

    const updateData: Record<string, unknown> = {
      firstName,
      lastName,
      gender,
      ageBracket: ageBracket || undefined,
      salaryBracket: salaryBracket || undefined,
      customSalary:
        customSalary !== undefined && customSalary !== ""
          ? Number(customSalary)
          : undefined,
      education: education || undefined,
      educationYear: educationYear || undefined,
      major: major || undefined
    };

    if (req.file) {
      updateData.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      res.status(404).json({
        message: "User not found"
      });

      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Failed to update user"
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({
        message: "User not found"
      });

      return;
    }

    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Failed to delete user"
    });
  }
};