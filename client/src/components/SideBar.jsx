import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { numberWithCommas } from "./CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
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
  const { container, watchlist, coinItem } = useStyles();
  const user = useRecoilValue(userAtom);
  const name = user.name.charAt(0).toUpperCase() + user.name.slice(1);
  const coins = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      price: 5994210,
      image:
        "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    },
    {
      id: "thether",
      name: "Thether",
      price: 879087,
      image:
        "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
    },
  ];
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

  const symbol = "₹";

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Profile</Button>
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
                    <div key={coin.id} className={coinItem}>
                      <span>{coin.name}</span>
                      <span style={{ display: "flex", gap: 8 }}>
                        {symbol}
                        {numberWithCommas(coin.price.toFixed())}
                      </span>
                      <AiFillDelete
                        style={{ cursor: "pointer" }}
                        fontSize="16"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <Button variant="contained" style={{ backgroundColor: "#EEBC1D" }}>
              Logout
            </Button>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
