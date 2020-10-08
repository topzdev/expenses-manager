import { useContext, useEffect } from 'react';
import UserContext from '../../UserContext';
import Router from 'next/router';

export default function index() {
	const { unsetUser, setUser } = useContext(UserContext);

	// clears localStorage of user information
	// invoke/call unsetUser only after initial render of Logout page
	useEffect(() => {
		unsetUser();
		Router.push('/login');
	},[]);

	return null
}