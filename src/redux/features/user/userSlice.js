import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../../utils/axios';
import {
	addUserToLocalStorage,
	getUserFromLocalStorage,
	removeUserFromLocalStorage
} from '../../../utils/localStorage';

const initialState = {
	isLoading: false,
	isSidebarOpen: false,
	user: getUserFromLocalStorage()
};

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (user, thunkAPI) => {
		try {
			const response = await customFetch.post('/auth/register', user);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (user, thunkAPI) => {
		try {
			const response = await customFetch.post('/auth/login', user);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleSidebar: state => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		clearStore: state => {
			state.user = null;
			removeUserFromLocalStorage();
		}
	},
	extraReducers: {
		[registerUser.pending]: state => {
			state.isLoading = true;
		},
		[registerUser.rejected]: (state, action) => {
			state.isLoading = false;
			toast.error(action.payload, {
				toastId: 'register-toast'
			});
		},
		[registerUser.fulfilled]: (state, action) => {
			const { user } = action.payload;
			state.user = user;
			state.isLoading = false;
			addUserToLocalStorage(user);
			toast.success('Successfully registered!');
		},
		[loginUser.pending]: state => {
			state.isLoading = true;
		},
		[loginUser.rejected]: (state, action) => {
			state.isLoading = false;
			toast.error(action.payload);
		},
		[loginUser.fulfilled]: (state, action) => {
			const { user } = action.payload;
			state.user = user;
			state.isLoading = false;
			addUserToLocalStorage(user);
			toast.success(`Welcome back ${user.name}!`, {
				toastId: 'login-toast'
			});
		}
	}
});

export const { toggleSidebar, clearStore } = userSlice.actions;
export default userSlice.reducer;
