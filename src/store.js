import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './redux/features/job/jobSlice';
import userSlice from './redux/features/user/userSlice';
import allJobsSlice from './redux/features/allJobs/allJobsSlice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		job: jobSlice,
		allJobs: allJobsSlice
	}
});
