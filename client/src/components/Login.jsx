import { Box, Button, TextField } from "@material-ui/core";

function Login() {
  return (
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
      />
      <TextField
        variant="outlined"
        type="password"
        label="Password"
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default Login;
