import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role, fetchRole, addRole, updateRole, deleteRole } from './roleThunk';

interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch roles
    builder.addCase(fetchRole.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRole.fulfilled, (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch roles.';
    });

    // Add role
    builder.addCase(addRole.fulfilled, (state, action: PayloadAction<Role>) => {
      state.roles.push(action.payload);
    });

    // Update role
    builder.addCase(updateRole.fulfilled, (state, action: PayloadAction<Role>) => {
      const index = state.roles.findIndex((role) => role._id === action.payload._id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
    });

    // Delete role
    builder.addCase(deleteRole.fulfilled, (state, action: PayloadAction<string>) => {
      state.roles = state.roles.filter((role) => role._id !== action.payload);
    });
  },
});

export default roleSlice.reducer;
