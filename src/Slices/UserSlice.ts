import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('token')
    ? jwtDecode(localStorage.getItem('token') || '')
    : {},
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state;
    },
    removeUser: (state) => {
      state = {};
      return state;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice;

// import { createSlice } from '@reduxjs/toolkit';
// import { jwtDecode } from 'jwt-decode';
// import type { User } from '../types';

// const initialState: User | null = localStorage.getItem('token')
//   ? jwtDecode<User>(localStorage.getItem('token')!)
//   : null;

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     removeUser: (state) => {
//       localStorage.removeItem('token');
//       return null;
//     },
//   },
// });

// export const { removeUser } = userSlice.actions;
// export default userSlice;
