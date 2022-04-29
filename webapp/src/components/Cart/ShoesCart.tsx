import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Container, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@material-ui/core';
import { TypeProduct } from '../../shared/shareddtypes';

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
      color:'#FFFFFF'
  },
  colores2:{
    marginRight:'30%',
    background: "linear-gradient(45deg, #FFFFFF 10%,transparent 70%)"
  },

  colores3:{
    color:'#000000'
  }
  
  });

const ShoesCart = () => {
  const classes = useStyles();
  
  const carrito = () => {
  if(JSON.parse(sessionStorage.getItem('cart') as string) != null){ 
     return JSON.parse(sessionStorage.getItem('cart') as string);
  }
  return null;
} 

    return (
      <Container maxWidth="md" className={classes.colores2}>
        <Typography variant='h3' className={classes.colores}>
          ARTICULOS EN EL CARRITO
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs:2, sm:2,md: 4  }} rowSpacing={{xs: 1}}>
        { carrito() != null ? (
          carrito().map( (item:TypeProduct) =>
          <Grid item  sm={2} md={2} key={item.id}>
          <Card className={classes.sizes}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={item.nombre}
                height="200px"
                width="200px"
                image={item.imagen}
                title={item.nombre}
              />
            <CardContent >
              <Typography variant='h6' >
                {item.nombre}
              </Typography>
              <Typography variant='h6' >
                Precio:{item.precio}
              </Typography>
            </CardContent>
            </CardActionArea>
            <IconButton aria-label="delete" href= {window.location.protocol + '//' + window.location.host + '/Cart'} onClick={() => 
            {
              // Eliminar de carrito
              var itemFound:boolean = false;
              var auxCart: TypeProduct[] = [];
              for( var cartProduct of carrito() ){
                // Guardamos en una lista auxiliar todos los elementos del carrito excepto el que queremos eliminar
                if(cartProduct._objectId != item._objectId || itemFound){
                  auxCart.push(cartProduct);
                } else{
                  itemFound = true;
                }
              }
              // Filtramos el carrito con los elementos contenidos en la lista auxiliar
              var newCart = carrito().filter(function (cartProduct:TypeProduct) {     
                return (auxCart.includes(cartProduct));
              });
              // Establecemos el nuevo valor para el carrito
              sessionStorage.setItem('cart', JSON.stringify(newCart));
            }
            }><DeleteIcon /></IconButton>
          </Card>
          </Grid>
          )
        ):([
          <div>
          <Typography variant='h4' className={classes.colores3}>
          Carrito vacio
        </Typography>
          </div>
        ])
        }
        </Grid> 
      </Container>  
    );
};
export default ShoesCart;