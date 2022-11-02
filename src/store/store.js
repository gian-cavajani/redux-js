import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/UsersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
