import { useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import Signup from "../components/auth/signUp";
import SignIn from "../components/auth/signIn";

function AuthCard() {
  const [signIn, setSignIn] = useState(true);
  const handleToggle = () => {
    setSignIn((prevSignIn) => !prevSignIn);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
        alignContent={"center"}
      >
        <Container
          sx={{
            display: "flex",
            paddingTop: "4rem",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "100vw",
            gap: "2rem",
            minHeight: "100vh",
          }}
        >
          {!signIn && <Signup />}
          {signIn && <SignIn />}
          <Typography variant="h5" color={"black"}>
            If you wanna {signIn ? "Sign In" : "Sign Up"} click here:
            <Button onClick={handleToggle}>
              {signIn ? "Sign Up" : "Sign In"}
            </Button>
          </Typography>
        </Container>
      </Grid>
    </Container>
  );
}

export default AuthCard;
