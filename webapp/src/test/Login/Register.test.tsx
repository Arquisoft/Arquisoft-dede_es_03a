import { screen, render, fireEvent } from "@testing-library/react";
import Register from '../../components/Login/Register';

/*** 
jest.mock('../api/api');

test('Vista registro correcta', async () => {
  jest.spyOn(api,'addUser').mockImplementation((user:User):Promise<boolean> => Promise.resolve(createTrue))
  await act(async () => {    
    const {container, getByText} = render(<Register />)  
    const inputName = container.querySelector('input[name="username"]')!;
    const inputPassword = container.querySelector('input[name="password"]')!;
    fireEvent.change(inputName, { target: { value: "client1" } });
    fireEvent.change(inputPassword, { target: { value: "pass1" } });
    const button = getByText("Registro");
    fireEvent.click(button);
  });
})

test('Vista registro fallo', async () => {
    jest.spyOn(api,'addUser').mockImplementation((user:User):Promise<boolean> => Promise.resolve(createTrue))
    await act(async () => {    
      const {container, getByText} = render(<Register/>)  
      const inputName = container.querySelector('input[name="username"]')!;
      const inputPassword = container.querySelector('input[name="password"]')!;
      fireEvent.change(inputName, { target: { value: "client1" } });
      fireEvent.change(inputPassword, { target: { value: "pass1" } });
      const button = getByText("Registro");
      fireEvent.click(button);
    })
})
*/

test("Vista registro correcta", async () => {
    const { getByText } = render(<Register />);

    expect(getByText("Registro")).toBeInTheDocument();
    expect(getByText("Username")).toBeInTheDocument();
    expect(getByText("Password")).toBeInTheDocument();
    expect(getByText("Check Password")).toBeInTheDocument();
    expect(getByText("Registrarse")).toBeInTheDocument();
});


test("Vista registro correcta placeholders", async () => {
  render(<Register />);

  const username = screen.getByPlaceholderText("Username");
  expect(username).toBeInTheDocument();
  const password = screen.getByPlaceholderText("Password");
  expect(password).toBeInTheDocument();
  const checkPass = screen.getByPlaceholderText("Check Password");
  expect(checkPass).toBeInTheDocument();
})


test("Vista Register no añadir usuario correcto", async () => {
  const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
  render(<Register />);

  fireEvent.click(screen.getByText("Registrarse"));
  expect(alertMock).toHaveBeenCalledTimes(0);
})
