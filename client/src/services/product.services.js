import axios from "axios";

export const updateInfoService = async (
  id,
  updatedQuantity,
  updatedValue,
  token
) => {
  try {
    const headers = {
      Authorization: `JWT ${token}`,
    };

    const data = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/posts/${id}`,
      {
        [updatedQuantity]: updatedValue,
      },
      { headers }
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const headers = {
      Authorization: `JWT ${token}`,
    };
    const data = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/posts/${id}`,
      { headers }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getProductInfo = async () => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/posts/`);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const addProductInfo = async (inputData, token) => {
  try {
    const headers = {
      Authorization: `JWT ${token}`,
    };
    const data = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/posts`,
      inputData,
      { headers }
    );
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
