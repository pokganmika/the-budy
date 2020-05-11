import React, { useContext } from 'react';
import SignupForm from '../../Presenter/Pages/Signup/SignupForm';
import AppContext from '../../App/context';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';
import { USER_API } from '../../Config/api';
// import { getLocationAgree } from "../../Service/location";
import OAuthService from '../../Service/OAuth';
// TODO: NOT getLocationAgree -> data check

function Signup({ history }) {
  const [_, appDispatch] = useContext(AppContext);

  const OAuth = provider => {
    return async e => {
      e.preventDefault();
      try {
        const firebaseData = await OAuthService(provider);
        const idToken = await firebase.auth().currentUser.getIdToken();
        const tokenData = { 'x-access-token': idToken };
        const response = await axios.post(
          `${USER_API}/users/_sns`,
          firebaseData,
          { headers: tokenData }
        );

        appDispatch({
          type: 'SET_USER',
          payload: {
            authentication: true,
            displayName: firebaseData.providerData.displayName,
            email: firebaseData.providerData.email,
            uid: firebaseData.providerData.uid,
            photoURL: response.data.img,
            budyId: response.data.budyId,
            emailVerified: firebaseData.emailVerified
          }
        });

        if (!response.data.budyId) {
          history.push('/signup/social');
        } else if (response.data.budyId) {
          history.push('/');
        }
      } catch (error) {
        // TODO: Error Handling
        console.error(error);
      }
    };
  };

  const emailSignupPath = e => {
    history.push('/signup/email');
  };

  const moveHome = e => {
    e.stopPropagation();
    history.push('/');
  };

  // useEffect(() => { getLocationAgree() }, []);

  return (
    <SignupForm
      OAuth={OAuth}
      moveHome={moveHome}
      signupButton={emailSignupPath}
    />
  );
}

export default withRouter(Signup);
