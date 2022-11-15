import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Google from '@mui/icons-material/Google'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'


const initialForm = { email: '', password: '' };


export const LoginPage = () => {

  const dispatch    = useDispatch();
  const { status, errorMessage }  = useSelector( state => state.auth );

  const { formState, email, password, onInputChange } = useForm( initialForm );

  const isAuthenticated = useMemo( () => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch( startLoginWithEmailPassword(formState) );
  }
  
  const onGoogleSignIn = () => {
    
    dispatch( startGoogleSignIn() );

  }

  return (
    <>

      <AuthLayout title='Login'>
          <form 
           data-testid='submit-form'
           onSubmit={ onSubmit } >
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Correo"
                  type="email"
                  placeholder='correo@gmail.com'
                  fullWidth
                  value={ email }
                  name="email"
                  onChange={ onInputChange }
                  />
              </ Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Contraseña"
                  type="password"
                  placeholder='********'
                  fullWidth
                  inputProps={{
                    'data-testid': 'password'
                  }}
                  name="password"
                  value={ password }
                  onChange={ onInputChange }
                  />
              </Grid>

              <Grid container spacing={ 2 } sx={{  mb:2, mt: 1 }}>
                <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
                    <Alert severity='error' > { errorMessage } </Alert>
                </Grid>

                <Grid item xs={ 12 } sm={ 6 }>
                  <Button type='submit' variant='contained' fullWidth disabled={ isAuthenticated }> 
                    Login
                  </Button>
                </Grid>
                
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button 
                      variant='contained' 
                      fullWidth 
                      aria-label='google-btn'
                      onClick={ onGoogleSignIn } 
                      disabled={ isAuthenticated }
                  >
                    <Google />

                    <Typography sx={{ ml: 1 }}> Google </Typography>
                    
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Link component={ RouterLink } color='inherit' to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>
              
            </Grid>
          </form>

      </AuthLayout>
    </>
  )
}
