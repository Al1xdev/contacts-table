import { Box } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

import { useCopyToClipboard } from "react-use";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    color: "#347aeb",
  },
  icon: {
    marginRight: 8,
  },
});

const ClickBoard = ({ text }) => {
  const classes = useStyles();

  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <Tooltip title="copy" placement="top-start" arrow>
      <Box
        display="flex"
        alignItems="center"
        className={classes.root}
        onClick={() => copyToClipboard(text)}
      >
        <FileCopyOutlinedIcon className={classes.icon} />
        {text}
      </Box>
    </Tooltip>
  );
};

export default ClickBoard;
