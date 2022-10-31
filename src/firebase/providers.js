import {  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from './config'

 const googleProvider = new GoogleAuthProvider();


 export const signInWithGoogle = async() => {

    try {

        const result = await signInWithPopup( FirebaseAuth,  googleProvider );
        // const credential = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            //User info
            displayName, email, photoURL, uid
        }
        
    } catch (error) {

        console.log(error)

        const errorCode = error.code;
        const errorMessage = error.message;

        return { 
            ok: false,
            errorMessage: errorMessage

        }
        
    }
    
 }

 export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        //Asignamos el nombre del usuario a la cuenta
        await updateProfile( FirebaseAuth.currentUser, { displayName } )


        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            errorMessage: error.message
        }
    }

 }