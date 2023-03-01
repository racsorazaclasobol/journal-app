import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, creatingNewNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        dispatch( creatingNewNote() );
        
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [
            ]
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

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
                
        const { uid } = getState().auth;
        const { activeNotes:note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFirestore, { merge: true } );

        dispatch( updateNote(note) )        
    }
}
export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch, getState ) => {
        
        dispatch( setSaving() );

        // await fileUpload( files[0] );
        const fileUploadPromises = [];

        
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photoUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photoUrls ) )
        
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { activeNotes:note } = getState().journal;
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );

        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );

    }
}