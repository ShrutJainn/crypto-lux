import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import Layout from "./pages/Layout";
import { makeStyles } from "@material-ui/core/styles";
import { RecoilRoot } from "recoil";
import "react-alice-carousel/lib/alice-carousel.css";
import LoginPage from "./pages/LoginPage";

const useStyles = makeStyles({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
});

function App() {
  const classes = useStyles();
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className={classes.App}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/coins/:coinId" element={<CoinPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
