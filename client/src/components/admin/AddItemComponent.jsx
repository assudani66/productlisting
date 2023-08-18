import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { addProductInfo } from "../../services/product.services";
import { useAuth } from "../../store/authContext";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  image_url: Yup.string().url("Invalid URL").required("Image URL is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  stock_quantity: Yup.number()
    .typeError("Stock quantity must be a number")
    .required("Stock quantity is required"),
});

const initialValues = {
  name: "",
  description: "",
  image_url: "",
  price: "",
  stock_quantity: "",
};

const ProductForm = ({ open, onClose, onAdd }) => {
  const { token } = useAuth();
  const handleSubmit = (values) => {
    addProductInfo(values, token);
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Name"
                    name="name"
                    fullWidth
                    helperText={<ErrorMessage name="name" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Description"
                    name="description"
                    fullWidth
                    helperText={<ErrorMessage name="description" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Image URL"
                    name="image_url"
                    fullWidth
                    helperText={<ErrorMessage name="image_url" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="Price"
                    name="price"
                    type="number"
                    fullWidth
                    helperText={<ErrorMessage name="price" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="Stock Quantity"
                    name="stock_quantity"
                    type="number"
                    fullWidth
                    helperText={<ErrorMessage name="stock_quantity" />}
                  />
                </Grid>
                <DialogActions>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Grid>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductForm;
