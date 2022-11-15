export const initialState = {
    status: 'checking', 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'Authenticated', 
    uid: '123ABC',
    email: 'correo@gmail.com',
    displayName: 'Test User',
    photoURL: 'https://test-photo.png',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated', 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: '123ABC',
    email: 'correo@gmail.com',
    displayName: 'Test User',
    photoURL: 'https://test-photo.png'
}