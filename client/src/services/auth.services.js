import axios from "axios";

export const signUpService = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/signup`,
    data
  );
  return response;
};

export const signInService = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/signin`,
    data
  );
  return response;
};
