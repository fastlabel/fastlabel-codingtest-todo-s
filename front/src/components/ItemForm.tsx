import { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  onAddItem: (itemContent: string) => Promise<void>;
};

const ItemForm: FC<Props> = ({ onAddItem }) => {
  const [itemContent, setItemContent] = useState("");

  const onClickAdd = async () => {
    await onAddItem(itemContent);
    setItemContent("");
  };

  return (
    <TextField
      label="TODOを入力してください"
      value={itemContent}
      fullWidth
      onChange={(e) => setItemContent(e.target.value)}
      variant="standard"
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => onClickAdd()}>
            <AddIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default ItemForm;
