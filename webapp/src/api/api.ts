import {User, Product, TypeProduct} from '../shared/shareddtypes';
import { ObjectId } from 'bson';


//Obtenemos la url de la apirest de Heroku o utilizamos localhost por defecto
let apiEndPoint:string ='http://localhost:5000/'
console.log(""+ process.env.PORT)
if(process.env.PORT) {
  apiEndPoint = 'https://dede-es3a-restapi.herokuapp.com/'
}

export async function addUser(user:User):Promise<boolean>{
    const id = new ObjectId();
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