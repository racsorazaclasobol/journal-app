import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
   name: 'journal',
   initialState: { 
        isSaving: false, //Para saber si está guardando una nota, y evitar doble posteo
        messageSaved: '',
        notes: [],
        activeNotes: null, // Ej nota activa: activeNotes: { id: 'ABC123', title: 'Some', body: 'Some Body', date: '11/11/2010', imageUrl: 'https....' }
    },
   reducers: {
        creatingNewNote: ( state, action ) => {
            state.isSaving = true;            
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.activeNotes = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => { 
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if( note.id === action.payload.id )
                {
                    return action.payload;
                }
                return note;
            })   
            
            state.messageSaved = `${ action.payload.title } ha sido actualizado correctamente.`
            //Todo: mostrar mensaje de actualización

        },
        setPhotosToActiveNote: (state, action) => {
            state.activeNotes.imageUrls = [ ...state.activeNotes.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNotes = null;
        },
        deleteNoteById: ( state, action ) => {
            state.isSaving = false;
            state.activeNotes = null;
            state.notes = state.notes.filter( note => note.id !== action.payload )
            
        }

    },
})

export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, deleteNodeNyId, creatingNewNote, setPhotosToActiveNote, clearNotesLogout } = journalSlice.actions