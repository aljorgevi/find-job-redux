import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../../utils/axios';

const initialState = {
	isLoading: false,
	isSidebarOpen: false,
	user: ''
};

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (user, thunkAPI) => {
		try {
			const response = await customFetch.post('/auth/testingRegister', user);
			console.log({ response });
		} catch (error) {
			toast.error(error.response.data.msg);
			console.log(error.response);
		}
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
