import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, addUser, updateUser, deleteUser ,fetchUserById} from './usersThunk';

const initialState = {
  users: [],    // Mảng người dùng
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Gán dữ liệu trả về từ API cho users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Gán dữ liệu trả về từ API cho users
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        
        const payload = action.payload.users
        state.loading = false;
        state.users.data.push(payload);
      })
      .addCase(addUser.rejected, (state, action) => {
      
        state.loading = false;
        state.error = action.payload?.message || 'Unknown error';
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const payload = action.payload.data
        console.log(payload)
        state.loading = false;
        const index = state.users.data.findIndex((user) => user._id === payload._id); // Tìm người dùng theo ID (_id)
        if (index !== -1) {
          state.users.data[index] = payload; // Cập nhật thông tin người dùng
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.data = state.users.data.filter((user) => user._id !== action.payload); // Lọc bỏ người dùng đã bị xóa
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default usersSlice.reducer;
