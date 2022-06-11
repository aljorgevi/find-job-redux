import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { toggleSidebar, clearStore } from '../redux/features/user/userSlice';
import Wrapper from '../assets/wrappers/Navbar';
import Logo from './Logo';

const Navbar = () => {
	const [showLogout, setShowLogout] = useState(false);
	const { user } = useSelector(store => store.user);
	const dispatch = useDispatch();

	const toggle = () => {
		dispatch(toggleSidebar());
	};

	return (
		<Wrapper>
			<div className='nav-center'>
				<button type='button' className='toggle-btn' onClick={toggle}>
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
						onClick={() => setShowLogout(!showLogout)}
					>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
						<button
							type='button'
							className='dropdown-btn'
							onClick={() => dispatch(clearStore('Logging out...'))}
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
