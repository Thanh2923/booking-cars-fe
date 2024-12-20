import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Car } from "@/components/cars/Car";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Fetch all cars
export const fetchCars = createAsyncThunk<Car[], void>(
  "car/fetchCars",
  async (_, { rejectWithValue }) => {
    const response = await axios.get(`${baseURL}/car/getAllCars`);
    return response.data;
  }
);

// Add new car
export const addCar = createAsyncThunk("car/addCar", async (newCar: any) => {
  const response = await axios.post(`${baseURL}/car`, newCar);
  return response.data;
});

// Update car
export const updateCar = createAsyncThunk(
  "car/updateCar",
  async ({ id, carData }: { id: string; carData: any }) => {
    const response = await axios.put(`${baseURL}/car/${id}`, carData);
    return response.data;
  }
);

// Delete car
export const deleteCar = createAsyncThunk(
  "car/deleteCar",
  async (id: string) => {
    await axios.delete(`${baseURL}/car/${id}`);
    return id;
  }
);
