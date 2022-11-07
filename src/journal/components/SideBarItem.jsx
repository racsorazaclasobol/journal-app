import { useDispatch } from "react-redux"

import { TurnedInNot } from "@mui/icons-material"
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ notes }) => {

    const dispatch = useDispatch();

    console.log(notes)
    
    
    const onOpenNote = ( noteInpum ) => {
        dispatch( setActiveNote( noteInpum ) );
                
    }

  return (
    <>
        <List>
            {
                notes.map( note => (
                    <ListItem key={ note.id } disablePadding>
                        <ListItemButton 
                            onClick={ () => onOpenNote( note ) }
                        >
                            <ListItemIcon>
                                <TurnedInNot />
                            </ListItemIcon>
                            
                            <Grid container>
                                <ListItemText primary={ note.title } />
                                <ListItemText secondary={ note.body } />
                            </Grid>
                        </ListItemButton>
                    </ListItem>
                ) )
            }
        </List>
    </>
  )
}
