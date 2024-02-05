import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const BoardMain = () => {
    const navi = useNavigate();
    return (
        <div>
            <h3>게시판</h3>
            <button onClick={() => navi("form")}>글쓰기</button>
        </div>
    );
};

export default BoardMain;
