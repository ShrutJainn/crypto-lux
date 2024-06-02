import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import currencyAtom from "../atoms/currencyAtom";
import axios from "axios";
import { CoinList } from "../config/api";

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const currency = useRecoilValue(currencyAtom);

  useEffect(() => {
    async function getCoinList() {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    }
    getCoinList();
  }, [currency]);
  return <div>CoinsTable</div>;
}

export default CoinsTable;
