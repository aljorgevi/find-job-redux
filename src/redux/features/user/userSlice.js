import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	clearStoreThunk,
	loginUserThunk,
	registerUserThunk,
	updateUserThunk
	// clearStoreThunk
} from './userThunk';
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

export const registerUser = createAsyncThunk('user/registerUser', registerUserThunk);

export const loginUser = createAsyncThunk('user/loginUser', loginUserThunk);

export const updateUser = createAsyncThunk('user/updateUser', updateUserThunk);

export const clearApplication = createAsyncThunk('user/clearStore', clearStoreThunk);

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
		},
		logout: (state, action) => {
			if (action.payload) {
				toast.success(action.payload);
			}

			state.user = null;
			state.isSidebarOpen = false;
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
		},
		[updateUser.pending]: state => {
			state.isLoading = true;
		},
		[updateUser.rejected]: (state, action) => {
			state.isLoading = false;
			toast.error(action.payload);
		},
		[updateUser.fulfilled]: (state, action) => {
			console.log({ action });
			const { user } = action.payload;

			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success('Successfully updated!');
		},
		[clearApplication.rejected]: state => {
			toast.error('There was an error..');
		}
	}
});

export const { toggleSidebar, clearStore, logout } = userSlice.actions;
export default userSlice.reducer;
