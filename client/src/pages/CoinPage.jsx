import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import toast from "react-hot-toast";
import coinsAtom from "../atoms/coinsAtom";
import userAtom from "../atoms/userAtom";

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
  const [loading, setLoading] = useState(false);
  // const setCoins = useSetRecoilState(coinsAtom);
  const [coins, setCoins] = useRecoilState(coinsAtom);
  const user = useRecoilValue(userAtom);
  const currency = useRecoilValue(currencyAtom);
  const symbol = currency === "INR" ? "₹" : "$";

  const jwt = JSON.parse(localStorage.getItem("user")).jwt;

  useEffect(() => {
    async function fetchCoin() {
      const { data } = await axios.get(SingleCoin(coinId));
      setCoin(data);
    }
    fetchCoin();
  }, [coinId]);
  // console.log(url);

  async function handleAddCoin() {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_URL}/coins/${coinId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );
      const coin = data.coin;

      setCoins((prev) => [...prev, coin]);
      toast.success(data.msg);
    } catch (error) {
      if (
        error.response.data.error.startsWith("\nInvalid `prisma.user.update()")
      )
        return toast.error("Coin already present in your watchlist");
      else return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

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
          {user && (
            <Button
              disabled={loading}
              onClick={handleAddCoin}
              variant="contained"
              style={{ backgroundColor: "#EEBC1D" }}
            >
              {loading ? "Adding coin" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  );
}

export default CoinPage;
