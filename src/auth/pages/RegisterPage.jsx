import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'

import { startCreatingUserWithEmailPassword } from '../../store/auth'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidation = {
  email:        [ (value) => value.includes('@'), 'El correo debe tener una @'],
  password:     [ (value) => value.length >= 6 , 'El debe tener mas de 6 caracteres'],
  displayName:  [ (value) => value.length >= 1, 'El Nombre Completo es requerido'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { formState, displayName, email, password, onInputChange,
          isFormValid, displayNameValid, emailValid, passwordValid} = useForm(formData, formValidation);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;
  
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <>

      <AuthLayout title='Crear Cuenta'>
        <h1>FormValid: { isFormValid? 'Correcto' : 'Incorrecto' }</h1>

          <form onSubmit={ onSubmit }>
            <Grid container>

            <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Nombre Completo"
                  type="text"
                  placeholder='Nombre Completo'
                  fullWidth
                  name="displayName"
                  value={ displayName }
                  onChange={ onInputChange }
                  error={ !!displayNameValid && formSubmitted }
                  helperText={ displayNameValid }
                  />
              </ Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Correo"
                  type="email"
                  placeholder='Correo@gmail.com'
                  fullWidth
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                  error={ !!emailValid && formSubmitted }
                  helperText={ emailValid }
                  />
              </ Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Contraseña"
                  type="password"
                  placeholder='********'
                  fullWidth
                  name="password"
                  value={ password }
                  onChange={ onInputChange }
                  error={ !!passwordValid && formSubmitted }
                  helperText={ passwordValid }
                  />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Confirme Contraseña"
                  type="password"
                  placeholder='********'
                  fullWidth
                  />
              </Grid>

              <Grid container spacing={ 2 } sx={{  mb:2, mt: 1 }}>
                <Grid item xs={ 12 } >
                  <Button 
                    variant='contained' 
                    fullWidth
                    type='submit'
                  > 
                    Crear Cuenta
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Typography sx={ { mr: 1 }}> ¿Ya tienes una cuenta? </Typography>
                <Link component={ RouterLink } color='inherit' to="/auth/Login">
                   Ingresar
                </Link>
              </Grid>
              
            </Grid>
          </form>

      </AuthLayout>
    </>
  )
}
