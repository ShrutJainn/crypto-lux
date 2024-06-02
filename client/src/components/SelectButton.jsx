/* eslint-disable react/prop-types */
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  selectbutton: {
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    //   margin: 5,
  },
});
const SelectButton = ({ children, onClick }) => {
  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
