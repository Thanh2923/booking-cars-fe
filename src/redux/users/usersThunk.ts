import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Đọc baseURL từ môi trường
const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

// Fetch all users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/users`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch users.' });
    }
  }
);


export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async ( id , { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/users/${id}`); // Lấy thông tin người dùng theo id
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch user.' });
    }
  }
);

// Add a new user
export const addUser = createAsyncThunk(
  'users/addUser',
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users`, newUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to add user.' });
    }
  }
);

// Update an existing user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/users/${id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update user.' });
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete user.' });
    }
  }
);
