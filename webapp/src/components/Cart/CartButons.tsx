import * as React from 'react';
import Container from '@mui/material/Container';
import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from 'react-router-dom';
import { Card, Typography } from '@mui/material';

const useStyles = makeStyles({
    sizes: {
      marginLeft:'20%',
      marginTop:'20%',
      marginBottom:'20%',
      width: '60%',
      height: '80%',
      "&:hover ": { transform: "scale3d(1.05, 1.05, 1)",
        boxShadow: "-1px 1px 20px 0px rgba(0,0,0,0.9)",
    }
  },
  colores:{
      color:'#000000'
  },
  container:{
    position:'relative'
  },
  margen:{
    margin: '-25px 0 0 -25px',
    display: 'flex',
    justifyContent:'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    
  },
});

function calcularValor() : number {
  var x=0
  var x2=""
  if(JSON.parse(sessionStorage.getItem('cart') as string) != null){
    if(JSON.parse(sessionStorage.getItem('cart') as string).length > 0){
      var cart:string = sessionStorage.getItem('cart') as string;
      var primero = cart.split("},{")
      for(var i=0; i<primero.length; i++){
      var [objid,id,nombre,precio,imagen]=primero[i].split(",");
      var [p,valor]=precio.split(":")
        x=x+Number(valor)
  
      }
      x2=String(x);
    }
    sessionStorage.setItem('precioCarrito',x2)
   }
   return x;
  }

export default function CartButons() {
    const classes = useStyles();
    // La siguiente variable indicará el lugar de redireccionado al pulsar sobre el boton "Loggeate para Finalizar Compra"
    let linkFinalizarCompra:string;
    if(sessionStorage.getItem('user') != null) {
      // Si ya hemos iniciado sesión, iremos al log de los pods
      linkFinalizarCompra = '/FormLogIn';
    }
    else {
      // Si no, necesitaremos logearnos en la aplicación
      linkFinalizarCompra = '/LoginUsrPsswd';
    }
  return (
    
    <Container maxWidth='lg' className={classes.container}>  
      <div className={classes.margen}>
      { calcularValor()>0 ? (
      <><Card>
            <Typography variant='h5'>
              Precio total sin gastos de Envio: {calcularValor()}
            </Typography>
          </Card><Button variant="contained" endIcon={<ShoppingCartIcon />} sx={{ bgcolor: 'black' }} size='large' to={linkFinalizarCompra} component={Link}>
              Loggeate para Finalizar Compra
            </Button></>
              ): ([
                <Card> 
                  <Typography variant='h5'>
                  Aun no has añadido nada al carrito!
                  </Typography>
                </Card>
                
              ])}
        
        </div> 
        </Container>  
     
           
    
  );
}