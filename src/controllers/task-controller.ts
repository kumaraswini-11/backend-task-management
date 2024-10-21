import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import categorySchema from "../models/category-schema";
import taskSchema from "../models/task-schema";
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from "../config/contants";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    description,
    status,
    dueDate,
    category: categoryId,
  } = req.body;
  const userId = (req as any).user?._id;

  if (!title) {
    return next(createHttpError(400, "Task title is required."));
  }

  try {
    if (categoryId) {
      const categoryExists = await categorySchema.findOne({
        _id: categoryId,
        userId,
      });
      if (!categoryExists) {
        return next(createHttpError(400, "Category does not exist."));
      }
    }

    const newTask = await taskSchema.create({
      title,
      description,
      status: status,
      dueDate,
      categoryId,
      userId,
    });

    return res.status(201).json({
      message: "Task created successfully.",
    });
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error while creating the task.")
    );
  }
};

// Retrieve all the tasks for the logged-in user with pagination support
const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?._id;
  const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.query as {
    page?: string;
    limit?: string;
  };

  const parsedPage = Math.max(1, Number(page));
  const parsedLimit = Math.min(MAX_LIMIT, Math.max(1, Number(limit)));

  try {
    const totalCount = await taskSchema.countDocuments({ userId });
    const totalPages = Math.ceil(totalCount / parsedLimit);

    const tasks = await taskSchema
      .find({ userId })
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit)
      .sort({ createdAt: -1 })
      .populate("categoryId", "name");

    const formattedTasks = tasks.map(
      ({
        _id,
        title,
        description,
        status,
        dueDate,
        userId,
        createdAt,
        updatedAt,
        categoryId,
      }) => ({
        _id,
        title,
        description,
        status,
        dueDate,
        // @ts-ignore
        category: categoryId?.name,
        userId,
        createdAt,
        updatedAt,
      })
    );

    return res.status(200).json({
      message: "Tasks retrieved successfully.",
      currentPage: parsedPage,
      totalPages,
      totalCount,
      tasks: formattedTasks,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error while retrieving tasks.")
    );
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id: taskId } = req.params;
  const {
    title,
    description,
    status,
    dueDate,
    category: categoryId,
  } = req.body;
  const userId = (req as any).user?._id;

  try {
    const task = await taskSchema.findOne({ _id: taskId, userId });
    if (!task) {
      return next(createHttpError(404, "Task not found."));
    }

    if (categoryId) {
      const categoryExists = await categorySchema.findOne({
        _id: categoryId,
        userId,
      });
      if (!categoryExists) {
        return next(createHttpError(400, "Category does not exist."));
      }
    }

    // Update task fields
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.dueDate = dueDate ?? task.dueDate;
    task.categoryId = categoryId ?? task.categoryId;
    await task.save();

    return res.status(200).json({
      message: "Task updated successfully.",
    });
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error while updating the task.")
    );
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id: taskId } = req.params;
  const userId = (req as any).user?._id;

  try {
    const task = await taskSchema.findOne({ _id: taskId, userId });
    if (!task) {
      return next(createHttpError(404, "Task not found."));
    }

    await task.deleteOne();

    return res.status(200).json({
      message: "Task deleted successfully.",
    });
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error while deleting the task.")
    );
  }
};

export { createTask, getTasks, updateTask, deleteTask };
