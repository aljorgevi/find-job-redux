import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const NavLinks = ({ toggleSidebar }) => {
	return (
		<div className='nav-links'>
			{links.map(link => {
				const { text, path, id, icon } = link;
				return (
					<NavLink
						to={path}
						// NavLink have a props where we can pass a function to get the active state
						className={({ isActive }) => {
							return isActive ? 'nav-link active' : 'nav-link';
						}}
						key={id}
						onClick={toggleSidebar}
					>
						<span className='icon'>{icon}</span>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
};
export default NavLinks;
