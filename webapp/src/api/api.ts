import { User, Product, TypeProduct, Order, TypeOrder } from '../shared/shareddtypes';


//Obtenemos la url de la apirest de Heroku o utilizamos localhost por defecto
let apiEndPoint:string ='http://dede-es3a-restapi.herokuapp.com/'
if(process.env.PORT) {
  apiEndPoint = 'http://localhost:5000/'
}

export async function addUser(user:User):Promise<boolean>{
    const userParam = { username:user.username, password:user.password};
    let response:Response = await fetch(apiEndPoint+'users/add', {
        method: 'POST',
        body: JSON.stringify(userParam),
        headers: {
          'Content-Type':'application/json'
        }        
      });
      console.log(response);
    if (response.status===201)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    let response:Response = await fetch(apiEndPoint+'users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

/*
* Metodo que utilizaremos para comprobar si el usuario que intenta logearse, existe en base de datos.
*/
export async function getUser(username : string, password : string): Promise<User | null> {
  const apiPetition:string = apiEndPoint+'users/login/' + username + '/' + password;
  const response:Response = await fetch(apiPetition);
  if(response.status == 500) {
    return null;
  }
  return response.json();
}

export async function getProducts(): Promise<TypeProduct[]> {
  const response:Response = await fetch(apiEndPoint+'products/list');
  return response.json();
}

export async function getProduct(productId : string): Promise<TypeProduct> {
  const apiPetition:string = apiEndPoint+'producto/detalles/' + productId;
  const response:Response = await fetch(apiPetition);
  return response.json();
}

export async function addOrder(order:Order):Promise<Order>{
  const orderParam = { usuario:order.usuario, precio:order.precio, contenido:order.contenido };
  let response:Response = await fetch(apiEndPoint+'pedidos/add', {
      method: 'POST',
      body: JSON.stringify(orderParam),
      headers: {
        'Content-Type':'application/json'
      }        
    });
  return response.json();
}

export async function getOrders(username : string): Promise<TypeOrder[]> {
  const apiPetition:string = apiEndPoint+'pedidos/list/' + username;
  const response:Response = await fetch(apiPetition);
  return response.json();
}