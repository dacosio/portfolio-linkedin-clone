import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { auth } from './firebaseConnection';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import './Login.css';

function Login() {
    const [user, setUser] = useState({email: "", password: "", name: "", photoUrl: ""})
    const dispatch = useDispatch()

    const loginToApp = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(userAuth => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.name,
                    photoUrl:userAuth.user.photoUrl,
                }))
            }).catch(err => {
                alert(err)
            })
    };

    const register = async () => {
        try {
            if (!user.name) {
                alert("Please enter full name")
            } else {
                const userAuth = await createUserWithEmailAndPassword(auth, user.email, user.password)
                await updateProfile(userAuth.user, {
                    displayName: user.name,
                    photoUrl: user.photoUrl,
                })
                await dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: user.name,
                    photoUrl:user.photoUrl,
                }))
            }
        } catch(err) {
            alert(err)
        }
        
        
    };


    return (
        <div className="login">
            <img 
                src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-700x394.png" 
                alt="linkedin-image" 
            />

            <form>
                <input onChange={(e) => setUser({...user, name: e.target.value})} value={user.name} type="text" placeholder="Full name (required if registering)" />
                <input  onChange={(e) => setUser({...user, photoUrl: e.target.value})} value={user.photoUrl} type="text" placeholder="Profile pic URL (optional)" />
                <input onChange={(e) => setUser({...user, email: e.target.value})} value={user.email} type="email" placeholder="Email"/>
                <input onChange={(e) => setUser({...user, password: e.target.value})} value={user.password} type="password"placeholder="Password"/>
                <button onClick={loginToApp}>Sign In</button>
            </form>
            <p>Not a member? <span className="login__register" onClick={register}>Register Now</span></p>
        </div>
    )
}

export default Login