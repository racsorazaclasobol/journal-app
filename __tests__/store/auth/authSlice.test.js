import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../helpers/fixtures/authFixtures";

describe('tests on authSlice', () => { 

    test('Debe de regresar el estado inicial y llamarse "auth"', () => { 
        // console.log(authSlice)

        const state = authSlice.reducer( initialState, {} );

        expect( authSlice.name ).toBe( 'auth' );
        expect( state ).toEqual( initialState );

    });

    test('Debe de realizar la autenticacion', () => { 
        
        const state = authSlice.reducer( initialState, login( demoUser ) );
        expect( state ).toEqual( authenticatedState );

    });

    test('Debe de realizar el logout sin argumentos', () => { 
        
        demoUser.errorMessage = null;
        const state = authSlice.reducer( initialState, logout( demoUser ) );
        expect( state ).toEqual( notAuthenticatedState );

    })

    test('Debe de realizar el logout con errorMessage', () => { 
        
        demoUser.errorMessage = 'Ha ocurrido un error';
        const noAuthenticatedWithError = { ...notAuthenticatedState  };
        noAuthenticatedWithError.errorMessage = 'Ha ocurrido un error';

        const state = authSlice.reducer( initialState, logout( demoUser ) );
        
        expect( state ).toEqual( noAuthenticatedWithError );

    })

    test('Debe de cambiar el estado a checking', () => { 

        const state = authSlice.reducer( initialState, checkingCredentials() );
        
        expect( state.status ).toBe('checking')

    })
 })