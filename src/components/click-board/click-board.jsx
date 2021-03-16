import { Box } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

const ClickBoard = ({ text }) => {
  return (
    <Box display="flex" alignItems="center">
      <FileCopyOutlinedIcon />
      {text}
    </Box>
  );
};

export default ClickBoard;
