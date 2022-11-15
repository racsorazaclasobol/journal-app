import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingAuthentication, checkingCredentials, login, logout, startGoogleSignIn, startLoginWithEmailPassword, startLogoutFirebase } from "../../../src/store/auth"
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../helpers/fixtures/authFixtures";

jest.mock('../../../src/firebase/providers') //Esta inea convirte todas las funciones dentro de esa ruta, en un mock para ser simulados

describe('Pruebas en auth/thunks', () => { 
    
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );
     
    
    test('Debe invocar al checkingAuthentication', async () => { 

        // const valor = checkingAuthentication();

        await checkingAuthentication()( dispatch ); //El primer () es el llamado de la funcion y el segundo el valor de retorno de la funcion

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )

    })

    test('startGoogleSignIn debe de llamar al checkingcredential y al login', async () => { 

        const loginData = { ok: true, ...demoUser }
        // providers
        await signInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
        
    })

    test('startGoogleSignIn debe de llamar al checkingcredential y al logout - Error', async () => { 

        const loginData = { ok: false, errorMessage: 'Un error en google' }
        // providers
        await signInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) )
        
    })

    test('startLoginWithEmailPassword debe de llamar al checkingcredential y al login', async () => { 

        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456' }

        // providers
        await loginWithEmailPassword.mockResolvedValue( loginData );

        // thunk
        await startLoginWithEmailPassword( formData )( dispatch );

        // expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
        
    })

    test('startLoginWithEmailPassword debe de llamar al checkingcredential y al logout - Error', async () => { 

        const loginData = { ok: false, errorMessage: 'Un error en google' }
        // providers
        await loginWithEmailPassword.mockResolvedValue( loginData );

        // thunk
        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) )
        
    })


    test('startLogout debe de llamar al logoutFirebase, clearNotes y al logout', async () => { 

        const loginData = { ok: false, errorMessage: 'Un error en google' }
  
        // thunk
        await startLogoutFirebase()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
        
    })
    

 })