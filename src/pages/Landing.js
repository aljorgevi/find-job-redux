import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';

const Landing = () => {
	return (
		<main>
			<nav>
				<img src={logo} alt='company logo' />
			</nav>
			<div className='container page'>
				{/* info */}
				<div className='info'>
					<h1>
						Job <span>tracking</span> app
					</h1>
					<p>
						I'm baby flannel selfies chillwave taiyaki, forage plaid photo booth
						thundercats tilde af lomo meggings 90's pickled vexillologist.
						Distillery hashtag actually squid, man bun YOLO whatever sriracha
						pok pok chicharrones synth tonx cornhole deep v ramps.
					</p>
					<button className='btn btn-hero'>Login/Register</button>
				</div>
				<img className='img main-img' src={main} alt='company couple' />
			</div>
		</main>
	);
};

export default Landing;
