import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {},
  reducers: {
    setProfile: (state, action) => {
      state = action.payload;
      return state;
    },
    removeProfile: (state) => {
      state = {};
      return state;
    },
  },
});

export const { setProfile, removeProfile } = ProfileSlice.actions;
export default ProfileSlice;