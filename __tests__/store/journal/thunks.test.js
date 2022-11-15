import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, creatingNewNote, setActiveNote, startNewNote } from "../../../src/store/journal";


describe('Tests on Thunks de Journal', () => { 

    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('Debe de crear una nueva nota en blanco', async () => { 

        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid: uid } })

        await startNewNote()( dispatch, getState )

        expect( dispatch ).toHaveBeenCalledWith( creatingNewNote() )
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({  title: '', body: '', date: expect.any( Number ), id: expect.any( String ), imageUrls: expect.any( Array )  }) )
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({  title: '', body: '', date: expect.any( Number ), id: expect.any( String ), imageUrls: expect.any( Array )  }) )

        //Borrar de firebase
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );

        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );

        await Promise.all( deletePromises );

     })

 })