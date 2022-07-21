import { useState } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
export function Counter() {
  // let like=10;
  const [like, setLike] = useState(0);
  const [dislike, setDisLike] = useState(0);
  return (
    <div>
      <Badge badgeContent={like} color="primary">
        <IconButton aria-label="like" 
        onClick={() => setLike(like + 1)}>
          👍
        </IconButton>
      </Badge>
      <Badge badgeContent={dislike} color="primary">
        <IconButton aria-label="dislike"
          onClick={() => setDisLike(dislike + 1)}>
          👎
        </IconButton>
      </Badge>
    </div>
  );
}
