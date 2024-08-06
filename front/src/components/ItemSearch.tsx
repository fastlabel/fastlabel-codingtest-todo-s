import { FC, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDebounce } from "../applications/hooks/debounce";

type Props = {
  onSearchItem: (keyword: string) => Promise<void>;
};

const INPUT_DELAY = 300;

const ItemSearch: FC<Props> = ({ onSearchItem }) => {
  const [keyword, setKeyword] = useState("");
  const [debouncedSearchItem] = useDebounce(onSearchItem, INPUT_DELAY);

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
          debouncedSearchItem(e.target.value);
        }}
      />
    </Box>
  );
};

export default ItemSearch;
