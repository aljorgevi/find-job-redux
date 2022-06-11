import { useSelector } from 'react-redux';
import NavLinks from './NavLinks';
import Wrapper from '../assets/wrappers/BigSidebar';
import Logo from '../components/Logo';

const BigSidebar = () => {
	const { isSidebarOpen } = useSelector(store => store.user);

	return (
		<Wrapper>
			<div
				className={
					isSidebarOpen
						? 'sidebar-container '
						: 'sidebar-container show-sidebar'
				}
			>
				<div className='content'>
					<header>
						<Logo />
					</header>
					<NavLinks />
				</div>
			</div>
		</Wrapper>
	);
};
export default BigSidebar;
