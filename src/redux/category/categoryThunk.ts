import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category } from './categorySlice';


 const  baseURL = process.env.NEXT_PUBLIC_API_URL 
  

// Fetch categories
export const fetchCategories = createAsyncThunk<Category[]>(
  'category/fetchCategories',
  async ({ page, limit }) => {
    const response = await axios.get(`${baseURL}/category`,
      {
        params: { page, limit }
      }
    );
    return response.data;
  }
);

// Add new category
export const addCategory = createAsyncThunk<Category, Category>(
  'category/addCategory',
  async (newCategory) => {
    const response = await axios.post(`${baseURL}/category`, newCategory);
    return response.data;
  }
);

// Update category
export const updateCategory = createAsyncThunk<Category, Category>(
  'category/updateCategory',
  async ({ id, category_name }) => {
    
    const response = await axios.put(`${baseURL}/category/${id}`, category_name);
    return response.data;
  }
);

// Delete category
export const deleteCategory = createAsyncThunk<number, number>(
  'category/deleteCategory',
  async (id) => {
    await axios.delete(`${baseURL}/category/${id}`);
    return id;
  }
);
