import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import {
	toggleSidebar,
	clearStore,
	logout
} from '../redux/features/user/userSlice';
import Wrapper from '../assets/wrappers/Navbar';
import Logo from './Logo';

const Navbar = () => {
	const [showLogout, setShowLogout] = useState(false);
	const { user } = useSelector(store => store.user);
	const dispatch = useDispatch();

	const toggleSidebarHandler = () => dispatch(toggleSidebar());

	const logoutHandler = () => dispatch(logout('Logging out...'));

	const toggleShowLogoutHandler = () => setShowLogout(prevState => !prevState);

	return (
		<Wrapper>
			<div className='nav-center'>
				<button
					type='button'
					className='toggle-btn'
					onClick={toggleSidebarHandler}
				>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className='logo-text'>dashboard</h3>
				</div>
				<div className='btn-container'>
					<button
						type='button'
						className='btn'
						onClick={toggleShowLogoutHandler}
					>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
						<button
							type='button'
							className='dropdown-btn'
							onClick={logoutHandler}
						>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default Navbar;
