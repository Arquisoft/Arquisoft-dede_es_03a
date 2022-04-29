import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Nav from '../Fragments/Nav';
import { User } from '../../shared/shareddtypes';
import { addUser, getUser } from '../../api/api';
import { Alert, Snackbar } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
      marginTop: theme.spacing(10)
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

const Register = () => {
  const classes = useStyles();
  const [userName,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const [confirmpassword,setCPassword]=useState("");

  async function addUserToSession(){
    if(confirmpassword==password){
      const newUser:User = {username:userName, password:password};
      let checkUser: User|null = (await getUser(userName, password));
      // Comprobamos que el usuario no exista ya
      if(checkUser==null) {
        // Comprobamos que se añada el usuario correctamente
        let add:boolean = (await addUser(newUser));
        if(add){
          const item = {"username":userName,"password":password};
          // Almacenamos el usuario en sesión
          sessionStorage.setItem('user',JSON.stringify(item));
          alert("Usuario añadido");
          window.location.href= window.location.protocol + '//' + window.location.host + '/';
        }
        else{
          alert("Credenciales inválidas");
        }
      }
      else{
        alert("El usuario ya existe");
      }
    }
    else{
      alert("Las contraseñas no coinciden");
    }    
    window.location.reload();
  }
  return (
    <>
    <form className={classes.container} noValidate autoComplete="on" name="registro">
          <Card className={classes.card}>
              <CardHeader className={classes.header} title="Registro" />
              <CardContent>
                  <div>
                      <TextField
                          fullWidth
                          id="username"
                          type="email"
                          label="Username"
                          placeholder="Username"
                          margin="normal"
                          onChange={e=>setUserName(e.target.value)}/>
                          
                      <TextField
                          fullWidth
                          id="password"
                          type="password"
                          label="Password"
                          placeholder="Password"
                          margin="normal" 
                          onChange={e=>setPassword(e.target.value)}/>
                      <TextField
                          fullWidth
                          id="check password"
                          type="password"
                          label="Check Password"
                          placeholder="Check Password"
                          margin="normal" 
                          onChange={e=>setCPassword(e.target.value)}/>
                  </div>
              </CardContent>
              <CardActions>
                  <Button
                      onClick={addUserToSession}
                      variant="contained"
                      size="large"
                      color="primary"
                      className={classes.loginBtn}
                      data-testid="register"
                      >
                      Registrarse
                  </Button>

              </CardActions>
          </Card>
      </form>
    </>
  );
}
export default Register;