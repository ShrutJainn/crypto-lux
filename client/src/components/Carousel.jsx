/* eslint-disable react-refresh/only-export-components */
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { TrendingCoins } from "../config/api";
import { useRecoilValue } from "recoil";
import currencyAtom from "../atoms/currencyAtom";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    fontFamily: "MontSerrat",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
});
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Carousel() {
  const { carousel, carouselItem } = useStyles();
  const currency = useRecoilValue(currencyAtom);

  const symbol = currency === "INR" ? "₹" : "$";
  const [trendingCoins, setTrendingCoins] = useState([]);

  useEffect(() => {
    async function getTrendingCoins() {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrendingCoins(data);
    }
    getTrendingCoins();
  }, [currency]);

  const items = trendingCoins.map((coin) => {
    //profit -> boolean
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link key={coin.id} className={carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className={carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
}

export default Carousel;
