import { customFetch, checkForUnauthorizedResponse } from '../../../utils/axios';

const GET_ALL_JOBS_URL = '/jobs';

export const getAllJobsThunk = async (_, thunkAPI) => {
	const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;

	let url = `${GET_ALL_JOBS_URL}?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

	if (search) {
		url = url + `&search=${search}`;
	}

	try {
		const resp = await customFetch.get(url);
		return resp.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

export const showStatsThunk = async (_, thunkAPI) => {
	try {
		const resp = await customFetch.get('/jobs/stats');

		return resp.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};
