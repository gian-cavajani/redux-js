import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UsersData } from '../fakeData';
import axios from 'axios';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios.get(USERS_URL);
  return res.data;
});

export const userSlice = createSlice({
  name: 'users',
  initialState: { value: [] },
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.value = state.value.filter((u) => u.id !== id);
    },
    updateUser: (state, action) => {
      const user = action.payload;

      state.value = state.value.map((u) =>
        u.id === user.id ? { ...u, username: user.username } : u
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { addUser, deleteUser, updateUser, usersLoading, usersPending } =
  userSlice.actions; //actions are the functions to mutate the state (reducers)
export default userSlice.reducer;
