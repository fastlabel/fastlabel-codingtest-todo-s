import { FC, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type Props = {
  onSearchItem: (keyword: string) => Promise<void>;
};

const ItemSearch: FC<Props> = ({ onSearchItem }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <Box>
      <TextField
        label="検索ワードを入力してください"
        value={keyword}
        variant="outlined"
        size="small"
        fullWidth
        onChange={(e) => {
          setKeyword(e.target.value);
          onSearchItem(e.target.value);
        }}
      />
    </Box>
  );
};

export default ItemSearch;
