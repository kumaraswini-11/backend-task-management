import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import categorySchema from "../models/category-schema";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const userId = (req as any).user?._id;

  if (!name) {
    return next(createHttpError(400, "Category name is required."));
  }

  try {
    const newCategory = await categorySchema.create({
      name,
      userId,
    });

    return res.status(201).json({
      message: "Category created successfully.",
      category: newCategory,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error while creating the category.")
    );
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).user?._id;

  try {
    const categories = await categorySchema.find({ userId });

    return res.status(200).json({
      message: "Categories retrieved successfully.",
      categories,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error while retrieving categories.")
    );
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId = (req as any).user?._id;

  try {
    const deletedCategory = await categorySchema.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deletedCategory) {
      return next(createHttpError(404, "Category not found"));
    }

    return res.status(200).json({
      message: "Category deleted successfully.",
    });
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error while deleting the category.")
    );
  }
};

export { createCategory, getCategories, deleteCategory };
