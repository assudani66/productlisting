import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { signUpService } from "../../services/auth.services";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("User name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Signup = () => {
  const handleSubmit = async (values) => {
    const response = await signUpService(values);
    console.log(response);
  };

  return (
    <Grid item xs={10} sm={8} md={6} lg={4}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="username"
                as={TextField}
                label="username"
                fullWidth
                error={touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                margin="normal"
              />
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
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signup;
