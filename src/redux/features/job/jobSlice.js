import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../../utils/localStorage';
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

const initialState = {
	isLoading: false,
	position: '',
	company: '',
	jobLocation: '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
	isEditing: false,
	editJobId: ''
};

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		handleChange: (state, action) => {
			const { name, value } = action.payload;
			state[name] = value;
		},
		clearValues: () => {
			// IF RETURN  IS HERE, IT REPLACES THE STATE
			return {
				...initialState,
				jobLocation: getUserFromLocalStorage()?.location || ''
			};
		},
		setEditJob: (state, action) => {
			return { ...state, isEditing: true, ...action.payload };
		}
	},
	extraReducers: {
		[createJob.pending]: state => {
			state.isLoading = true;
		},
		[createJob.fulfilled]: state => {
			state.isLoading = false;
			toast.success('Job Created');
		},
		[createJob.rejected]: (state, action) => {
			state.isLoading = false;
			toast.error(action.payload);
		},
		[deleteJob.rejected]: (_, { payload }) => {
			toast.error(payload);
		},
		[deleteJob.fulfilled]: (_, { payload }) => {
			toast.success(payload);
		},
		[editJob.pending]: state => {
			state.isLoading = true;
		},
		[editJob.fulfilled]: state => {
			state.isLoading = false;
			toast.success('Job Modified...');
		},
		[editJob.rejected]: (state, action) => {
			state.isLoading = false;
			toast.error(action.payload);
		}
	}
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
