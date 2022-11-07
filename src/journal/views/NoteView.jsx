import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { ImageGalery } from "../components"

export const NoteView = () => {

    const { activeNotes } = useSelector( state => state.journal );

  return (
    
    <Grid container direction='row' justifyContent='space-between' sx={{ mb:1 }}>
        <Grid item >
            <Typography fontSize={ 39 } fontWeight='Light'>
                { activeNotes.date }
            </Typography>
        </Grid>

        <Grid item >
            <Button color="primary" sx={{ padding: 2 }}>
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
                sx={{ border: 'none', mb: 1 }}    
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedió el día de hoy?"
                minRows={ 5 }  
            />
        </Grid>

        <ImageGalery />

        
    </Grid>
    
  )
}
