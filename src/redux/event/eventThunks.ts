import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Cấu hình baseURL từ env
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Fetch tất cả sự kiện
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async ({ page, limit }) => {
    const response = await axios.get(`${baseURL}/event`, {
      params: { page, limit },
    });
    return response.data;
  }
);

// Thêm sự kiện mới
export const addEvent = createAsyncThunk(
  'events/addEvent',
  async ({ event_name, image, event_date, description }) => {
    const formData = new FormData();
    formData.append('event_name', event_name);
    formData.append('image', image);  // Gửi ảnh
    formData.append('event_date', event_date);
    formData.append('description', description);

    const response = await axios.post(`${baseURL}/event`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
);

// Cập nhật sự kiện
export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({id, event_name,image,event_date,description}) => {
    
    const formData = new FormData();
    formData.append('event_name', event_name);
    formData.append('image', image);
    formData.append('event_day', event_date);
    formData.append('description', description);

    const response = await axios.put(`${baseURL}/event/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
);

// Xóa sự kiện
export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (id) => {
    await axios.delete(`${baseURL}/event/${id}`);
    return id;
  }
);
