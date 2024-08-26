/* eslint-disable react/prop-types */
import { Box, Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

function Login({ handleClose }) {
  const { register, handleSubmit } = useForm();
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  async function onSubmit(userInput) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_URL}/users/login`,
        userInput
      );
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data.user);
      toast.success(data.msg);
      handleClose();
    } catch (error) {
      if (error.response.data.error)
        return toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: 20,
        }}
      >
        <TextField
          variant="outlined"
          type="username"
          label="Username"
          fullWidth
          {...register("username")}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Password"
          fullWidth
          {...register("password")}
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#EEBC1D" }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Loggin In" : "Log In"}
        </Button>
      </Box>
    </form>
  );
}

export default Login;
