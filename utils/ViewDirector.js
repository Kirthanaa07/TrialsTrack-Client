'use client';

import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';

const ViewDirectorBasedOnUserAuthStatus = ({ children }) => {
  const { user, userLoading, updateUser } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <div className="flex flex-row">
          <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        </div>
        <div className="flex flex-col grow p-4 mt-4 container">{children}</div>
        {/* <div className="container">{'valid' in user ? <RegisterForm user={user} updateUser={updateUser} /> : children}</div> */}
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;
