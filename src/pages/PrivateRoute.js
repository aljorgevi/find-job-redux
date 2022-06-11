import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
	const { user } = useSelector(store => store.user);

	return !user ? <Navigate to='/landing' /> : children;
}
