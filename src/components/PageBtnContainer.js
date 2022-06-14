import { useSelector, useDispatch } from 'react-redux';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { changePage } from '../redux/features/allJobs/allJobsSlice';
import Wrapper from '../assets/wrappers/PageBtnContainer';

const PageBtnContainer = () => {
	const dispatch = useDispatch();
	const { numOfPages, page } = useSelector(store => store.allJobs);

	const pages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1;
	});

	const nextPage = () => {
		let newPage = page + 1;
		if (newPage > numOfPages) {
			newPage = 1;
		}
		dispatch(changePage(newPage));
	};

	const prevPage = () => {
		let newPage = page - 1;
		if (newPage < 1) {
			newPage = numOfPages;
		}
		dispatch(changePage(newPage));
	};

	const changePageHandler = pageNumber => dispatch(changePage(pageNumber));

	return (
		<Wrapper>
			<button type='button' className='prev-btn' onClick={prevPage}>
				<HiChevronDoubleLeft />
				prev
			</button>
			<div className='btn-container'>
				{pages.map(pageNumber => {
					return (
						<button
							type='button'
							key={pageNumber}
							className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
							onClick={() => changePageHandler(pageNumber)}
						>
							{pageNumber}
						</button>
					);
				})}
			</div>
			<button type='button' className='next-btn' onClick={nextPage}>
				next
				<HiChevronDoubleRight />
			</button>
		</Wrapper>
	);
};
export default PageBtnContainer;
