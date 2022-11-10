import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks/useForm"
import { ImageGalery } from "../components"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import { useRef } from "react"

export const NoteView = () => {

    const dispatch = useDispatch();
    const { activeNotes:note, messageSaved, isSaving } = useSelector( state => state.journal );
    
    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date( date );

        return newDate.toUTCString();

    } , [date])

    useEffect(() => {
        dispatch( setActiveNote( formState ) );
    }, [formState])

    useEffect(() => {
        console.log("Entró aqui: " + messageSaved)
      if( messageSaved.length > 0 ){
        Swal.fire('Nota Actualizada', messageSaved, 'success')
      }
    }, [messageSaved])

    const btnInputRef = useRef();
    
    const onSetNote = () => {
        
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;

        dispatch ( startUploadingFiles( target.files ) );
    }

    const onDelete = ( ) => {

        dispatch( startDeletingNote() )

    }
    

  return (
    
    <Grid container direction='row' justifyContent='space-between' sx={{ mb:1 }}>
        <Grid item >
            <Typography fontSize={ 39 } fontWeight='Light'>
                { dateString }
            </Typography>
        </Grid>

        <Grid item >

            <input 
                type="file"
                multiple
                ref={ btnInputRef }
                onChange={ onFileInputChange }
                style={{ display: "none" }}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ () => btnInputRef.current.click() }
            >
                <UploadOutlined />
            </IconButton>

            <Button 
                color="primary" 
                sx={{ padding: 2 }}
                onClick = { onSetNote }
                disabled = { isSaving }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container >
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Titulo"
                name="title"
                value = { title } 
                onChange={ onInputChange }
                sx={{ border: 'none', mb: 1 }}    
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedió el día de hoy?"
                minRows={ 5 }  
                name="body"
                value = { body } 
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent="end" >
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color="error"
            >

                <DeleteOutline />
                Borrar
            </Button>
        </Grid>

        {/* Galería de imagenes */}
        <ImageGalery images={ note.imageUrls } />

        
    </Grid>
    
  )
}
