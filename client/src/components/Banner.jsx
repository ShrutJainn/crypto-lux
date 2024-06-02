import { Container, Typography, makeStyles } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles({
  banner: {
    backgroundImage: "url(../public/banner.jpg)",
    backgroundRepeat: "no-repeat",
  },
  bannerContainer: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
    overflow: "hidden",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
});

function Banner() {
  const { banner, bannerContainer, tagline } = useStyles();
  return (
    <div className={banner}>
      <Container className={bannerContainer}>
        <div className={tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Lux
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Track as you Trade
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
