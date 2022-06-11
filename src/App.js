import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Error, Register, PrivateRoute } from './pages';
import {
	Profile,
	AddJob,
	AllJobs,
	Stats,
	SharedLayout
} from './pages/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<PrivateRoute>
							<SharedLayout />
						</PrivateRoute>
					}
				>
					<Route index element={<Stats />} />
					<Route path='all-jobs' element={<AllJobs />} />
					<Route path='add-job' element={<AddJob />} />
					<Route path='profile' element={<Profile />} />
				</Route>
				<Route path='landing' element={<Landing />} />
				<Route path='register' element={<Register />} />
				<Route path='*' element={<Error />} />
			</Routes>
			<ToastContainer position='top-right' />
		</BrowserRouter>
	);
}

export default App;
