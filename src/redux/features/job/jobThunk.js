import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import { customFetch, checkForUnauthorizedResponse } from '../../../utils/axios';
import { clearValues } from './jobSlice';

const JOBS_URL = '/jobs';

export const createJobThunk = async (job, thunkAPI) => {
	try {
		const resp = await customFetch.post(JOBS_URL, job);
		thunkAPI.dispatch(clearValues());
		return resp.data.msg;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
	thunkAPI.dispatch(showLoading());
	try {
		const resp = await customFetch.delete(`${JOBS_URL}/${jobId}`);
		thunkAPI.dispatch(getAllJobs());
		return resp.data.msg;
	} catch (error) {
		thunkAPI.dispatch(hideLoading());
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

export const editJobThunk = async (editedJob, thunkAPI) => {
	const { jobId, job } = editedJob;
	try {
		const resp = await customFetch.patch(`${JOBS_URL}/${jobId}`, job);
		thunkAPI.dispatch(clearValues());
		return resp.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};
