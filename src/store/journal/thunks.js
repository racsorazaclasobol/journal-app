import { addDoc, collection } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../journal/helpers";
import { addNewEmptyNote, creatingNewNote, setActiveNote, setNotes } from "./journalSlice";

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        dispatch( creatingNewNote( 'true' ) );
        
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const respNewDoc = await addDoc( collection( FirebaseDB, `${ uid }/journal/notes` ), newNote );

        newNote.id = respNewDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
        
    }
}
