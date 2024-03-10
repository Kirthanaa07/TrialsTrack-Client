'use client';

import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';

const ViewDirectorBasedOnUserAuthStatus = ({ children }) => {
  const { user, userLoading } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <NavBar className="flex flex-row" /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="flex flex-col p-4 mt-4 grow overflow-auto">{children}</div>
        {/* <div className="container">{'valid' in user ? <RegisterForm user={user} updateUser={updateUser} /> : children}</div> */}
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;
