import express, { Request, Response } from 'express';
import { Producto , ProductoDoc} from '../modelos/productoModelo';
import consultarREST from './consultarREST';
import "dotenv/config";
import { ObjectId } from 'mongoose';

//Obtenemos la url de la apirest de Heroku o utilizamos localhost por defecto
let URL_BASE:string = `${process.env.API_REST_URL_BASE_LOCAL}`
if(process.env.PORT) {
  URL_BASE = `${process.env.API_REST_URL_BASE_HEROKU}`
}

const router = express.Router()
//Recuperamos todos los colores asociados a un producto facilitando su referencia
router.get('/producto/detalles/colores/:referencia', async (req: Request, res: Response) => {
  const ref:string = req.params.referencia;
  const colores:ProductoDoc[] = await Producto.find({ referencia: ref }, 'color');
  return res.json(colores);
})

//Recuperamos la foto etiquetada como principal asociada a un producto facilitando su referencia
router.get('/producto/detalles/foto/:referencia', async (req: Request, res: Response) => {
  const ref:string = req.params.referencia;
  const productos:ProductoDoc[] = await Producto.find({ referencia: ref });
  if (productos.length == 1){
    //Recuperamos todas las fotos asociadas a este producto
    const fotos = await consultarREST(URL_BASE +'foto/' + productos[0].id)
    return res.json(fotos);
  }
  return res.json();
})

//Recuperamos todas las fotos asociadas a un producto facilitando su referencia
router.get('/producto/detalles/fotos/:referencia', async (req: Request, res: Response) => {
  const ref:string = req.params.referencia;
  const productos:ProductoDoc[] = await Producto.find({ referencia: ref });
  if (productos.length == 1){
    //Recuperamos todas las fotos asociadas a este producto
    const fotos = await consultarREST(URL_BASE +'fotos/' + productos[0].id)
    return res.json(fotos);
  }
  return res.json();
})


//Recuperamos todas las tallas asociadas a un producto facilitando su referencia
router.get('/producto/detalles/tallas/:referencia', async (req: Request, res: Response) => {
  const ref:string = req.params.referencia;
  const productos:ProductoDoc[] = await Producto.find({ referencia: ref });
  if (productos.length == 1){
    //Recuperamos todas las tallas asociadas a este producto
    const tallas = await consultarREST(URL_BASE +'tallas/' + productos[0].id)
    return res.json(tallas);
  }
  return res.json();
})

//Recuperamos todas las tallas disponibles (con existencias en stock) asociadas a un producto facilitando su referencia
router.get('/producto/detalles/tallas_disponibles/:referencia', async (req: Request, res: Response) => {
  const ref:string = req.params.referencia;
  const productos:ProductoDoc[] = await Producto.find({ referencia: ref });
  if (productos.length == 1){
    //Recuperamos todas las tallas disponibles asociadas a este producto
    const tallas = await consultarREST(URL_BASE +'tallas_disponibles/' + productos[0].id)
    return res.json(tallas);
  }
  return res.json();
})

router.get('/products/list', async (req: Request, res: Response) => {
  //formato de salida que espera el front-end
  console.log("DENTRO LISTAPRODUCT");
  type TypeProduct = {
    _objectId: ObjectId;
    id: String;
    nombre: String;
    precio: Number;
    imagen: String;
  }

  let resultado:TypeProduct[] = new Array<TypeProduct>();

  const productos:ProductoDoc[] = await Producto.find({})
  
  for (var i=0; i< productos.length; i++)
  {
      let entrada:ProductoDoc = productos[i];
      let salida: TypeProduct = ({ _objectId: entrada._id, id: "", nombre:"",precio:0,imagen: "" });
      salida.id = entrada.referencia;
      salida.nombre = entrada.marca + " " +entrada.modelo;
      salida.precio = entrada.precio;
      //Recuperamos la imagen principal asociada a este producto
      if (entrada.fotos.length != 0){
        salida.imagen = entrada.fotos[0].ruta;
      }
      else{
        salida.imagen = ""; //buscar una imagen por defecto si no hay principal
      }
      resultado.push(salida);
  }
  return res.status(200).send(resultado)
})

router.post('/products/add', async (req: Request, res: Response) => {
  const { referencia, marca, modelo, color, precio, descripcion, categoria, fotos, tallas} = req.body;

  const product:ProductoDoc = Producto.build({ referencia, marca, modelo, color, precio, descripcion, categoria , fotos, tallas })
  await product.save()
  return res.status(201).send(product)
})

router.get('/producto/detalles/:referencia', async (req: Request, res: Response) => {
  //formato de salida que espera el front-end
  type TypeProduct = {
    _objectId: ObjectId;
    id: String;
    nombre: String;
    precio: Number;
    descripcion: String;
    imagen: String;
  }

  let resultado:TypeProduct[] = new Array<TypeProduct>();
  //Parametro referencia
  const ref:string = req.params.referencia;
  //Realizamos la busqueda por referencia
  const product = await Producto.findOne({referencia: ref})
  if(product){
    let entrada:ProductoDoc = product;
    let salida: TypeProduct = ({ _objectId: entrada._id, id: "", nombre:"",precio:0,descripcion:"",imagen: "" });
    salida.id = entrada.referencia;
    salida.nombre = entrada.marca + " " +entrada.modelo;
    salida.precio = entrada.precio
    salida.descripcion = entrada.descripcion;

    if (entrada.fotos.length != 0)
      salida.imagen = entrada.fotos[0].ruta;
    else
      salida.imagen = "" //buscar una imagen por defecto si no hay principal
    resultado.push(salida)
    return res.status(200).send(resultado)
  } else{
    return res.status(500).json();
  }
  
})

export { router as productoRouter }