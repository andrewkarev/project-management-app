import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './reducers/boardSlice';
import columnSlice from './reducers/columnSlice';
import taskSlice from './reducers/taskSlice';
import userSlice from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    board: boardSlice,
    column: columnSlice,
    task: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
