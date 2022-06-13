import { useEffect } from 'react';
import { StatsContainer, Loading, ChartsContainer } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../redux/features/allJobs/allJobsSlice';

const Stats = () => {
	const { isLoading, monthlyApplications } = useSelector(store => store.allJobs);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(showStats());
	}, [dispatch]);

	return (
		<>
			{/* <StatsContainer /> */}
			{/* {monthlyApplications.length > 0 && <ChartsContainer />} */}
		</>
	);
};
export default Stats;
