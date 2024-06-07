import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { useRecoilValue } from "recoil";
import currencyAtom from "../atoms/currencyAtom";
import {
  Button,
  LinearProgress,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/CoinsTable";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "MontSerrat",
  },
  description: {
    widht: "100%",
    fontFamily: "MontSerrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

function CoinPage() {
  const { coinId } = useParams();

  const [coin, setCoin] = useState(null);
  const currency = useRecoilValue(currencyAtom);
  const symbol = currency === "INR" ? "₹" : "$";

  useEffect(() => {
    async function fetchCoin() {
      const { data } = await axios.get(SingleCoin(coinId));
      setCoin(data);
    }
    fetchCoin();
  }, [coinId]);
  // console.log(url);

  const { container, sidebar, heading, description, marketData } = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={container}>
      <div className={sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={marketData}>
          <span style={{ display: "flex" }}>
            <Typography className={heading} variant="h5">
              Rank :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "MontSerrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography className={heading} variant="h5">
              Current Price :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "MontSerrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography className={heading} variant="h5">
              Market Cap :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "MontSerrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          <Button variant="contained" style={{ backgroundColor: "#EEBC1D" }}>
            Add to Watchlist
          </Button>
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  );
}

export default CoinPage;
