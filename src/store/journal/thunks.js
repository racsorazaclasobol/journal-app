import { addDoc, collection } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, creatingNewNote, setActiveNote } from "./journalSlice";

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


        //! Dispatch
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }
}
