import { useEffect, useState } from "react";
import { getProductInfo } from "../services/product.services";
import ProductCard from "../components/UIcomposables/ProductCard";
import { Grid, Container, Typography } from "@mui/material";

const Home = () => {
  const [productData, setProductData] = useState([]);

  const getProductInfoFromServer = async () => {
    try {
      const response = await getProductInfo();
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching product info:", error);
    }
  };

  useEffect(() => {
    getProductInfoFromServer();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingX: "4rem",
      }}
    >
      <Typography variant="h2" padding={"5rem"} color={"black"}>
        Products
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "start", flexGrow: 1 }}
      >
        {productData.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
