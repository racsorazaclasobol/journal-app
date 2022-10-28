import { registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
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

        console.log({result})
    }

}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const resp = await registerUserWithEmailPassword( email, password, displayName );
        console.log(resp)
    }
    
}
