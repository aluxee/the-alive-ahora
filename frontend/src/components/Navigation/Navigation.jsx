import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';



function Navigation({ isLoaded }) {

	const sessionUser = useSelector((state) => state.session.user);


	return (

		<ul className='nav_bar'>
			<div className='nav_name'>
				<h1 className='airbnb'>
					<i className="fa-brands fa-airbnb" style={{ color: "red" }}></i> ahorabnb
				</h1>
				<h3 id='alive-ahora'>alive-ahora</h3>

			</div>
			<div className='nav_options'>
				<div className='content_nav_options'>
					<li className='nav_list' id='nav_house'>
						<NavLink to='/' className="house-icon">
							<i className="fa-solid fa-house" ></i>
						</NavLink>
					</li>
					{isLoaded && (
						<li className='nav_list' id='nav_profile'>
							<ProfileButton user={sessionUser} />
						</li>
					)}
				</div>
			</div>
		</ul>

	);
}

export default Navigation;
