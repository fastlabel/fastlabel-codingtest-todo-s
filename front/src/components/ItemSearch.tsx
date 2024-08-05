import { useState, forwardRef, useImperativeHandle } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type Props = {
  onSearchItem: (keyword: string) => Promise<void>;
};

export type Ref = {
  clear: () => void;
};

const ItemSearch = forwardRef<Ref, Props>(({ onSearchItem }, ref) => {
  const [keyword, setKeyword] = useState("");

  useImperativeHandle(ref, () => ({
    clear: () => setKeyword(""),
  }));

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
});

export default ItemSearch;
