import { AppBar, Box, Button } from "@mui/material";
import { useAuth } from "../../store/authContext";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation

const NavBar = () => {
  const { token, setToken, user, setUserFunction } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <AppBar component="nav">
      <Box
        sx={{
          background: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        {token && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setToken("");
              setUserFunction("");
            }}
          >
            Log out
          </Button>
        )}
        {user && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (location.pathname === "/admin") {
                navigate("/");
              } else {
                navigate("/admin");
              }
            }}
          >
            {location.pathname === "/admin" ? "Product" : "Admin section"}
          </Button>
        )}
      </Box>
    </AppBar>
  );
};

export default NavBar;
