import axios from 'axios';
import { clearApplication } from '../redux/features/user/userSlice';
import { getUserFromLocalStorage } from './localStorage';
// import { clearStore } from '../features/user/userSlice';
// import { getUserFromLocalStorage } from './localStorage';
/*
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:1010/'
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
export default axios;
Some API require bearer to be written as Bearer, so you can do:

axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
*/

export const customFetch = axios.create({
	baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit'
});

customFetch.interceptors.request.use(config => {
	const user = getUserFromLocalStorage();
	if (user) {
		config.headers.common['Authorization'] = `Bearer ${user.token}`;
	}
	return config;
});

// export const fetchWithToken = (endpoint, data, method = 'GET') => {
// 	const url = `${BASE_URL}/${endpoint}`;
// 	const token = localStorage.getItem('token');
// 	if (method === 'GET') {
// 		return axios({
// 			method,
// 			url,
// 			headers: {
// 				Authorization: `Bearer ${token}`
// 			}
// 		});
// 	} else {
// 		return axios({
// 			method,
// 			url,
// 			data,
// 			headers: {
// 				Authorization: `Bearer ${token}`
// 			}
// 		});
// 	}
// };

// customFetch.interceptors.request.use(config => {
// 	const user = getUserFromLocalStorage();
// 	if (user) {
// 		config.headers.common['Authorization'] = `Bearer ${user.token}`;
// 	}
// 	return config;
// });

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
	console.log({ error });
	if (error.response.status === 401) {
		thunkAPI.dispatch(clearApplication());
		return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
	}
	return thunkAPI.rejectWithValue(error.response.data.msg);
};
