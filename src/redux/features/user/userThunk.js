import { customFetch, checkForUnauthorizedResponse } from '../../../utils/axios';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
import { logout } from './userSlice';

const REGISTER_URL = '/auth/register';
const LOGIN_URl = '/auth/login';
const UPDATE_USER_URL = '/auth/updateUser';

export const registerUserThunk = async (user, thunkAPI) => {
	try {
		const response = await customFetch.post(REGISTER_URL, user);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const loginUserThunk = async (user, thunkAPI) => {
	try {
		const response = await customFetch.post(LOGIN_URl, user);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const updateUserThunk = async (user, thunkAPI) => {
	try {
		const resp = await customFetch.patch(UPDATE_USER_URL, user);
		return resp.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

export const clearStoreThunk = async (message, thunkAPI) => {
	try {
		// logout user
		thunkAPI.dispatch(logout(message));
		// clear jobs value
		thunkAPI.dispatch(clearAllJobsState());
		// clear job input values
		thunkAPI.dispatch(clearValues());
		return Promise.resolve();
	} catch (error) {
		return Promise.reject();
	}
};
