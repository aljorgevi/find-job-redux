import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllJobs } from '../redux/features/allJobs/allJobsSlice';
import Job from './Job';
import PageBtnContainer from './PageBtnContainer';
import Loading from './Loading';
import Wrapper from '../assets/wrappers/JobsContainer';

const JobsContainer = () => {
	const dispatch = useDispatch();
	const { jobs, isLoading, page, totalJobs, numOfPages, search, searchStatus, searchType, sort } =
		useSelector(store => store.allJobs);

	useEffect(() => {
		dispatch(getAllJobs());
	}, [dispatch, page, search, searchStatus, searchType, sort]);

	if (isLoading) {
		return <Loading center />;
	}

	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h5>
				{totalJobs} job{jobs.length > 1 && 's'} found
			</h5>
			<div className='jobs'>
				{jobs.map(job => {
					return <Job key={job._id} {...job} />;
				})}
			</div>
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};

export default JobsContainer;
