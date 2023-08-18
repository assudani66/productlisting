import { IconButton } from "@mui/material";
import { deleteProduct } from "../services/product.services";
import DeleteIcon from "@mui/icons-material/Delete";

const BtnCellRenderer = (props) => {
  const buttonClicked = async () => {};

  return (
    <span>
      <IconButton aria-label="delete" onClick={() => buttonClicked()}>
        <DeleteIcon />
      </IconButton>
    </span>
  );
};
export default BtnCellRenderer;
