import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FormRow, FormRowSelect } from '../../components';
import { handleChange, clearValues, createJob, editJob } from '../../redux/features/job/jobSlice';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
	const dispatch = useDispatch();
	const {
		isLoading,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		isEditing,
		editJobId
	} = useSelector(store => store.job);
	const { user } = useSelector(store => store.user);

	const handleSubmit = event => {
		event.preventDefault();

		if (!position || !company || !jobLocation) {
			return toast.error('Please fill out all fields');
		}

		if (isEditing) {
			const editedJob = {
				jobId: editJobId,
				job: { position, company, jobLocation, jobType, status }
			};

			return dispatch(editJob(editedJob));
		}

		dispatch(createJob({ position, company, jobLocation, jobType, status }));
	};

	const handleJobInput = event => {
		const name = event.target.name;
		const value = event.target.value;

		dispatch(handleChange({ name, value }));
	};

	const handleClear = () => dispatch(clearValues());

	useEffect(() => {
		if (!isEditing) {
			dispatch(handleChange({ name: 'jobLocation', value: user.location }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Wrapper>
			<form className='form'>
				<h3>{isEditing ? 'edit job' : 'add job'}</h3>
				<div className='form-center'>
					{/* position */}
					<FormRow type='text' name='position' value={position} handleChange={handleJobInput} />
					{/* company */}
					<FormRow type='text' name='company' value={company} handleChange={handleJobInput} />
					{/* jobLocation */}
					<FormRow
						type='text'
						name='jobLocation'
						labelText='job location'
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					{/* status */}
					<FormRowSelect
						name='status'
						value={status}
						handleChange={handleJobInput}
						list={statusOptions}
					/>
					{/* job type*/}
					<FormRowSelect
						name='jobType'
						labelText='job type'
						value={jobType}
						handleChange={handleJobInput}
						list={jobTypeOptions}
					/>
					<div className='btn-container'>
						<button type='button' className='btn btn-block clear-btn' onClick={handleClear}>
							clear
						</button>
						<button
							type='submit'
							className='btn btn-block submit-btn'
							onClick={handleSubmit}
							disabled={isLoading}
						>
							submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};
export default AddJob;
