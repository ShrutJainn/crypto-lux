import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { numberWithCommas } from "./CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import coinsAtom from "../atoms/coinsAtom";
const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 100,
    fontFamily: "MontSerrat",
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgb(69, 67, 66)",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflow: "scroll",
    overflowX: "hidden",
    overflowY: "scroll",
  },
  coinItem: {
    cursor: "pointer",
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: " 0 0 3px black",
    gap: 25,
  },
});

export default function SideBar() {
  const navigate = useNavigate();
  const { container, watchlist, coinItem } = useStyles();
  const [coins, setCoins] = useRecoilState(coinsAtom);

  const user = useRecoilValue(userAtom);
  const name = user && user.name.charAt(0).toUpperCase() + user.name.slice(1);

  const jwt = JSON.parse(localStorage.getItem("user"))?.jwt;

  useEffect(() => {
    async function getCoins() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_URL}/coins/`,
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
        setCoins(data.coins);
      } catch (error) {
        return toast.error(error.message);
      }
    }
    getCoins();
  }, [jwt, setCoins]);

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  async function handleDelete(coin, anchor) {
    try {
      const coinId = coin.id;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_URL}/coins/${coinId}`,
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );
      setCoins(coins.filter((coin) => coin.id !== coinId));
      toggleDrawer(anchor, false);
      toast.success(data.msg);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  function handleLogout() {
    toast.success("User Logged Out");
    navigate("/");
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            style={{ color: "white" }}
            onClick={toggleDrawer(anchor, true)}
          >
            Profile
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={container}>
              <Typography variant="h3">Welcome, {name}</Typography>
              <div className={watchlist}>
                <Typography variant="h6">
                  Your <span style={{ color: "#EEBC1D" }}>Coins</span>
                </Typography>
                {coins.map((coin) => {
                  return (
                    <div
                      onClick={() => navigate(`/coins/${coin.id}`)}
                      key={coin.id}
                      className={coinItem}
                    >
                      <span>{coin.name}</span>
                      <AiFillDelete
                        onClick={() => handleDelete(coin, anchor)}
                        style={{ cursor: "pointer" }}
                        fontSize="16"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="contained"
              style={{ backgroundColor: "#EEBC1D" }}
            >
              Logout
            </Button>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
