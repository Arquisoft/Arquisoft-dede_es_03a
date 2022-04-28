import { Button, Card, CardContent, CardHeader, Container, FormGroup, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LoginButton} from "@inrupt/solid-ui-react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Nav from "../Fragments/Nav";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex', 
      flexWrap: 'wrap',
      width: '60%',
      height:'60%',
      marginTop:'10%',
      marginLeft:'30%',
      margin: `${theme.spacing(0)} auto`
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
      marginTop: theme.spacing(10),
      width: '70%',
      height:''
    },
  })
);

const FormLogIn = () => {
  const classes = useStyles();
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");
  let p:string = "https://localhost:5000";
  console.log(process.env.PORT + "")
  if(process.env.PORT)
    p="https://dede-es3a-restapi.herokuapp.com/"
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  return (
    <><Nav />
    <form className={classes.container} noValidate autoComplete="on">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login" />
        <CardContent>
          <Container fixed>
            <FormGroup>
              <TextField
                label="Identity Provider"
                placeholder="Identity Provider"
                type="url"
                value={idp}
                onChange={(e) => setIdp(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <LoginButton oidcIssuer={idp} redirectUrl={"https://dede-es3a.herokuapp.com/ProfileViewer"}>
                      <Button variant="contained" color="primary">
                        Login
                      </Button>
                    </LoginButton>
                  ),
                }} />
            </FormGroup>
            <Typography variant="body1" component="p" id="help">
              <Link href="https://inrupt.net/register" margin={'30%'}> ¿No tienes una cuenta? Regístrate aqui</Link>
            </Typography>
          </Container>
        </CardContent>
      </Card>
    </form></>
  );
}
export default FormLogIn;