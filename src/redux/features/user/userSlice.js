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
			const response = await customFetch.post('/auth/register', user);
			console.log({ response });
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
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
	initialState,
	extraReducers: {
		[registerUser.pending]: state => {
			state.isLoading = true;
		},
		[registerUser.rejected]: (state, action) => {
			state.isLoading = false;
			toast.error(action.payload);
		},
		[registerUser.fulfilled]: (state, action) => {
			const { user } = action.payload;
			state.user = user;
			state.isLoading = false;
			toast.success('Successfully registered!');
		}
	}
});

export const {} = userSlice.actions;
export default userSlice.reducer;
