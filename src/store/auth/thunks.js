import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, logout, login } from "./";

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        if( !result.ok ) return dispatch(logout( result.errorMessage ))

        dispatch( login(result) )
        }

}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword( { email, password, displayName } );

        if( !ok ) return dispatch( logout({ errorMessage }) ) 

        dispatch( login({ uid, email, displayName, photoURL }) )
    }
    
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
               
        // const { ok, uid, displayName, photoURL, errorMessage} = await loginWithEmailPassword({ email, password });
        const result = await loginWithEmailPassword({ email, password });

        if( !result.ok ) return dispatch( logout( result.errorMessage ) );    
        
        // dispatch( login({ uid, email, displayName, photoURL }) );
        dispatch( login( result ) );

    }
}

export const startLogoutFirebase = () => {

    return async ( dispatch ) => { 
        
        await logoutFirebase();

        dispatch( clearNotesLogout() );
        dispatch( logout() );
        
    }
}
