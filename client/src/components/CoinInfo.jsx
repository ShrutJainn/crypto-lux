/* eslint-disable react/prop-types */
import { useRecoilValue } from "recoil";
import currencyAtom from "../atoms/currencyAtom";

//selected = day.value == days

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { HistoricalChart } from "../config/api";
// import { Line } from "react-chartjs-2";
// import {
//   CircularProgress,
//   ThemeProvider,
//   createTheme,
//   makeStyles,
// } from "@material-ui/core";

import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

function CoinInfo({ coin }) {
  const currency = useRecoilValue(currencyAtom);
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);

  useEffect(() => {
    async function fetchChart() {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setflag(true);
      setChartData(data.prices);
    }
    fetchChart();
  }, [coin.id, currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const { container } = useStyles();
  return (
    // <ThemeProvider theme={darkTheme}>
    //   <div className={container}>
    //     {!chartData ? (
    //       <CircularProgress
    //         style={{ color: "gold" }}
    //         size={250}
    //         thickness={1}
    //       />
    //     ) : (
    //       <>
    //         <Line
    //           data={{
    //             labels: chartData.map((coin) => {
    //               let date = new Date(coin[0]);
    //               let time =
    //                 date.getHours() > 12
    //                   ? `${date.getHours() - 12}:${date.getMinutes()} PM`
    //                   : `${date.getHours()}:${date.getMinutes()} AM`;

    //               return days === 1 ? time : date.toLocaleDateString();
    //             }),

    //             datasets: [{ data: chartData.map((coin) => coin[1]) }],
    //           }}
    //         />
    //       </>
    //     )}
    //   </div>
    // </ThemeProvider>

    <ThemeProvider theme={darkTheme}>
      <div className={container}>
        {!chartData | (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: chartData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: chartData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;
