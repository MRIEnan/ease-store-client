import initializeAuthentication from '../firebase/firebase.init';
import { getAuth,getIdToken, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword ,signOut,onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

initializeAuthentication();

const useFirebase = () => {
    const [user,setUser] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [authError,setAuthError] = useState('');
    const [admin,setAdmin] = useState(false);
    // const [token,setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // register 
    const registerUser = (email,password,name,navigate) =>{
        setIsLoading(true)
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            setAuthError('');
            const newUser = {email:email, displayName: name};
            // save user to the database
            setUser(newUser);
            // send name to firebase afer creation
            // saveUser(email,name,'POST');
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(()=>{
            }).then((error)=>{
            })
            navigate('/');
        })
        .catch((error) => {
            const errorMessage = error.message;
            setAuthError(errorMessage);
        })
        .finally(()=>setIsLoading(false))
    }

    // login with google
    /* const signInWithGoogle = (location,history) => {
        setIsLoading(true);
        signInWithPopup(auth,googleProvider)
        .then(result =>{
            const user = result.user;
            // saveUser(user.email,user.displayName,'PUT');
            const destination = location?.state?.from || '/';
            history.replace(destination);
            setAuthError('');
        })
        .catch((error) => {
            setAuthError(error.message);
        })
        .finally(()=>setIsLoading(false));
    } */
    /* // set admin from backend
    useEffect(()=>{
        fetch(`https://afternoon-mountain-78508.herokuapp.com/users/${user.email}`)
        .then(res => res.json())
        .then(data => setAdmin(data.admin))
    },[user.email]); */
    
    // login 
    const loginUser = (email,password,location,navigate) =>{
        setIsLoading(true);
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user = userCredential.user;
            if(admin){
                const destination = location?.state?.from || '/dashboard#dashboard-top';
                navigate(destination);
                setAuthError('')
            }
            else{
                const destination = location?.state?.from || '/home#home-top';
                navigate(destination);
                setAuthError('')
            }
        })
        .catch((error) => {
            const errorMessage= error.message;
            setAuthError(errorMessage);
        })
        .finally(()=>setIsLoading(false));
    }

    // observer user state
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (user)=>{
            if(user?.email){
                setUser(user)
                // getIdToken(user)
                // .then(idToken =>{
                //     setToken(idToken);
                // })
                setAuthError('')
            }
            else{
                setUser({})
            }
            setIsLoading(false)
        })
        return () => unSubscribe;
    },[]);

    
    

    const logOut = () => {
        setIsLoading(true)
        signOut(auth)
        .then(()=>{
            //sign-out successful
        })
        .catch((error) =>{
            // ann error occured
            const errorMessage= error.message;
            setAuthError(errorMessage);
        })
        .finally(()=>setIsLoading(false))
    }

    /* const saveUser = (email,displayName,method) =>{
        const user = {email,displayName};
        fetch('https://afternoon-mountain-78508.herokuapp.com/users',{
            method:method,
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        })
        .then()
    } */


    return {
        user,
        registerUser,
        // signInWithGoogle,
        loginUser,
        logOut,
        isLoading,
        authError,
        admin,
        // token,
        setIsLoading,
        setAdmin
        // saveUser
    }
};

export default useFirebase;