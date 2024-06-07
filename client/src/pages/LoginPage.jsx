import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(../../public/login.webp)",
    backgroundRepeat: "no-repeat",
  },
  container: {
    height: "70vh",
    width: "40vw",
    border: "1px solid white",
  },
});

function LoginPage() {
  const { page, container } = useStyles();
  return (
    <div className={page}>
      <div className={container}></div>
    </div>
  );
}

export default LoginPage;
