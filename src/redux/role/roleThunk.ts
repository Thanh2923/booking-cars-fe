import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL; // Đảm bảo URL API của bạn được cấu hình đúng

// Interface cho Role
export interface Role {
  _id: string;
  roleName: string;
}

// Fetch role
export const fetchRole = createAsyncThunk<Role[]>(
  'role/fetchRole',
  async () => {
    const response = await axios.get(`${baseURL}/role`);
    return response.data;
  }
);

// Add new role
export const addRole = createAsyncThunk<Role, { roleName: string }>(
  'role/addRole',
  async (newRole) => {
    const response = await axios.post(`${baseURL}/role`, newRole);
    return response.data;
  }
);

// Update role
export const updateRole = createAsyncThunk<Role, { id: string; roleName: string }>(
  'role/updateRole',
  async ({ id, roleName }) => {
    const response = await axios.put(`${baseURL}/role/${id}`, { roleName });
    return response.data;
  }
);

// Delete role
export const deleteRole = createAsyncThunk<string, string>(
  'role/deleteRole',
  async (id) => {
    await axios.delete(`${baseURL}/role/${id}`);
    return id; // Trả về id đã xóa để cập nhật state
  }
);
