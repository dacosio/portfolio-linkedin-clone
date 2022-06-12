import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, logout, selectUser } from './features/userSlice';
import Feed from './Feed';
import Header from './Header';
import Login from './Login';
import Sidebar from './Sidebar';
import { auth } from './firebaseConnection';
import Widgets from './Widgets';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl:userAuth.photoUrl,
        }))
      } else {
          dispatch(logout());
      }
    })
  },[])
  return (
    <div className="app">
      <header className="App-header">
        <Header />

        {!user.user ? <Login /> : 
          (
            <div className="app__body">
              <Sidebar />
              <Feed />
              <Widgets />
            </div>
          )
        }
      </header>
    </div>
  );
}

export default App;
