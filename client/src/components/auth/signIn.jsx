import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { signInService } from "../../services/auth.services";
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken, setUserFunction, user } = useAuth();
  const handleSubmit = async (values) => {
    const response = await signInService(values);
    setToken(response.data.accessToken);
    navigate("/");
    setUserFunction(response.data.user.role);
  };
  console.log(user);
  const handleLoadAdminCredentials = (formik) => {
    formik.setFieldValue("email", "johndoe@example.com");
    formik.setFieldValue("password", "mysecretpassword");
  };

  return (
    <Grid item xs={10} sm={8} md={6} lg={4}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, ...formikProps }) => (
            <Form>
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                margin="normal"
              />
              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                fullWidth
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign In
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => handleLoadAdminCredentials(formikProps)}
              >
                Load admin credentials
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default SignIn;
