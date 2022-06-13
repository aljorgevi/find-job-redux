import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

const initialFiltersState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
};

const initialState = {
	isLoading: true,
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	...initialFiltersState
};

export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk);

export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk);

const allJobsSlice = createSlice({
	name: 'allJobs',
	initialState,
	reducers: {
		showLoading: state => {
			state.isLoading = true;
		},
		hideLoading: state => {
			state.isLoading = false;
		},
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		clearFilters: state => {
			return { ...state, ...initialFiltersState };
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		clearAllJobsState: state => initialState
	},
	extraReducers: {
		[getAllJobs.pending]: state => {
			state.isLoading = true;
		},
		[getAllJobs.rejected]: (state, action) => {
			state.isLoading = false;
			toast.error(action.payload);
		},
		[getAllJobs.fulfilled]: (state, action) => {
			const body = action.payload;
			state.isLoading = false;
			state.jobs = body.jobs;
			state.numOfPages = body.numOfPages;
			state.totalJobs = body.totalJobs;
		},
		[showStats.pending]: state => {
			state.isLoading = true;
		},
		[showStats.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[showStats.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.stats = payload.defaultStats;
			state.monthlyApplications = payload.monthlyApplications;
		}
	}
});

export const {
	showLoading,
	hideLoading,
	handleChange,
	clearFilters,
	changePage,
	clearAllJobsState
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
