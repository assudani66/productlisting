import "./App.css";
import AppRoutes from "./routes/Routes";
import AuthProvider from "./store/authContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
