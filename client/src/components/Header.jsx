import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import currencyAtom from "../atoms/currencyAtom";

const useStyles = makeStyles({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "MontSerrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currency, setCurrency] = useRecoilState(currencyAtom);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            {" "}
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              className={classes.title}
            >
              Crypto Lux
            </Typography>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
