import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalHeader from '../Common/Collections/GlobalHeader/Header';
import Routes from '../Routes';
import reducer from './reducer';
import initialState from './state';
import { getLocationAgree } from '../Service/location';
import firebase from 'firebase';
import axios from 'axios';
import { USER_API } from '../Config/api';
import AppContext from './context';
import setLocalStorage from '../Service/setLocalStorage';
// import AgeVerification from './Container/Modals/AgeVerification';
import getInitialProfileImage from '../Common/Functions/getInitialProfileImage';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    authentication,
    displayName,
    email,
    uid,
    photoURL,
    budyId,
    emailVerified,
  } = state.user;
  
  console.log('App state check : ', state);
  const appInitSet = () => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user === null) {
        dispatch({
          type: 'SET_USER',
          payload: {
            authentication: false,
            displayName: '',
            email: '',
            uid: '',
            photoURL: '',
            budyId: '',
            emailVerified: '',
          },
        });
      } else {
        try {
          console.log('::App firebase data check:: ---> : ', user);
          const firebaseData = user.providerData[0];
          const idToken = await user.getIdToken();
          const tokenData = { 'x-access-token': idToken };
          const response = await axios.get(`${USER_API}/users/budyId`, {
            headers: tokenData,
          });

          console.log('::App response check:: ---> : ', response);
          dispatch({
            type: 'SET_USER',
            payload: {
              authentication: true,
              displayName: response.data.result.user.DisplayName,
              email: firebaseData.email,
              uid: user.uid,
              photoURL: !response.data.result.img
                ? {
                    small: getInitialProfileImage(
                      response.data.result.user.DisplayName
                    ),
                    medium: getInitialProfileImage(
                      response.data.result.user.DisplayName
                    ),
                    large: getInitialProfileImage(
                      response.data.result.user.DisplayName
                    ),
                  }
                : response.data.result.img,
              budyId: response.data.result.user.BudyId,
              emailVerified: user.emailVerified,
            },
          });
        } catch (error) {
          console.error(error);
          dispatch({
            type: 'SET_USER',
            payload: {
              authentication: false,
              displayName: '',
              email: '',
              uid: '',
              photoURL: '',
              budyId: '',
              emailVerified: '',
            },
          });
        }
      }
    });
  };

  // const logout = async () => {
  //   await firebase.auth().signOut();
  // };

  useEffect(() => {
    appInitSet();
    // logout();
    getLocationAgree();
  }, []);

  useEffect(() => {
    setLocalStorage(
      authentication,
      displayName,
      email,
      uid,
      photoURL,
      budyId,
      emailVerified
    );
  }, [authentication]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <div className="App">
        <Router>
          {authentication === true && (
            <>
              <GlobalHeader type="login" />
              <Routes />
            </>
          )}
          {authentication === false && (
            <>
              <GlobalHeader type="logout" />
              <Routes />
            </>
          )}
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
