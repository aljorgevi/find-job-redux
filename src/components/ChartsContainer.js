import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = () => {
	const [barChart, setBarChart] = useState(true);
	const { monthlyApplications: data } = useSelector(store => store.allJobs);

	const handleClick = () => setBarChart(prevState => !prevState);

	return (
		<Wrapper>
			<h4>Monthly Applications</h4>
			<button type='button' onClick={handleClick}>
				{barChart ? 'Area Chart' : 'Bar Chart'}
			</button>
			{barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
		</Wrapper>
	);
};
export default ChartsContainer;
