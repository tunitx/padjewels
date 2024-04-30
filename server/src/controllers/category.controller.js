import Category from "../models/categories.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new CustomError("Category name is required", 401);
  }

  const category = await Category.create({
    name,
  });

  res.status(200).json({
    success: true,
    message: "Category was created successfully",
    category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id: categoryId } = req.params;

  if (!name) {
    throw new CustomError("Category name is required", 401);
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    {
      name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCategory) {
    throw new CustomError("Category not found", 401);
  }

  res.status(200).json({
    success: true,
    message: "Category was updated successfully",
    updatedCategory,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id: categoryId } = req.params;

  const categoryToDelete = await Category.findByIdAndDelete(categoryId);

  if (!categoryToDelete) {
    throw new CustomError("Category to be deleted is not found", 401);
  }
  res.status(200).json({
    success: true,
    message: "Category was deleted successfully",
  });
});

export const getAllCategory = asyncHandler(async (req, res) => {
  const categorys = await Category.find({});

  if (!categorys) {
    throw new CustomError("No Categorys found", 401);
  }
  res.status(200).json({
    success: true,
    categorys,
  });
});
