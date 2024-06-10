/* eslint-disable react/prop-types */
import { Box, Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import toast from "react-hot-toast";
import { useState } from "react";

function Signup({ handleClose }) {
  const { register, handleSubmit } = useForm();
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  async function onSubmit(userInput) {
    try {
      setLoading(true);
      const { name, email, username, password, confirmPassword } = userInput;
      if (password !== confirmPassword) {
        return toast.error("Password and Confirm Password should be same");
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_URL}/users/signup`,
        { name, email, username, password }
      );
      const { newUser } = data;
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      toast.success(data.msg);
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box
      style={{
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          variant="outlined"
          type="name"
          label="Full Name"
          fullWidth
          {...register("name")}
        />
        <TextField
          variant="outlined"
          type="email"
          label="Email"
          fullWidth
          {...register("email")}
        />
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
        <TextField
          variant="outlined"
          type="password"
          label="Confirm Password"
          fullWidth
          {...register("confirmPassword")}
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#EEBC1D" }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing In" : "Sign Up"}
        </Button>
      </form>
    </Box>
  );
}

export default Signup;
