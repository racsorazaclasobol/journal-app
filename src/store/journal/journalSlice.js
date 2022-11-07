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

        },
        setNotes: ( state, action ) => {

        },
        setSaving: ( state ) => { 

        },
        updateNote: ( state, action ) => {

        },
        deleteNodeNyId: ( state, action ) => {

        }

    },
})

export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNodeNyId, creatingNewNote } = journalSlice.actions