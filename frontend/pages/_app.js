import { useState, useEffect } from 'react';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import { UserProvider } from '../UserContext';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState({
		id: null,
		isAdmin: null
	});

	// functions as a logout button
	const unsetUser = () => {
		localStorage.clear();

		// reset the user state values to null
		setUser({
			id: null,
			isAdmin: null
		})
	}

	useEffect(() => {

        fetch('http://localhost:4000/api/users/details', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            if(data._id){
            	setUser({
            		id: data._id,
            		isAdmin: data.isAdmin
            	})
            } else {
            	setUser({
            		email: null,
            		id: null,
            		isAdmin: null
            	})
            }
        })

    }, [user.id])

  return (
  	<React.Fragment>
  		<UserProvider value={{user, setUser, unsetUser}}>
	  		<NavBar />
	  		<Component {...pageProps} />
	  	</UserProvider>
  	</React.Fragment>
  )
}

export default MyApp