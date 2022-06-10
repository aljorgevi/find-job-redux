import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
	isLoading: false,
	isSidebarOpen: false,
	user: ''
};

const userSlice = createSlice({
	name: 'user',
	initialState
});

export const {} = userSlice.actions;
export default userSlice.reducer;
