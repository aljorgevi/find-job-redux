import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
	isLoading: false,
	isSidebarOpen: false,
	user: ''
};

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (user, thunkAPI) => {
		console.log('registerUser', { user });
	}
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (user, thunkAPI) => {
		console.log('loginUser', { user });
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState
});

export const {} = userSlice.actions;
export default userSlice.reducer;
