// import "dotenv/config";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import Layout from "./pages/Layout";
import { makeStyles } from "@material-ui/core/styles";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
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
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "white",
                color: "black",
                fontFamily: "MontSerrat",
              },
            }}
          />
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
