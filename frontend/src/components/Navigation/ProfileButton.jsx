import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const navigate = useNavigate();
	const ulRef = useRef();



	const toggleMenu = (e) => {
		e.stopPropagation();// Keep click from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu)
	}

	useEffect(() => {

		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		}

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu)
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();

		dispatch(sessionActions.logout());
		closeMenu();
		navigate('/')
		alert("You have logged out.")
	}

	const manageSpots = (e) => {
		e.preventDefault();


		navigate('/spots/current');
		closeMenu();
	}
	const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");

	return (
		<>
			<button
				onClick={toggleMenu}
				className="button-profile-dropdown"
			>
				< i className="fa-solid fa-user" />
			</button>
			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<>

							<li className="profile_dropdown_name" style={{fontFamily: "cursive"}}>Hello, {user.firstName}! </li>
							<li className="profile_dropdown_username">{user.username}</li>
							<li className="profile_dropdown_email">{user.email}</li>
							<hr className="hr-profile" />
							<li className="profile_dropdown_manage">
								<button onClick={manageSpots} className="user_manage_button">Manage Spots</button>
							</li>
						<hr className="hr-profile" />

							<li className="profile_dropdown_logout">
								<button onClick={logout} className="user_logout_button">Log Out</button>
							</li>
					</>
				) : (
					<>
						<OpenModalMenuItem itemText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>
						<OpenModalMenuItem
							itemText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>
				)}
			</ul>
		</>

	);
}



export default ProfileButton;
