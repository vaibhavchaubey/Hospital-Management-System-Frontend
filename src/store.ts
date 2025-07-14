import { configureStore } from '@reduxjs/toolkit';
import jwtSlice from './Slices/JwtSlice';
import userSlice from './Slices/UserSlice';

const store = configureStore({
  reducer: {
    [jwtSlice.name]: jwtSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;

export default store;
